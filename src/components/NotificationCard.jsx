import { useRouter } from 'next/router';
import Button from './Button';

const NotificationCard = ({
  title = 'Send Request:',
  username = 'Andrew',
  time = '4 days ago',
  icon: Icon,
  isSentRequest = false,
  isSubscription = false,
  isNewMessage = false,
}) => {
  const router = useRouter();

  const handlePayNow = () => {
    router.push('/settings?active=subscription');
  };

  return (
    <div className="flex justify-start gap-x-5 my-2 cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-1 w-full ">
      <div className="size-10 bg-[#A2003021] flex items-center justify-center rounded-full">
        <Icon className="h-4 text-[#D42620]" />
      </div>
      <div className="flex flex-col gap-y-1 font-semibold text-sm text-gray-600 ">
        <h3>
          {title}{' '}
          {isSentRequest && (
            <span className="font-normal">{`${username} sent you a request`}</span>
          )}
          {isNewMessage && (
            <span className="font-normal">{`You have a new message`}</span>
          )}
        </h3>
        <p className="font-normal">{time}</p>
        {isSubscription && (
          <Button
            label="Pay Now"
            btnclass="w-20 h-10 max-w-max "
            labelClass="text-sm text-nowrap"
            onClick={handlePayNow}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
