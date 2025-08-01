import ConnectAppIcon from '@/Images/Icons/ConnectAppIcon.svg';

const Loader = () => {
  return (
    <div className="flex justify-items-center justify-center h-screen w-full bg-transparent">
      <div className="flex flex-col items-center justify-center ">
        <div className="size-10 mr-20">
          <ConnectAppIcon aria-label="Connect App Logo" />
        </div>
        <div className="w-12 h-12 animate-spin mt-60">
          <div className="w-full h-full rounded-full border-4 border-t-[#A20030] border-b-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
