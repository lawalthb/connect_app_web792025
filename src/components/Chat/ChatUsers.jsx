import Image from 'next/image';
import EmptyChat from './EmptyChat';
import EmptyChatUsers from '@/Images/EmptyChatUsers.png';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ChatUsers = ({ users, onSelectUser }) => {
  const hasUsers = users && users.length > 0;

  return (
    <div className="w-full p-4 h-full bg-white border-r border-gray-200">
      <div className="flex text-gray-800 justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Chats</h3>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>

      {hasUsers ? (
        <div className="space-y-3 overflow-y-auto h-[calc(100svh-14rem)] pr-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between p-3 items-center hover:bg-gray-100 cursor-pointer rounded-lg"
            >
              <div
                onClick={() => onSelectUser(user)}
                className="flex items-center gap-3"
              >
                <Image
                  width={40}
                  height={40}
                  src={user.image}
                  alt={user.name}
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-[#141414] text-base">
                    {user.name}
                  </h4>
                  <p className="text-sm text-[#727272] truncate overflow-hidden whitespace-nowrap max-w-48">
                    Tap to view messages Tap to view messages Tap to view
                    messages Tap to view messages Tap to view messages
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#727272] font-normal">{user.time}</p>
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
