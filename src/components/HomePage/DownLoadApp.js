import Image from 'next/image';
import DownloadSocialApps from '../DownloadSocialApps';
import HoldingPhone from '@/Images/HoldingPhone.png';

const DownLoadApp = () => {
  return (
    <div className="w-full flex flex-col-reverse lg:flex-row items-center bg-[#A20030] mt-20 sm:mt-28 md:mt-36 px-4 sm:px-8 lg:px-20 py-16 lg:py-32 gap-10 lg:gap-0">
      <div className="w-full lg:w-1/2 text-center lg:text-left lg:-mt-60">
        <h3 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight lg:leading-[64px] tracking-tight mb-6">
          Download Connect App Today
        </h3>
        <DownloadSocialApps />
      </div>
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src={HoldingPhone}
          alt="Phone"
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default DownLoadApp;
