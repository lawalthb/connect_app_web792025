import React, { useRef, useState } from 'react';
import DefaultMaleAvatar from '@/Images/DefaultMaleAvatar.png';
import CameraIcon from '@/Images/Icons/CameraIcon.svg';

const UserAvatar = ({ updateImage = true, isStories = false }) => {
  const fileInputRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(DefaultMaleAvatar.src);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative ${isStories ? 'size-40 rounded-lg' : 'size-[129.63px] rounded-full'} bg-[#A2003070] flex items-center justify-center`}
    >
      <img
        src={avatarSrc}
        alt="User Avatar"
        className={`object-fill ${isStories ? 'size-36' : 'size-[114.37px] rounded-full'}  text-black `}
      />
      {updateImage && (
        <div
          className="size-[40.29px] bg-[#F5F5F5] rounded-full flex items-center justify-center absolute bottom-0 right-0 cursor-pointer"
          onClick={handleIconClick}
        >
          <CameraIcon />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default UserAvatar;
