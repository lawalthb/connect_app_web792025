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
  const connectOptions = [
    {
      name: 'Just Connect!',
      icon: <JustConnectIcon aria-label="Just Connect Icon" />,
    },
    { name: 'Sport', icon: <SportIcon aria-label="Sport Icon" /> },
    {
      name: 'Health & Fitness',
      icon: <HealthAndFitness aria-label="Health & Fitness Icon" />,
    },
    { name: 'Business', icon: <BusinessIcon aria-label="Business Icon" /> },
    { name: 'Fashion', icon: <FashionIcon aria-label="Fashion Icon" /> },
    { name: 'Gaming', icon: <GamingIcon aria-label="Gaming Icon" /> },
  ];

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
