import JustConnectIcon from '@/Images/Icons/JustConnectIcon.svg';
import SportIcon from '@/Images/Icons/SportIcon.svg';
import HealthAndFitness from '@/Images/Icons/HealthAndFitness.svg';
import BusinessIcon from '@/Images/Icons/BusinessIcon.svg';
import FashionIcon from '@/Images/Icons/FashionIcon.svg';
import GamingIcon from '@/Images/Icons/GamingIcon.svg';
import { useState } from 'react';
import ConnectWithOthersDetail from './ConnectWithOthersDetail';
import ConnectCategiries from './ConnectCategories';

const ConnectWithOthers = ({ socialCircles }) => {
  const [optionDetail, setOptionDetail] = useState(false);
  const [optionDetailData, setOptionDetailData] = useState(false);

  const handleButtonClick = (type) => {
    console.log(`Explore clicked for: ${type}`);
    setOptionDetail(true);
    setOptionDetailData(type);
  };

  return (
    <div className="px-4">
      {!optionDetail && (
        <>
          <h3 className="font-bold text-[40px] text-[#A20030]">Category</h3>
          <ConnectCategiries
            socialCircles={socialCircles}
            handleButtonClick={handleButtonClick}
          />
        </>
      )}
      {optionDetail && <ConnectWithOthersDetail />}
    </div>
  );
};

export default ConnectWithOthers;
