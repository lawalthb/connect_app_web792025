import Image from 'next/image';
import EmptyChat from './EmptyChat';
import EmptyChatUsers from '@/Images/EmptyChatUsers.png';
import { BsThreeDotsVertical } from 'react-icons/bs';
import SearchField from '../Input/SearchField';
import { useEffect, useState } from 'react';

const ChatUsers = ({
  conversations,
  onSelectConversation,
  user,
  onDeleteConversations,
}) => {
  const [showChat, setShowChat] = useState(true);
  const [showConnects, setShowConnects] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);

  // ✅ New states for delete mode
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedChats, setSelectedChats] = useState([]);

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

  useEffect(() => {
    const filteredList = conversations.filter((conversation) =>
      conversation.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredConversations(filteredList);
  }, [searchValue, conversations]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const handleStartDeleteMode = () => {
    setDeleteMode(true);
    setShowMore(false);
    setSelectedChats([]);
  };

  const handleCancelDeleteMode = () => {
    setDeleteMode(false);
    setSelectedChats([]);
  };

  const toggleSelectChat = (id) => {
    setSelectedChats((prev) =>
      prev.includes(id)
        ? prev.filter((chatId) => chatId !== id)
        : [...prev, id],
    );
  };

  const handleDeleteSelected = () => {
    if (selectedChats.length === 0) {
      return;
    }
    // Call the delete handler passed from parent
    // onDeleteConversations(selectedChats);
    setDeleteMode(false);
    setSelectedChats([]);
  };

  return (
    <div className="w-full p-4 h-full bg-white border-r border-gray-200">
      {/* Header */}
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
        <div className="relative">
          <BsThreeDotsVertical
            onClick={handleShowMore}
            className="text-[#292D32] cursor-pointer"
          />
          {showMore && (
            <div className="absolute z-10 right-7 py-4 pl-3 border border-[#FAFAFA] text-[#2E2E2E] bg-white shadow-lg w-[163px] font-normal text-[12px] leading-6 rounded-[10px]">
              <p
                onClick={handleStartDeleteMode}
                className="cursor-pointer hover:text-[#A20030]"
              >
                Delete Chats
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Mode Toolbar */}
      {deleteMode && (
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-gray-600">
            {selectedChats.length} selected
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="px-3 py-1 cursor-pointer bg-[#A20030] text-white rounded-md hover:bg-[#8B0028] text-sm"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handleCancelDeleteMode}
              className="px-3 py-1 cursor-pointer border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="w-full mx-auto mb-4">
        <SearchField onChange={handleSearch} value={searchValue} />
      </div>

      {/* Connects */}
      {showConnects && (
        <div className="flex items-center justify-center h-[calc(100svh-10rem)]">
          <EmptyChat
            image={EmptyChatUsers}
            title="No connections Yet"
            description=""
          />
        </div>
      )}

      {/* Chats */}
      {showChat && (
        <div>
          {hasUsers ? (
            <div className="space-y-3 overflow-y-auto h-[calc(100svh-14rem)] pr-2">
              {filteredConversations.map((conversation) => {
                const isSelected = selectedChats.includes(conversation.id);
                return (
                  <div
                    onClick={() =>
                      deleteMode
                        ? toggleSelectChat(conversation.id)
                        : onSelectConversation(conversation)
                    }
                    key={conversation.id}
                    className={`flex justify-between p-3 items-center cursor-pointer rounded-lg ${
                      deleteMode
                        ? isSelected
                          ? 'bg-red-50 border border-red-300'
                          : 'hover:bg-gray-100'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {deleteMode && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="accent-[#A20030]"
                        />
                      )}
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
                );
              })}
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
