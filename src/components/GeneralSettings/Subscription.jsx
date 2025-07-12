import SubscriptionCard from './SubscriptionCard';
import PremiumIcon from '@/Images/Icons/PremiumIcon.svg';
import TravelIcon from '@/Images/Icons/TravelIcon.svg';
import UnlimitedIcon from '@/Images/Icons/UnlimitedIcon.svg';
import BoostIcon from '@/Images/Icons/BoostIcon.svg';
import { useEffect, useState } from 'react';
import SubscriptionModal from '../Modal/SubscriptionModal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Subscription = ({ data }) => {
  const [mounted, setMounted] = useState(false);
  const [showSubscribeModal, setShowSubscribeModald] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({});

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  const handleSubscribe = (data) => {
    setShowSubscribeModald((prev) => !prev);
    setSubscriptionData(data);
  };

  return (
    <div className="w-[90%] lg:w-[60%] py-20 px-4 sm:px-6 md:px-10 rounded-lg mx-auto">
      {data.map((item, index) => {
        const IconComponent =
          item.name === 'Connect Travel'
            ? TravelIcon
            : item.name === 'Connect Unlimited'
              ? UnlimitedIcon
              : item.name === 'Connect Premium'
                ? PremiumIcon
                : item.name === 'Connect Boost'
                  ? BoostIcon
                  : null;

        const isPremium = item.name === 'Connect Premium';

        return (
          <div
            key={index}
            className={`mb-16 transform transition-all duration-700 ease-out delay-${index * 100} ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SubscriptionCard
              icon={<IconComponent />}
              isPremium={isPremium}
              handleSubsribe={handleSubscribe}
              data={item}
            />
          </div>
        );
      })}
      {showSubscribeModal && (
        <Elements stripe={stripePromise}>
          <SubscriptionModal
            show={showSubscribeModal}
            onClose={handleSubscribe}
            data={subscriptionData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Subscription;
