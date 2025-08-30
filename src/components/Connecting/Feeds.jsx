import { useEffect, useRef } from 'react';
import Daniella from '@/Images/Daniella.png';
import WorldIcon from '@/Images/Icons/WorldIcon.svg';
import ExpandImageIcon from '@/Images/Icons/ExpandImageIcon.svg';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import { formatRelativeTime } from '../Utils/methods';
import LikeShareComment from './LikeShareComment';
import Image from 'next/image';

let videoRegistry = [];

const Feeds = ({
  feed,
  handleExpandImage,
  handleShowMore,
  showMore,
  handleComment = () => {},
  showComment,
  feedId,
  socialCircles,
  signedInUser,
}) => {
  const videoRef = useRef(null);

  const socialIcons = socialCircles?.filter(
    (socials) =>
      socials.id === (feed?.social_circle_id || feed?.social_circle?.id),
  );

  const formattedDate =
    feed?.created_at && formatRelativeTime(feed?.created_at);

  const media = feed?.media?.[0];
  const mediaUrl = media?.file_url || media?.url;

  const isVideo =
    media?.mime_type?.startsWith('video') ||
    (mediaUrl && /\.(mp4|webm|ogg)$/i.test(mediaUrl));

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const videoEl = videoRef.current;
    videoRegistry.push(videoEl);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRegistry.forEach((vid) => {
              if (vid !== videoEl) vid.pause();
            });

            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(videoEl);

    return () => {
      observer.unobserve(videoEl);
      videoRegistry = videoRegistry.filter((vid) => vid !== videoEl);
    };
  }, [isVideo]);

  return (
    <div className="bg-white rounded-lg pt-5 pb-10 w-full">
      <div className="px-5">
        <div className="flex justify-between items-center">
          <div className="pl-16">
            <div className="flex gap-x-5">
              <h3 className="text-semibold text-black text-[15px] leading-5">
                {feed?.user?.name || feed?.name}
                <span className="text-[10px] text-gray-500 ml-1">{`@${
                  feed?.user?.username || feed?.username
                }`}</span>
              </h3>
              <div>
                <Image
                  width={20}
                  height={20}
                  src={
                    socialIcons?.[0]?.icon ||
                    `https://connect.udemics.com/${socialIcons?.[0]?.logo_url}/${socialIcons?.[0]?.logo}`
                  }
                  alt="Social circle"
                />
              </div>
            </div>

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
                onClick={() => handleShowMore(null, feed.id)}
                className="text-[#292D32] cursor-pointer"
              />
              {showMore && feedId === feed.id && (
                <div className="absolute z-10 right-7 py-4 pl-3 border border-[#FAFAFA] text-[#2E2E2E] bg-white shadow-lg w-[163px] font-normal text-[12px] leading-6 rounded-[10px]">
                  {signedInUser?.id !== (feed?.user_id || feed?.user?.id) && (
                    <p
                      onClick={() => handleShowMore('post')}
                      className="cursor-pointer hover:text-[#A20030]"
                    >
                      Report Post
                    </p>
                  )}
                  {signedInUser?.id === (feed?.user_id || feed?.user?.id) && (
                    <p
                      onClick={() => handleShowMore('delete')}
                      className="cursor-pointer hover:text-[#A20030]"
                    >
                      Delete
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-[#050505] font-normal text-[15px] leading-5 mt-3">
          {feed?.content}
        </p>
      </div>

      {mediaUrl && (
        <div className="relative mt-3">
          {!isVideo && (
            <div className="cursor-pointer absolute right-3 top-3 size-[50px] bg-[#000000AD] rounded-full flex items-center justify-center">
              <ExpandImageIcon onClick={() => handleExpandImage(feed)} />
            </div>
          )}
          {isVideo ? (
            <video
              ref={videoRef}
              muted
              playsInline
              controls
              className="w-full h-[250px] rounded-lg object-cover"
            >
              <source src={mediaUrl} type={media?.mime_type || 'video/mp4'} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={mediaUrl}
              alt="Media"
              className="object-fill w-full h-[250px] text-black rounded-lg"
            />
          )}
        </div>
      )}

      <LikeShareComment
        feed={feed}
        handleComment={handleComment}
        showComment={showComment}
        handleShowMore={handleShowMore}
        feedId={feedId}
      />
    </div>
  );
};

export default Feeds;
