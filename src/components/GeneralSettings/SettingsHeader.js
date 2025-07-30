import { useState } from 'react';
import UserAvatar from './UserAvatar';
import MedalIcon from '@/Images/Icons/MedalIcon.svg';

const SettingsHeader = ({ userData, profileImages, mainProfileImage }) => {
  const [filePreviews, setFilePreviews] = useState(Array(1).fill(null));
  const [fileTypes, setFileTypes] = useState(Array(1).fill('image'));
  const [filesToSend, setFilesToSend] = useState(Array(1).fill(null));

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedFiles = [...filesToSend];
    const updatedPreviews = [...filePreviews];
    const updatedTypes = [...fileTypes];

    updatedFiles[index] = file;
    updatedTypes[index] = file.type.startsWith('video') ? 'video' : 'image';

    const reader = new FileReader();
    reader.onload = () => {
      updatedPreviews[index] = reader.result;
      setFilePreviews(updatedPreviews);
    };
    reader.readAsDataURL(file);

    setFilesToSend(updatedFiles);
    setFileTypes(updatedTypes);
  };
  return (
    <div className="flex flex-col gap-3 mx-auto items-center">
      {profileImages?.slice(0, 1).map((image, index) => (
        <UserAvatar
          key={index}
          handleFileChange={(e) => handleFileChange(e, index)}
          filePreview={filePreviews[index]}
          fileType={fileTypes[index]}
          image={mainProfileImage || image}
        />
      ))}
      <div className="flex gap-5">
        <h3 className="text-[#5C5C5C] font-semibold text-[18px] leading-6">
          {userData?.name}
        </h3>
        <MedalIcon />
      </div>
    </div>
  );
};

export default SettingsHeader;
