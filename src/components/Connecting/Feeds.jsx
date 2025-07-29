import Daniella from '@/Images/Daniella.png';
import WorldIcon from '@/Images/Icons/WorldIcon.svg';
import ExpandImageIcon from '@/Images/Icons/ExpandImageIcon.svg';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import { formatRelativeTime } from '../Utils/methods';
import LikeShareComment from './LikeShareComment';

const Feeds = ({ feed, handleExpandImage, handleShowMore, showMore }) => {
  const formattedDate =
    feed?.created_at && formatRelativeTime(feed?.created_at);
  return (
    <div className="bg-white rounded-lg pt-5 pb-10 w-full">
      <div className="px-5">
        <div className="flex justify-between items-center">
          <div className="pl-16">
            <h3 className="text-semibold text-black text-[15px] leading-5">
              {feed?.user?.name || feed?.name}
              <span className="text-[10px] text-gray-500 ml-1">{`@${feed?.user?.username || feed?.username}`}</span>
            </h3>
            <div className="flex items-center gap-1.5">
              <p className="text-semibold text-[#65676B] text-[13px] leading-5">
                {formattedDate}
              </p>
              <WorldIcon />
            </div>
          </div>
          <div>
            <div className="relative">
              <PiDotsThreeOutlineVertical
                onClick={handleShowMore}
                className="text-[#292D32] cursor-pointer"
              />
              {showMore && (
                <div className="absolute z-10 right-7 py-4 pl-3 border border-[#FAFAFA] text-[#2E2E2E] bg-white shadow-lg w-[163px] font-normal text-[12px] leading-6 rounded-[10px]">
                  <p
                    onClick={() => handleShowMore('post')}
                    className="cursor-pointer hover:text-[#A20030]"
                  >
                    Report Post
                  </p>
                  <p
                    onClick={() => handleShowMore('delete')}
                    className="cursor-pointer hover:text-[#A20030]"
                  >
                    Delete
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-[#050505] font-normal text-[15px] leading-5 mt-3">
          {feed?.content}
        </p>
      </div>
      <div className="relative mt-3">
        <div className="cursor-pointer absolute right-3 top-3 size-[50px] bg-[#000000AD] rounded-full flex items-center justify-center">
          <ExpandImageIcon
            onClick={() => handleExpandImage(feed?.user?.profile_url)}
          />
        </div>
        <img
          src={feed?.user?.profile_url}
          alt="Image"
          className="object-fill w-full h-[250px] text-black "
        />
      </div>
      <LikeShareComment />
    </div>
  );
};

export default Feeds;
