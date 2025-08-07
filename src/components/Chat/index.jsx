import { useEffect, useState } from 'react';
import ChatUsers from './ChatUsers';
// import ChatRoom from './ChatRoom';
import EmptyChat from './EmptyChat';
import EmptyChatRoom from '@/Images/EmptyChatRoom.png';
import {
  API_URL,
  getConversation,
  getMessages,
  initialteCall,
  readMessages,
  sendMessages,
} from '../Utils/api';
import Loader from '../Loader/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useUserStore from '@/zustandStore/useUserStore';
import dynamic from 'next/dynamic';
import Pusher from 'pusher-js';
import Modal from '../Modal';
const VideoCall = dynamic(() => import('./VideoCall'), {
  ssr: false,
});

const ChatRoom = dynamic(() => import('./ChatRoom'), {
  ssr: false,
});

const ChatView = ({ token }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messagesMap, setMessagesMap] = useState({});
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [lastCount, setLastCount] = useState(1);
  const [id, setId] = useState(null);
  const [pusherMessages, setPusherMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const uid = Math.floor(Math.random() * 1000000);

  const [agoraConfig, setAgoraConfig] = useState({
    appId: '314065900d1d4ef19ed5c8d247d6c247',
    channelName: 'call_1754435708_6892907c1f875',
    token:
      '006314065900d1d4ef19ed5c8d247d6c247IAD2NIedM/32FDiQuRWGIlfAZbJrTR9Du/DCBYIhtP/bInchkiKEpFSKIgAfHgEA/OGTaAQAAQCMnpJoAwCMnpJoAgCMnpJoBACMnpJo',
    uid: '',
    // uid: '169446',
  });

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
      // queryClient.invalidateQueries({ queryKey: ['messages'] });
      setTimeout(() => {
        resetSendMessage();
      }, 2000);
    },
    onError: (err) => {
      console.error('Message sending failed:', err.message);
    },
  });

  const {
    mutate: initiateCall,
    isPending: isInitiatingCall,
    // isSuccess: isSentMessageSuccess,
    error: callError,
  } = useMutation({
    mutationFn: initialteCall,
    onSuccess: (data) => {
      console.log(data);
      setAgoraConfig({
        appId: data.data.agora_config.app_id,
        channelName: data.data.agora_config.channel_name,
        token: data.data.agora_config.token,
        uid: data.data.agora_config.uid,
      });
    },
    onError: (err) => {
      console.error('Call initiating failed:', err.message);
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
  //   if (!isLoadingMessages && data?.data?.messages) {
  //     setMessages((prev) => {
  //       const newMessages = data.data.messages;
  //       const existingIds = new Set(prev.map((msg) => msg?.created_at));
  //       const uniqueMessages = newMessages.filter(
  //         (msg) => !existingIds.has(msg.created_at),
  //       );
  //       if (viewMore) return [...prev, ...uniqueMessages];
  //       return [...uniqueMessages, ...prev];
  //     });
  //   }
  // }, [data?.data?.messages, isLoadingMessages]);
  useEffect(() => {
    if (!isLoadingMessages && data?.data?.messages) {
      setMessages((prev) => {
        const newMessages = data.data.messages;
        const existingIds = new Set(prev.map((msg) => msg?.created_at));
        const uniqueMessages = newMessages.filter(
          (msg) => !existingIds.has(msg.created_at),
        );
        const reversedMessages = uniqueMessages?.slice().reverse();
        // if (viewMore) return [...prev, ...reversedMessages];
        return [...reversedMessages, ...prev];
      });
    }
  }, [data?.data?.messages, isLoadingMessages]);

  useEffect(() => {
    if (!selectedConversation?.id) return;

    const pusher = new Pusher('0e0b5123273171ff212d', { cluster: 'eu' });

    const channel = pusher.subscribe(`conversation.${selectedConversation.id}`);

    channel.bind('message.sent', (data) => {
      console.log('New message:', data);

      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [selectedConversation?.id]);

  const sendMessagesTest = async (data) => {
    setSendingMessage(true);
    const formData = new FormData();

    // Append FormData fields
    // formData.append('id', data.id);
    formData.append('message', data.message || '');
    formData.append('type', data.type || 'text');

    // Append file if available
    if (data?.file) {
      formData.append('file', data.file);
    }

    const response = await fetch(
      `${API_URL}/conversations/${selectedConversation.id}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Do not set Content-Type manually for FormData; browser sets it correctly
        },
        body: formData,
      },
    );
    setSendingMessage(false);
  };
  const handleSendMessage = (conversationId, message) => {
    console.log(message);
    // subscribeToChatRoom();
    const payload = {
      id: conversationId,
      message: message.text,
      type: message.type,
      file: message.file,
    };
    // sendMessage(payload);
    sendMessagesTest(payload);

    setMessagesMap((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), message],
    }));
  };

  const handleSelectConversation = (user) => {
    if (selectedConversation?.id !== user.id) {
      setMessages([]);
    }
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

  const handleCallInitiation = (type) => {
    const payload = {
      conversation_id: selectedConversation.id,
      call_type: type, // audio or video
    };
    initiateCall(payload);
  };

  const handleEndCall = () => {};

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
            isLoadingMessages={
              isSentMessageSuccess || isSendingMessage || sendingMessage
            }
            resetPage={resetPage}
            handleCallInitiation={handleCallInitiation}
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
      {agoraConfig.uid && (
        <Modal
          isOpen={agoraConfig.appId}
          onClose={() => {}}
          size="max-w-[705px] max-h-fit"
        >
          <VideoCall
            appId={agoraConfig.appId}
            channel={agoraConfig.channelName}
            token={agoraConfig.token}
            uid={agoraConfig.uid}
            handleEndCall={handleEndCall}
          />
        </Modal>
      )}
    </div>
  );
};

export default ChatView;
