import { useCallback } from 'react';

const TabSelector = ({
  firstTabName,
  secondTabName,
  thirdTabName,
  onTabChange,
  activeTab,
}) => {
  const handleTabChange = useCallback(
    (newValue) => {
      onTabChange(newValue);
    },
    [onTabChange],
  );

  const activeColor = 'text-[#A20030] border-[#A20030]';
  const inActiveColor = 'text-[#5C5C5C] border-[#E3E3E3]';

  const firstTabBorderColor =
    activeTab === firstTabName ? activeColor : inActiveColor;

  const secondTabBorderColor =
    activeTab === secondTabName ? activeColor : inActiveColor;

  const thirdTabBorderColor =
    activeTab === thirdTabName ? activeColor : inActiveColor;

  return (
    <div className="flex w-full py-16">
      <h3
        onClick={() => handleTabChange(firstTabName)}
        className={`${firstTabBorderColor} w-1/2 font-semibold text-center text-base cursor-pointer border-b hover:border-[#A20030] hover:text-[#A20030] transition-colors`}
      >
        {firstTabName}
      </h3>
      <h3
        onClick={() => handleTabChange(secondTabName)}
        className={`${secondTabBorderColor} w-1/2 font-semibold text-center text-base cursor-pointer border-b hover:border-[#A20030] hover:text-[#A20030] transition-colors`}
      >
        {secondTabName}
      </h3>
      <h3
        onClick={() => handleTabChange(thirdTabName)}
        className={`${thirdTabBorderColor} w-1/2 font-semibold text-center text-base cursor-pointer border-b hover:border-[#A20030] hover:text-[#A20030] transition-colors`}
      >
        {thirdTabName}
      </h3>
    </div>
  );
};

export default TabSelector;
