import { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { IoShareSocialOutline } from 'react-icons/io5';

const LikeShareComment = () => {
  const [input, setInput] = useState('');
  return (
    <div className="mt-3 px-3">
      <div className="flex justify-between text-gray-600 px-10 py-2 border-y-2 border-gray-300">
        <div className="flex items-center justify-start gap-x-3">
          <AiOutlineLike />
          <span className="text-base font-semibold">300 Likes</span>
        </div>
        <div className="flex items-center justify-start gap-x-3">
          <span className="text-base font-semibold">Share</span>
          <IoShareSocialOutline />
        </div>
      </div>
      <div className="mt-2 w-full ">
        <h3 className="text-base font-semibold text-gray-600">Comments</h3>
        <div className="text-[#050505] text-sm p-3 w-max bg-[#F0F2F5] rounded-[18px] mt-2 mx-8">
          <h3 className=" font-semibold">Jackson Fave</h3>
          <p className="font-normal">This is great</p>
        </div>
        <div className="flex gap-x-3 text-gray-600 font-bold text-xs mx-12 mt-2">
          <p>Like</p>
          <p>Comment</p>
          <p className="font-normal">10 h</p>
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
      </div>
    </div>
  );
};

export default LikeShareComment;
