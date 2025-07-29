import React, { useRef } from 'react';
import CameraIcon from '@/Images/Icons/CameraIcon.svg';

const UserAvatar = ({
  updateImage = true,
  isStories = false,
  handleFileChange,
  fileType,
  filePreview,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div
      className={`relative ${
        isStories ? 'size-40 rounded-lg' : 'size-[129.63px] rounded-full'
      } bg-[#A2003070] flex items-center justify-center`}
    >
      {fileType === 'image' ? (
        <img
          src={filePreview}
          alt="Preview"
          className={`object-cover ${
            isStories ? 'size-36 rounded-md' : 'size-[114.37px] rounded-full'
          }`}
        />
      ) : (
        <video
          src={filePreview}
          controls
          className={`object-cover ${
            isStories ? 'size-36 rounded-md' : 'size-[114.37px] rounded-full'
          }`}
        />
      )}

      {updateImage && (
        <div
          className="size-10 bg-[#F5F5F5] rounded-full flex items-center justify-center absolute bottom-0 right-0 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <CameraIcon />
        </div>
      )}

      <input
        type="file"
        accept="image/*,video/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UserAvatar;
