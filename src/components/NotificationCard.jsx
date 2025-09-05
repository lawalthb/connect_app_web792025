import { useRouter } from 'next/router';
import Button from './Button';
import { TimeAgoDateFormat } from './TimeAgoDateFormat';

const NotificationCard = ({
  title = 'Send Request:',
  username = 'Andrew',
  time = '4 days ago',
  icon: Icon,
  message,
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
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#A2003021] shrink-0">
        <Icon className="w-5 h-5 text-[#D42620]" />
      </div>
      <div className="flex flex-col gap-y-1 font-semibold text-sm text-gray-600 ">
        <h3>
          {title} <span className="font-normal">{message}</span>
        </h3>
        <TimeAgoDateFormat dateString={time} />
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
