import Button from '../Button';

const SubscriptionCard = ({ icon: Icon, isPremium, handleSubsribe, data }) => {
  const formattedLabel = 'unlimited_daily_connections'.replace(/_/g, ' ');
  return (
    <div>
      <div className="group ease-in-out hover:scale-[1.02] hover:shadow-lg border border-[#A20030] rounded-lg p-5 bg-white transition-colors duration-300 h-max">
        <div className="w-full space-y-4">
          <div
            className={`flex items-center justify-between p-6 rounded-lg transition-colors duration-300 ${
              isPremium
                ? 'bg-[#A20030] group-hover:bg-[#820024]'
                : 'bg-[#A2003029] group-hover:bg-[#A2003055]'
            }`}
          >
            <div className="flex gap-4 items-center">
              <div
                className={`flex items-center justify-center size-[42.83px] rounded-full transition-colors duration-300 ${
                  isPremium
                    ? 'bg-white group-hover:bg-gray-200'
                    : 'bg-[#A20030] group-hover:bg-[#820024]'
                }`}
              >
                {Icon}
              </div>
              <h3
                className={`font-semibold text-[18px] leading-6 mt-1 transition-colors duration-300 ${
                  isPremium ? 'text-white' : 'text-[#A20030]'
                }`}
              >
                {data.name}
              </h3>
            </div>
            <p
              className={`font-semibold text-[36px] leading-6 transition-colors duration-300 ${
                isPremium ? 'text-white' : 'text-[#A20030]'
              }`}
            >
              ${data.price}
            </p>
          </div>
          <p className="text-[#5C5C5C] font-semibold text-[18px] leading-6">
            Included
          </p>
          <div className="flex flex-col gap-3">
            {data?.features?.map((feature) => (
              <label
                key={feature}
                className="inline-flex items-center gap-2 cursor-pointer text-base font-normal text-gray-800 capitalize"
              >
                <input
                  type="checkbox"
                  value={feature.toLowerCase()}
                  checked={true}
                  className="accent-[#A20030] w-4 h-4"
                />
                {feature.replace(/_/g, ' ')}
              </label>
            ))}
          </div>
          <p className="text-[#5C5C5C] font-normal text-base leading-6 max-w-[641px]">
            {data.description}
          </p>
        </div>
      </div>
      <Button
        label={'Subscribe'}
        btnclass="w-full h-14 max-w-[328px] ml-auto mt-7"
        btnstyle="rounded"
        onClick={() => handleSubsribe(data)}
      />
    </div>
  );
};

export default SubscriptionCard;
