import Button from '../Button';

const UpcomingLiveStreamCard = ({ option, handleJoinStream }) => {
  return (
    <>
      <div className="flex justify-between bg-[#E6BAC7] rounded-3xl w-[90%] mx-auto mb-10 p-10 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#A20030]/30">
        <div className="max-w-[509px]">
          <h3 className="text-[#A20030] font-bold text-[48px] leading-16 my-5">
            {option.title}
          </h3>
          <p className="font-normal text-[18px] leading-8 text-[#5C5F6E]">
            {option.description}
          </p>
          <Button
            label="Join Stream"
            onClick={() => handleJoinStream(option.id)}
            className="mt-10"
          />
        </div>
        <img
          src={option.banner_image_url}
          alt="Image"
          className="object-fill size-[345px] text-black mr-20 rounded-[10px]"
        />
      </div>
    </>
  );
};

export default UpcomingLiveStreamCard;
