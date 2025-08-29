import Daniella from '@/Images/Daniella.png';
import { FaCirclePlus } from 'react-icons/fa6';

const ConnectStory = ({
  extraStyle = 'text-[16px]',
  handlePostStories,
  handleViewStories,
  connectFeedPage = false,
  hasUnseenStories = false,
  story,
  index,
}) => {
  const ringColor = story?.user?.isOwn
    ? 'from-border-[#A20030] to-border-[#A20030]'
    : hasUnseenStories
      ? 'from-border-[#A20030] to-border-[#A20030]'
      : 'from-gray-400 to-gray-500';
  return (
    <div>
      {!connectFeedPage && (
        <h3 className={`text-black font-medium leading-6 ${extraStyle}`}>
          Connect Story
        </h3>
      )}
      <div className="relative w-[75px]">
        <img
          onClick={handleViewStories}
          src={story?.user?.avatar || Daniella.src}
          alt={story?.user?.name || 'Story'}
          className={`object-fill w-[75px] h-[108px] cursor-pointer text-black border ${ringColor} p-1 rounded-[20px] my-5`}
        />
        {index === 0 && (
          <FaCirclePlus
            onClick={handlePostStories}
            className="fill-[#A20030] absolute bottom-2.5 right-2.5 cursor-pointer"
          />
        )}
        {!index && (
          <FaCirclePlus
            onClick={handlePostStories}
            className="fill-[#A20030] absolute bottom-2.5 right-2.5 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default ConnectStory;
