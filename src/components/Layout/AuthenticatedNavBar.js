import React, { useState } from 'react';
import PostIcon from '@/Images/Icons/PostIcon';
import ConnectingIcon from '@/Images/Icons/ConnectingIcon';
import ChatIcon from '@/Images/Icons/ChatIcon';
import LivestreamIcon from '@/Images/Icons/LivestreamIcon';
import AdvertisingIcon from '@/Images/Icons/AdvertisingIcon';
import SettingsIcon from '@/Images/Icons/SettingsIcon';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import ProfileHeader from '../ProfileHeader';
import Notification from '../Notification';

const AuthenticatedNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userNotificationOpen, setUserNotificationOpen] = useState(false);

  const subNav = [
    { name: 'Connecting', path: '/connecting', icon: ConnectingIcon },
    { name: 'Post', path: '/post', icon: PostIcon },
    { name: 'Chat', path: '/chat', icon: ChatIcon },
    { name: 'Livestream', path: '/livestream', icon: LivestreamIcon },
    { name: 'Advertising', path: '/advertising', icon: AdvertisingIcon },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const handleNavClick = (path) => {
    setMenuOpen(false);
    if (pathname !== path) {
      router.push(path);
    }
  };

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    setUserMenuOpen(false);
    router.push('/profile');
  };

  const handleMenuOpen = () => {
    setUserNotificationOpen(false);
    setUserMenuOpen((prev) => !prev);
  };
  const handleNotificationClick = () => {
    setUserMenuOpen(false);
    setUserNotificationOpen((prev) => !prev);
  };

  return (
    <div className="relative h-[72px] w-full lg:w-[90%] rounded-xl bg-white flex items-center justify-end gap-40 mx-auto mt-5">
      <div className=" flex justify-between items-center">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-1">
          {subNav.map((nav, index) => {
            const IconComponent = nav.icon;
            const isActive = nav.path === pathname;

            return (
              <div
                key={index}
                onClick={() => handleNavClick(nav.path)}
                className={`flex items-center gap-3 hover:bg-[rgba(162,0,48,0.29)] hover:text-[#A20030] ${
                  isActive
                    ? 'bg-[rgba(162,0,48,0.29)] text-[#A20030]'
                    : 'text-[#444750]'
                } px-5 py-3 rounded-lg cursor-pointer transition-colors duration-200`}
              >
                <IconComponent
                  className={`size-5 ${
                    isActive ? 'stroke-[#A20030]' : 'stroke-[#444750]'
                  }`}
                  aria-label={`${nav.name} Icon`}
                />
                <h3 className="font-normal text-sm leading-5">{nav.name}</h3>
              </div>
            );
          })}
          <div className="hidden lg:flex items-center gap-4 mr-3 ml-32">
            <Notification
              userNotificationOpen={userNotificationOpen}
              handleNotificationClick={handleNotificationClick}
            />
            <ProfileHeader
              userMenuOpen={userMenuOpen}
              handleProfileClick={handleProfileClick}
              handleMenuOpen={handleMenuOpen}
            />
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="absolute top-6 right-0 lg:hidden flex items-center gap-4 mr-3">
          <Notification
            userNotificationOpen={userNotificationOpen}
            handleNotificationClick={handleNotificationClick}
          />
          <ProfileHeader
            userMenuOpen={userMenuOpen}
            handleProfileClick={handleProfileClick}
            handleMenuOpen={handleMenuOpen}
          />
          {!menuOpen ? (
            <RxHamburgerMenu
              className="text-[#444750] size-6 cursor-pointer"
              onClick={handleMenuClick}
            />
          ) : (
            <IoClose
              onClick={handleMenuClick}
              className="text-[#444750] size-6 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden w-full mt-96 z-10 space-y-2 bg-white rounded-lg shadow-md p-4">
          {subNav.map((nav, index) => {
            const IconComponent = nav.icon;
            const isActive = nav.path === pathname;
            return (
              <div
                key={index}
                onClick={() => handleNavClick(nav.path)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? 'bg-[rgba(162,0,48,0.29)] text-[#A20030]'
                    : 'hover:bg-[rgba(162,0,48,0.29)] hover:text-[#A20030] text-[#444750]'
                }`}
              >
                <IconComponent
                  className={`size-5 ${
                    isActive ? 'stroke-[#A20030]' : 'stroke-[#444750]'
                  }`}
                  aria-label={`${nav.name} Icon`}
                />
                <span className="text-sm font-medium">{nav.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AuthenticatedNavBar;
