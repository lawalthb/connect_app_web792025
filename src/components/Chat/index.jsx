import { useEffect, useState } from 'react';
import ChatUsers from './ChatUsers';
// import ChatRoom from './ChatRoom';
import EmptyChat from './EmptyChat';
import EmptyChatRoom from '@/Images/EmptyChatRoom.png';
import {
  getConversation,
  getMessages,
  readMessages,
  sendMessages,
} from '../Utils/api';
import Loader from '../Loader/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useUserStore from '@/zustandStore/useUserStore';
import dynamic from 'next/dynamic';

const ChatRoom = dynamic(() => import('./ChatRoom'), {
  ssr: false,
});

const ChatView = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messagesMap, setMessagesMap] = useState({});
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [lastCount, setLastCount] = useState(1);
  const [id, setId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  const queryClient = useQueryClient();

  const { user, loading } = useUserStore();

  const { data: conversations, isLoading: isLoadingConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversation,
  });

  const { data = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', id, page, perPage],
    queryFn: () => getMessages(id, page, perPage),
    enabled: !!perPage && !!page && !!id,
  });

  const {
    mutate: sendMessage,
    isPending: isSendingMessage,
    isSuccess: isSentMessageSuccess,
    error: isSendMessageError,
    reset: resetSendMessage,
  } = useMutation({
    mutationFn: sendMessages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setTimeout(() => {
        resetSendMessage();
      }, 2000);
    },
    onError: (err) => {
      console.error('Message sending failed:', err.message);
    },
  });

  const { mutate: readMessage, isPending: isReadingMessage } = useMutation({
    mutationFn: readMessages(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (err) => {
      console.error('Message read failed:', err.message);
    },
  });

  useEffect(() => {
    setId(conversations?.data?.conversations[0]?.id);
  }, [isLoadingConversations]);

  // useEffect(() => {
  //   if (isLoadingMessages) return;
  //   setMessages(data?.data?.messages);
  //   // setMessages((prev) => [...prev, data?.data?.messages] || []);
  // }, [isLoadingMessages, messages]);

  useEffect(() => {
    if (!isLoadingMessages && data?.data?.messages) {
      setMessages((prev) => {
        const newMessages = data.data.messages;
        const existingIds = new Set(prev.map((msg) => msg?.created_at));
        const uniqueMessages = newMessages.filter(
          (msg) => !existingIds.has(msg.created_at),
        );
        if (viewMore) return [...prev, ...uniqueMessages];
        return [...uniqueMessages, ...prev];
      });
    }
  }, [data?.data?.messages, isLoadingMessages]);

  const handleSendMessage = (conversationId, message) => {
    console.log(message);
    const payload = {
      id: conversationId,
      message: message.text,
      type: 'text',
      file: message.file,
    };
    sendMessage(payload);

    setMessagesMap((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), message],
    }));
  };

  const handleSelectConversation = (user) => {
    setLastCount(1);
    setPage(1);
    setId(user.id);
    setSelectedConversation(user);
    readMessage(id);
  };

  const handleBack = () => {
    setSelectedConversation(null);
  };

  const handleViewMore = () => {
    setViewMore(true);
    setLastCount((prev) => prev + 1);
    setPage((prev) => prev + lastCount);
  };

  const resetPage = () => {
    setViewMore(false);
    setPage(1);
  };

  if (isLoadingConversations || loading || isLoadingMessages) return <Loader />;

  return (
    <div className="flex w-full md:w-[90%] mx-auto">
      <div
        className={`w-full md:w-1/3 ${selectedConversation ? 'hidden md:block' : 'block'}`}
      >
        <ChatUsers
          conversations={conversations?.data?.conversations || []}
          onSelectConversation={handleSelectConversation}
          user={user}
        />
      </div>
      {selectedConversation && (
        <div className="w-full md:w-2/3">
          <ChatRoom
            user={selectedConversation}
            signedInUser={user}
            messages={messages || []}
            pagination={data?.data?.pagination}
            onSend={(message) =>
              handleSendMessage(selectedConversation.id, message)
            }
            onBack={handleBack}
            handleViewMore={handleViewMore}
            isLoadingMessages={isSentMessageSuccess}
            resetPage={resetPage}
          />
        </div>
      )}
      {!selectedConversation && (
        <div className="hidden md:flex w-full md:w-2/3 items-center justify-center">
          <EmptyChat
            image={EmptyChatRoom}
            title="Welcome to Your Conversations"
            description="Select a chat from the list to start exploring your messages or begin a new conversation"
            width="120"
            height="120"
          />
        </div>
      )}
    </div>
  );
};

export default ChatView;
