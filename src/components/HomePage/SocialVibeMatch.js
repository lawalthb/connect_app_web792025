import VibeMatchPhoneBg from '@/Images/VibeMatchPhoneBg.png';
import VibeMatchPhone01 from '@/Images/VibeMatchPhone01.png';
import VibeMatchPhone02 from '@/Images/VibeMatchPhone02.png';
import Image from 'next/image';
import DownloadSocialApps from '../DownloadSocialApps';

const SocialVibeMatch = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full bg-[#A20030] min-h-[calc(100vh-64px)] relative overflow-hidden">
      {/* Text + CTA */}
      <div className="flex w-full flex-col gap-6 md:gap-10 h-full py-16 md:py-24 px-5 sm:px-10 lg:px-32 z-30">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold max-w-full lg:max-w-[580px] leading-tight lg:leading-[64px] tracking-tight">
          Find People Who Match Your Social Vibe
        </h1>
        <p className="text-white text-base sm:text-lg lg:text-[18px] max-w-full lg:max-w-[380px] leading-relaxed tracking-tight">
          Connect App is a social media app that allows users to connect and
          chat with people around the world daily; based on social preferences
          and at a social distance.
        </p>
        <DownloadSocialApps />
      </div>
      <div className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] z-10">
        <div className="absolute top-5 right-[5%] sm:right-[15%] md:right-[20%] lg:right-[160px] z-30 animate-down">
          <Image
            src={VibeMatchPhone01}
            alt="Phone 01"
            className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[321px] h-auto"
            priority
          />
        </div>

        <div className="absolute top-[90px] right-[35%] sm:right-[45%] md:right-[50%] lg:right-[350px] z-20 animate-up">
          <Image
            src={VibeMatchPhone02}
            alt="Phone 02"
            className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[254px] h-auto"
            priority
          />
        </div>

        <Image
          src={VibeMatchPhoneBg}
          alt="Social Vibe Match Background"
          className="absolute right-0 top-10 w-[400px] sm:w-[500px] md:w-[600px] lg:w-[836px] h-auto object-contain z-0"
          priority
        />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes upMotion {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes downMotion {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
        }

        .animate-up {
          animation: upMotion 3s ease-in-out infinite;
        }

        .animate-down {
          animation: downMotion 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SocialVibeMatch;
