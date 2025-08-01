import { IoMdNotificationsOutline } from 'react-icons/io';
import NotificationCard from './NotificationCard';
import { FaArrowUpLong } from 'react-icons/fa6';
import { MdAccessTime } from 'react-icons/md';
import { MdForwardToInbox } from 'react-icons/md';

const Notification = ({ handleNotificationClick, userNotificationOpen }) => {
  return (
    <div className="relative">
      <IoMdNotificationsOutline
        onClick={handleNotificationClick}
        className="text-[#444750] size-6 cursor-pointer"
      />
      {userNotificationOpen && (
        <div className="absolute right-0 mt-2 w-full lg:w-[383px] bg-white shadow-lg rounded-lg z-50 px-1">
          <h3 className="text-gray-600 text-base font-normal">Notifications</h3>
          <NotificationCard
            title="New Message:"
            username="Emily"
            isNewMessage={true}
            time="2 hours ago"
            icon={MdForwardToInbox}
          />
          <NotificationCard
            title="Your subscription is past the due date"
            time="3 hours ago"
            icon={MdAccessTime}
            isSubscription={true}
          />
          <NotificationCard
            title="Connect Request:"
            username="Emily"
            isSentRequest={true}
            time="8 hours ago"
            icon={FaArrowUpLong}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
