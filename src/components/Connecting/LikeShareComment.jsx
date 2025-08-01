import { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { IoShareSocialOutline } from 'react-icons/io5';

const LikeShareComment = ({ feed, handleComment, showComment }) => {
  const [input, setInput] = useState('');
  const singleOrPluralLikes = feed.likes_count > 1 ? 'Likes' : 'Like';
  const singleOrPluralComments =
    feed.comments_count > 1 ? 'Comments' : 'Comment';
  return (
    <div className="mt-3 px-3">
      <div className="flex justify-between text-gray-600 px-10 py-2 border-y-2 border-gray-300">
        <div className="flex items-center justify-start gap-x-3 cursor-pointer hover:text-[#A20030]">
          <AiOutlineLike />
          <span className="text-base font-semibold">
            {`${feed?.likes_count > 0 ? feed.likes_count : ''} ${singleOrPluralLikes}`}
          </span>
        </div>
        <div className="flex items-center justify-start gap-x-3 cursor-pointer hover:text-[#A20030]">
          <span className="text-base font-semibold">
            {' '}
            {`${feed?.shares_count > 0 ? feed.shares_count : ''} Share`}
          </span>
          <IoShareSocialOutline />
        </div>
      </div>
      <div className="mt-2 w-full ">
        {feed?.comments_count === 0 ? (
          <h3 className="text-base font-semibold text-gray-600">No Comment</h3>
        ) : (
          <h3
            onClick={() => handleComment(feed)}
            className="text-base font-semibold text-gray-600 cursor-pointer hover:text-[#A20030]"
          >
            {`${feed?.comments_count > 0 ? feed.comments_count : ''} ${singleOrPluralComments}`}
          </h3>
        )}
        {feed?.comments_count > 0 && showComment && (
          <>
            <div className="text-[#050505] text-sm p-3 w-max bg-[#F0F2F5] rounded-[18px] mt-2 mx-8">
              <h3 className=" font-semibold">Jackson Fave</h3>
              <p className="font-normal">This is great</p>
            </div>
            <div className="flex gap-x-3 text-gray-600 font-bold text-xs mx-12 mt-2">
              <p>Like</p>
              <p>Comment</p>
              <p className="font-normal">{feed?.human_time}</p>
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') console.log('send');
              }}
              placeholder="Write a comment..."
              className="w-[90%] ml-12 mt-2 px-4 py-2 border-none rounded-full text-sm text-gray-500 outline-none bg-[#F0F2F5]"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LikeShareComment;
