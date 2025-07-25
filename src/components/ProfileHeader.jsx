import { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import Logout from './Logout';
import { useRouter } from 'next/router';

const ProfileHeader = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    setUserMenuOpen(false);
    router.push('/profile');
  };
  return (
    <div className="relative">
      <RxAvatar
        className="text-[#444750] size-6 cursor-pointer"
        onClick={() => setUserMenuOpen((prev) => !prev)}
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
            onClick={() => setUserMenuOpen(false)}
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
