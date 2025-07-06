import EllipseIcon from '@/Images/Icons/EllipseIcon';
import SocialCirclesPhone from '@/Images/SocialCirclesPhone.png';
import PhoneWithBackground from '../PhoneWithBackground';

const connectedData = [
  {
    title: 'Music',
    description:
      'Meet people around the world that are fanatics about music. Connect and explore new music or create new music with new people.',
  },
  {
    title: 'Movies/TV',
    description:
      'Meet people around the world that are fanatics about Movies. Connect and discuss your favourite movies/shows.',
  },
  {
    title: 'Gaming',
    description:
      'Meet people that love gaming. Connect and play online with new connects.',
  },
  {
    title: 'Connect Travel',
    description:
      'Meet people from a country of your choice. Travel virtually or plan for travel.',
  },
  {
    title: 'Party',
    description:
      'Meet people who love to party. Connect at a distance or party virtually with new connects.',
  },
];

const GetConnected = () => {
  return (
    <div className="mt-20 sm:mt-28 md:mt-36 px-4 sm:px-8 lg:px-20 mx-auto">
      <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#0E0F10] text-center leading-tight lg:leading-[64px] tracking-tight">
        Get Connected in social circles
      </h2>
      <div className="mt-16 lg:mt-24 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-10">
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {connectedData.map((data, idx) => (
            <div key={idx} className="space-y-2 max-w-sm">
              <div className="w-14 h-14 bg-[#A20030] rounded-full flex items-center justify-center">
                <EllipseIcon />
              </div>
              <h3 className="font-bold text-lg sm:text-xl md:text-[22px] leading-snug tracking-tight text-[#0B0D0E]">
                {data.title}
              </h3>
              <p className="text-sm sm:text-base text-[#838696] leading-relaxed tracking-tight">
                {data.description}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/2 flex justify-center my-10 lg:my-0">
          <PhoneWithBackground src={SocialCirclesPhone} />
        </div>
      </div>
    </div>
  );
};

export default GetConnected;
