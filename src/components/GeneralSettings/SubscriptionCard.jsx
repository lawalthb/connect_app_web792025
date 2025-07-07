import Button from '../Button';

const SubscriptionCard = ({
  name,
  price,
  description,
  icon: Icon,
  isPremium,
  handleSubsribe,
}) => {
  return (
    <>
      <div className="border border-[#A20030] rounded-lg p-5 h-[288px]">
        <div className="w-full space-y-4">
          <div
            className={`flex items-center justify-between ${isPremium ? 'bg-[#A20030]' : 'bg-[#A2003029]'}  p-6 rounded-lg`}
          >
            <div className="flex gap-4">
              <div
                className={`flex items-center justify-center ${isPremium ? 'bg-white' : 'bg-[#A20030]'}  size-[42.83px] rounded-full`}
              >
                {Icon}
              </div>
              <h3
                className={`font-semibold text-[18px] leading-6 ${isPremium ? 'text-white' : 'text-[#A20030]'}  mt-5`}
              >
                {name}
              </h3>
            </div>
            <p
              className={`font-semibold text-[36px] leading-6 ${isPremium ? 'text-white' : 'text-[#A20030]'}`}
            >
              ${price}
            </p>
          </div>
          <p className="text-[#5C5C5C] font-semibold text-[18px] leading-6">
            Included
          </p>
          <p className="text-[#5C5C5C] font-normal text-base leading-6 max-w-[641px]">
            {description}
          </p>
        </div>
      </div>
      <Button
        label={'Subscribe'}
        btnclass="w-full h-14 max-w-[328px] ml-auto mt-7"
        btnstyle="rounded"
        onClick={handleSubsribe}
      />
    </>
  );
};

export default SubscriptionCard;
