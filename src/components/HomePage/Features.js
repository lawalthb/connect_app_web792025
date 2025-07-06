import SocialCirclesPhone from '@/Images/SocialCirclesPhone.png';
import PhoneWithBackground from '../PhoneWithBackground';
import EllipseIcon from '@/Images/Icons/EllipseIcon';

const connectedData = [
  {
    title: 'Profile Page',
    description:
      'This showcases the user’s popularity on the app. It indicates the number of posts, the number of likes, and number of times connected.',
  },
  {
    title: 'Feed Page',
    description:
      'Once you connect with a user, you will be able to get updated information on what your new connect posts on the app.',
  },
];

const Features = () => {
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
      <div className="mt-16 lg:mt-24 flex flex-col-reverse lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2 grid grid-cols-1 gap-6">
          {connectedData.map((data, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white rounded-3xl shadow-sm p-4 sm:p-6 w-full max-w-xl"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#A20030] rounded-full flex items-center justify-center">
                  <EllipseIcon />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[32px] leading-snug tracking-tight text-black">
                  {data.title}
                </h3>
                <p className="text-sm sm:text-base text-[#838696] leading-relaxed tracking-tight">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/2 flex justify-center my-20 lg:my-0">
          <PhoneWithBackground src={SocialCirclesPhone} />
        </div>
      </div>
    </div>
  );
};

export default Features;
