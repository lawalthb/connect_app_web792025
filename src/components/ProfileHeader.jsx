import { RxAvatar } from 'react-icons/rx';
import Logout from './Logout';

const ProfileHeader = ({
  userMenuOpen,
  handleProfileClick,
  handleMenuOpen,
}) => {
  return (
    <div className="relative">
      <RxAvatar
        className="text-[#444750] size-6 cursor-pointer"
        onClick={handleMenuOpen}
      />

      {userMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
          <button
            type="button"
            onClick={handleProfileClick}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-[#444750] cursor-pointer"
          >
            Profile
          </button>
          <div className="border-t" />
          <div
            onClick={handleMenuOpen}
            className="px-4 py-2 text-sm hover:bg-gray-100 text-[#444750]"
          >
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
