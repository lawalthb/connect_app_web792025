import Daniella from '@/Images/Daniella.png';
import { FaCirclePlus } from 'react-icons/fa6';

const ConnectStory = ({ extraStyle = 'text-[16px]', handlePostStories }) => {
  return (
    <div>
      <h3 className={`text-black font-medium leading-6 ${extraStyle}`}>
        Connect Story
      </h3>
      <div className="relative w-[75px]">
        <img
          src={Daniella.src}
          alt="Image"
          className="object-fill w-[75px] h-[108px] text-black border border-[#A20030] p-1 rounded-[20px] my-5"
        />
        <FaCirclePlus
          onClick={handlePostStories}
          className="fill-[#A20030] absolute bottom-2.5 right-2.5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ConnectStory;
