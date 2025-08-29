'use client';

import { useState } from 'react';
import CommentAvatarIcon from '@/Images/Icons/CommentAvatarIcon.svg';
import LoveIcon from '@/Images/Icons/LoveIcon.svg';
import { AiOutlineLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import { FaSortDown } from 'react-icons/fa';

const Comments = ({
  comments,
  viewerComment,
  handleViewerComment,
  sendViewerComment,
}) => {
  const messages = comments.data.messages;
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => setVisibleCount(messages.length);
  const showLess = () => setVisibleCount(3);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-5 text-[#0F0F0F]">
        <h3 className="font-normal text-base">{messages.length} Comments</h3>
      </div>

      {/* Comment input */}
      <div className="flex gap-3 mt-5">
        <CommentAvatarIcon className="rounded-full" />
        <input
          type="text"
          className="font-normal text-sm w-full border-b border-[#0000001A] text-[#606060] h-[25px] pl-2"
          placeholder="Add a comment..."
          value={viewerComment}
          onChange={handleViewerComment}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendViewerComment();
            }
          }}
        />
      </div>

      {/* Render comments */}
      <div className="mt-7">
        {messages.slice(0, visibleCount).map((msg) => (
          <div key={msg.id} className="flex gap-4 mb-6">
            {/* User avatar */}
            {msg.user_profile_url ? (
              <img
                src={msg.user_profile_url}
                alt={msg.username}
                className="size-10 object-cover rounded-full"
              />
            ) : (
              <div className="flex size-10 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-white">
                {msg.username[0]}
              </div>
            )}

            {/* Comment body */}
            <div className="-mt-1">
              <span className="text-[#0F0F0F] font-medium text-[13px]">
                {msg.username}
              </span>
              <span className="text-[#606060] font-normal text-xs ml-1">
                {new Date(msg.created_at).toLocaleDateString()}
              </span>
              <p className="text-[#0F0F0F] font-normal text-sm w-full">
                {msg.message}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-2">
                <AiOutlineLike className="text-[#0F0F0F] w-[18px] h-[17px] cursor-pointer" />
                <p className="text-[#606060] font-normal text-xs">0</p>
                <BiDislike className="text-[#0F0F0F] w-[18px] h-[17px] cursor-pointer" />
                <div className="relative w-fit">
                  <LoveIcon className="absolute top-1 left-2 translate-x-[-25%] translate-y-[25%]" />
                </div>
                <p className="font-medium text-xs text-[#0F0F0F] cursor-pointer ml-2">
                  Reply
                </p>
              </div>

              {/* Placeholder replies section */}
              <div className="flex items-center mt-2 gap-2 text-[#065FD4] cursor-pointer">
                <FaSortDown className="-mt-2" />
                <p className="font-medium text-sm">0 replies</p>
              </div>
            </div>
          </div>
        ))}

        {/* View more / less button */}
        {messages.length > 3 && (
          <div className="flex justify-center">
            {visibleCount < messages.length ? (
              <button
                onClick={showMore}
                className="text-sm font-medium hover:underline cursor-pointer text-black"
              >
                View more comments
              </button>
            ) : (
              <button
                onClick={showLess}
                className="text-sm font-medium hover:underline cursor-pointer text-black"
              >
                View less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
