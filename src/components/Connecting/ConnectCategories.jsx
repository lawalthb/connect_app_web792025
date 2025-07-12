import Image from 'next/image';
import Button from '../Button';

const ConnectCategiries = ({
  socialCircles,
  handleButtonClick = () => {},
  isProfile = false,
}) => {
  return (
    <div className="my-20">
      {isProfile && (
        <h3 className="text-black font-medium text-[24px] leading-6">
          Social Circles
        </h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {socialCircles?.map((options, index) => (
          <div
            key={options.id}
            className="bg-white w-full max-w-[380px] h-[312px] rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col gap-6 justify-center items-center p-6"
          >
            <Image width={80} height={80} src={options.icon} />
            <h3 className="text-[#A20030] font-semibold text-lg text-center">
              {options.name}
            </h3>
            {!isProfile && (
              <Button
                label="Explore"
                variant="outlined"
                onClick={() => handleButtonClick(options.name)}
                className="w-[204px] h-[45px]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectCategiries;
