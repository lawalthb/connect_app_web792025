import { IoMdNotificationsOutline } from 'react-icons/io';
import NotificationCard from './NotificationCard';
import { FaArrowUpLong } from 'react-icons/fa6';
import { MdAccessTime } from 'react-icons/md';
import { MdForwardToInbox } from 'react-icons/md';

const Notification = ({
  handleNotificationClick,
  userNotificationOpen,
  data,
  unreadCount,
}) => {
  return (
    <div className="relative">
      <div className="relative inline-block">
        <IoMdNotificationsOutline
          onClick={handleNotificationClick}
          className="text-[#444750] size-6 cursor-pointer"
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>
      {userNotificationOpen && (
        <div className="absolute right-0 mt-2 w-full lg:w-[383px] bg-white shadow-lg rounded-lg z-50 px-1">
          <h3 className="text-gray-600 text-base font-normal">Notifications</h3>
          {/* <NotificationCard
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
          /> */}
          {data.notifications?.map((notification) => {
            const icon =
              notification.type === 'connection_request'
                ? FaArrowUpLong
                : notification.type === 'subscription'
                  ? MdAccessTime
                  : notification.type === 'new_message'
                    ? MdForwardToInbox
                    : MdForwardToInbox;
            return (
              <NotificationCard
                key={notification.id}
                title={notification.title}
                username={notification?.data?.sender_name}
                message={notification?.message}
                isSentRequest={true}
                time={notification?.created_at}
                icon={icon}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notification;
