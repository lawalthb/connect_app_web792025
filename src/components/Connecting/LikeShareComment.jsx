import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { IoShareSocialOutline } from 'react-icons/io5';
import { postComment } from '../Utils/api';
import { FiSend } from 'react-icons/fi';

const LikeShareComment = ({ feed, handleComment, showComment, feedId }) => {
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ data, id }) => postComment(data, id),
    onSuccess: () => {
      setInput('');
      handleComment();
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
    onError: (err) => {
      console.error('Commenting failed:', err.message);
    },
  });

  const singleOrPluralLikes = feed.likes_count > 1 ? 'Likes' : 'Like';
  const singleOrPluralComments =
    feed.comments_count > 1 ? 'Comments' : 'Comment';

  const submitComment = (e) => {
    const payload = {
      content: input,
    };
    if (input !== '') {
      mutate({ data: payload, id: feedId });
    }
  };
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
          <h3
            onClick={() => handleComment(feed.id)}
            className="text-base font-semibold text-gray-600 cursor-pointer hover:text-[#A20030]"
          >
            Comment
          </h3>
        ) : (
          <h3
            onClick={() => handleComment(feed.id)}
            className="text-base font-semibold text-gray-600 cursor-pointer hover:text-[#A20030]"
          >
            {`${feed?.comments_count > 0 ? feed.comments_count : ''} ${singleOrPluralComments}`}
          </h3>
        )}
        {showComment && feedId === feed.id && (
          <>
            <div className="text-[#050505] text-sm p-3 w-max bg-[#F0F2F5] rounded-[18px] mt-2 mx-8">
              <h3 className=" font-semibold">{feed?.user?.name}</h3>
              <p className="font-normal">{feed?.content}</p>
            </div>
            <div className="flex gap-x-3 text-gray-600 font-bold text-xs mx-12 mt-2">
              <p>Like</p>
              <p>Comment</p>
              <p className="font-normal">{feed?.human_time}</p>
            </div>
            <div className="flex gap-x-4 w-full ">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onKeyDown={(e) => e.key === 'Enter' && submitComment()}
                placeholder="Write a comment..."
                className="w-[90%] ml-12 mt-2 px-4 py-2 border-none rounded-full text-sm text-gray-500 outline-none bg-[#F0F2F5]"
              />
              <button
                type="button"
                onClick={submitComment}
                className="text-white bg-[#A20030] hover:bg-[#870026] rounded-full mt-2 w-[20%] flex items-center justify-center gap-x-2 cursor-pointer"
              >
                Send <FiSend className="size-3" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LikeShareComment;
