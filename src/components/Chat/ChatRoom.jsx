import { FiSend } from 'react-icons/fi';
import Image from 'next/image';
import EmptyChat from './EmptyChat';
import EmptyChatRoom from '@/Images/EmptyChatRoom.png';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useScrollToBottom } from '../Hooks/useScrollToBottom';

const ChatRoom = ({
  user,
  signedInUser,
  messages,
  pagination,
  onSend,
  onBack,
  handleViewMore,
  isLoadingMessages,
  resetPage,
}) => {
  const [input, setInput] = useState('');
  console.log(isLoadingMessages, 'isLoadingMessages');

  const chatContainerRef = useScrollToBottom([isLoadingMessages]);

  const reversedMessages = messages?.slice().reverse();

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onSend(newMessage);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100svh-8rem)] ">
      <div className="flex items-center gap-3 px-4 py-3 border-b">
        <button
          type="button"
          onClick={onBack}
          className="md:hidden text-sm text-[#A20030] font-medium cursor-pointer"
        >
          <IoIosArrowBack />
        </button>
        <Image
          width={40}
          height={40}
          src={user.image}
          alt={user.name}
          className="size-10 rounded-full object-cover"
        />
        <div>
          <h4 className="text-sm font-medium text-[#141414]">{user.name}</h4>
          {user?.participants?.is_online && (
            <span className="text-xs text-green-500">Online</span>
          )}
        </div>
      </div>
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-3">
        {reversedMessages.length === 0 ? (
          <div>
            <EmptyChat
              image={EmptyChatRoom}
              title="Start a Conversation"
              description={`Send a message to ${user.name}`}
              width="120"
              height="120"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {pagination?.has_more && (
              <div
                onClick={handleViewMore}
                className="text-center text-[#A20030] cursor-pointer"
              >
                View more
              </div>
            )}
            {reversedMessages?.map((msg) => (
              <div
                key={msg?.id}
                className={`flex ${msg?.user?.id === signedInUser.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                    msg?.user?.id === signedInUser.id
                      ? 'bg-[#A20030] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg?.message}</p>
                  <span className="block text-[10px] text-right mt-1 opacity-60">
                    {msg?.created_at_human}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-4 py-3 border-t flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            resetPage();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full text-sm text-gray-500 outline-none focus:ring-1 focus:ring-[#A20030]"
        />
        <button
          onClick={handleSend}
          className="text-gray-500 bg-[#A20030] hover:bg-[#870026] p-2 rounded-full"
        >
          <FiSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
