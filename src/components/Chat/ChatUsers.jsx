import Image from 'next/image';
import EmptyChat from './EmptyChat';
import EmptyChatUsers from '@/Images/EmptyChatUsers.png';
import { BsThreeDotsVertical } from 'react-icons/bs';
import SearchField from '../Input/SearchField';
import { useEffect, useState } from 'react';

const ChatUsers = ({ conversations, onSelectConversation, user }) => {
  const [showChat, setShowChat] = useState(true);
  const [showConnects, setShowConnects] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);
  const hasUsers = conversations && conversations.length > 0;

  const handleView = (identifier) => {
    if (identifier === 'connects') {
      setShowConnects(true);
      setShowChat(false);
    } else {
      setShowChat(true);
      setShowConnects(false);
    }
  };

  console.log(filteredConversations);

  useEffect(() => {
    const filteredList = conversations.filter((conversation) =>
      conversation.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredConversations(filteredList);
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="w-full p-4 h-full bg-white border-r border-gray-200">
      <div className="flex text-gray-800 justify-between items-center mb-4">
        <h3
          onClick={() => handleView('chats')}
          className={`text-lg font-bold cursor-pointer ${showChat ? 'text-[#A20030]' : ''} hover:text-[#A20030]`}
        >
          Chats
        </h3>
        <h3
          onClick={() => handleView('connects')}
          className={`text-lg font-bold cursor-pointer ${showConnects ? 'text-[#A20030]' : ''} hover:text-[#A20030]`}
        >
          Connects
        </h3>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="w-full mx-auto mb-4">
        <SearchField onChange={handleSearch} value={searchValue} />
      </div>
      {showConnects && (
        <div className="flex items-center justify-center h-[calc(100svh-10rem)]">
          <EmptyChat
            image={EmptyChatUsers}
            title="No connections Yet"
            description=""
          />
        </div>
      )}
      {showChat && (
        <div>
          {hasUsers ? (
            <div className="space-y-3 overflow-y-auto h-[calc(100svh-14rem)] pr-2">
              {filteredConversations.map((conversation) => (
                <div
                  onClick={() => onSelectConversation(conversation)}
                  key={conversation.id}
                  className="flex justify-between p-3 items-center hover:bg-gray-100 cursor-pointer rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={conversation?.image}
                      width={40}
                      height={40}
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
      )}
    </div>
  );
};

export default ChatUsers;
