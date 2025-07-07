import SubscriptionCard from './SubscriptionCard';
import PremiumIcon from '@/Images/Icons/PremiumIcon.svg';
import TravelIcon from '@/Images/Icons/TravelIcon.svg';
import UnlimitedIcon from '@/Images/Icons/UnlimitedIcon.svg';
import BoostIcon from '@/Images/Icons/BoostIcon.svg';
import { useEffect } from 'react';

const Subscription = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const subscriptionData = [
    {
      name: 'Connect Premium',
      price: '$19.99',
      description:
        'This will allow users to be able to have all the features from Connect Unlimited, Connect Travel and 2x Connect Boost',
      icon: PremiumIcon,
    },
    {
      name: 'Connect Travel',
      price: '$14.99',
      description:
        'This will allow users to be able to connect specifically to people in a particular country. This will allow users to plan for travel by meeting people beforehand or meet new people in a country.',
      icon: TravelIcon,
    },
    {
      name: 'Connect Unlimited',
      price: '$9.99',
      description:
        'This will allow users to be able to connect with as many users they like on a daily basis.',
      icon: UnlimitedIcon,
    },
    {
      name: 'Connect Boost',
      price: '$6.99',
      description:
        'This puts you in the front line and enables more users view your profile.',
      icon: BoostIcon,
    },
  ];

  const handleSubsribe = () => {
    console.log('Subsribe');
  };
  return (
    <div className="w-[90%] lg:w-[60%] py-20 px-10 rounded-lg mx-auto">
      {data.map((data, index) => {
        const IconComponent =
          data.name === 'Connect Travel'
            ? TravelIcon
            : data.name === 'Connect Unlimited'
              ? UnlimitedIcon
              : data.name === 'Connect Premium'
                ? PremiumIcon
                : data.name === 'Connect Boost'
                  ? BoostIcon
                  : null;
        const isPremium = data.name === 'Connect Premium';
        return (
          <div key={index} className="mb-20">
            <SubscriptionCard
              name={data.name}
              price={data.price}
              description={data.description}
              icon={<IconComponent />}
              isPremium={isPremium}
              handleSubsribe={handleSubsribe}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Subscription;
