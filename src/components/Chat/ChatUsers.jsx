import Image from 'next/image';
import EmptyChat from './EmptyChat';
import EmptyChatUsers from '@/Images/EmptyChatUsers.png';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ChatUsers = ({ conversations, onSelectConversation, user }) => {
  const hasUsers = conversations && conversations.length > 0;

  return (
    <div className="w-full p-4 h-full bg-white border-r border-gray-200">
      <div className="flex text-gray-800 justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Chats</h3>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>

      {hasUsers ? (
        <div className="space-y-3 overflow-y-auto h-[calc(100svh-14rem)] pr-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex justify-between p-3 items-center hover:bg-gray-100 cursor-pointer rounded-lg"
            >
              <div
                onClick={() => onSelectConversation(conversation)}
                className="flex items-center gap-3"
              >
                <Image
                  width={40}
                  height={40}
                  src={conversation?.image}
                  alt={conversation.name}
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-[#141414] text-base">
                    {conversation.name}{' '}
                    {conversation?.unread_count > 0 &&
                      conversation.participants[0].id == user?.id && (
                        <span className="text-[#A20030] rounded-full font-bold text-xs">
                          {`${conversation?.unread_count} unread`}
                        </span>
                      )}
                  </h4>
                  <p className="text-sm text-[#727272] truncate overflow-hidden whitespace-nowrap max-w-48">
                    {conversation?.latest_message?.message}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#727272] font-normal">
                {conversation?.latest_message?.created_at_human}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[calc(100svh-10rem)]">
          <EmptyChat image={EmptyChatUsers} />
        </div>
      )}
    </div>
  );
};

export default ChatUsers;
