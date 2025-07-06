import SocialCirclesPhone from '@/Images/SocialCirclesPhone.png';
import PhoneWithBackground from '../PhoneWithBackground';

const connectedData = [
  {
    step: '1',
    title: 'STEP ONE',
    description:
      'Go to the social circle page and click on a social circle that best suits your interest.',
  },
  {
    step: '2',
    title: 'STEP TWO',
    description: 'Swipe right or left indicating a want to connect or not.',
  },
  {
    step: '3',
    title: 'STEP THREE',
    description:
      'Connect with other users when you both swipe right and message each other instantly.',
  },
];

const HowConnectAppWorks = () => {
  return (
    <div className="mt-20 sm:mt-28 md:mt-36 px-4 sm:px-8 lg:px-20 mx-auto">
      <div className="text-center">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#0E0F10] leading-tight lg:leading-[64px] tracking-tight">
          How the connect app works
        </h2>
        <p className="max-w-2xl mx-auto font-normal text-base sm:text-lg lg:text-[18px] leading-relaxed tracking-tight text-[#5C5F6E] mt-4">
          First of all, you need to download the connect app from the app store
          or play store. Then, sign up by filling out the appropriate
          information, post pictures/videos of yourself.
        </p>
      </div>
      <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2 flex justify-center my-20 lg:my-0">
          <PhoneWithBackground src={SocialCirclesPhone} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {connectedData.map((data, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 sm:gap-5 bg-white rounded-3xl shadow-md p-4 sm:p-6 w-full max-w-xl"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[rgba(162,0,48,0.31)] font-bold text-2xl sm:text-[40px] text-[#A20030] rounded-full flex items-center justify-center">
                  {data.step}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] text-[#0B0D0E] leading-snug tracking-tight">
                  {data.title}
                </h3>
                <p className="text-sm sm:text-base text-[#838696] leading-relaxed tracking-tight">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowConnectAppWorks;
