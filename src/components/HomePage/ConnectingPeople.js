import CowBoyIcon from '@/Images/Icons/CowBoyIcon';
import BrowserOutline from '@/Images/BrowserOutline.png';
import Image from 'next/image';
import VideoPlayer from '../VideoPlayer';

const ConnectingPeople = () => {
  return (
    <>
      <div className="flex gap-3 items-center justify-center w-full sm:w-[162px] h-10 bg-[rgba(162,0,48,0.29)] rounded-lg mt-6">
        <CowBoyIcon />
        <h3 className="font-medium text-base text-[#A20030]">Connect</h3>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10 w-full">
          <div className="w-full lg:w-[45%] text-start">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[#0B0D0E]">
              Connecting People
            </h1>
            <div className="text-[#5C5F6E] text-base sm:text-lg lg:text-[18px] leading-relaxed tracking-tight mt-5">
              <p>
                Connect App is a social media app that connects people,
                businesses, activities etc. ConnectApp uses the swipe left or
                right technology to allow users explore their interest by
                gaining various connections daily with different people around
                the world based on social circles like sports, music, gaming
                fashion etc.
              </p>
              <p className="mt-6">
                This social media app will be the first of its kind as it allows
                people to connect, make new friends, chat and meet with other
                people. Meeting new people can be challenging today. We live in
                a world where social distance is not just priority but
                impossible.
              </p>
            </div>
          </div>
          <div className="relative w-full lg:w-[55%] flex justify-center items-center">
            <Image
              src={BrowserOutline}
              alt="Browser Outline"
              className="w-full h-auto max-w-[750px] object-contain"
              priority
            />
            <div className="absolute top-[19%] left-[7%] w-[88%] sm:w[80%] h-[70%] flex items-center justify-center">
              <VideoPlayer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectingPeople;
