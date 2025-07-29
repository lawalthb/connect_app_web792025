import { useState } from 'react';
import Button from '../Button';
import UserAvatar from '../GeneralSettings/UserAvatar';
import Modal from '../Modal';
import DefaultMaleAvatar from '@/Images/DefaultMaleAvatar.png';
import { uploadFile } from '../Utils/api';
import { useMutation } from '@tanstack/react-query';

const ProfileImage = ({ show, onClose }) => {
  const [filePreviews, setFilePreviews] = useState(
    Array(6).fill(DefaultMaleAvatar.src),
  );
  const [fileTypes, setFileTypes] = useState(Array(6).fill('image'));
  const [filesToSend, setFilesToSend] = useState(Array(6).fill(null));

  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      console.log('Upload successful:', data);
    },
    onError: (error) => {
      console.error('Upload failed:', error.message);
    },
  });

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

  const handleUploadImage = () => {
    filesToSend.forEach((file) => {
      if (file) uploadAvatar(file);
    });
  };

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Add Media"
      size="max-w-xl"
      showFilterIcon
    >
      <div className="my-10 flex flex-wrap gap-3 justify-center">
        {[...Array(6)].map((_, index) => (
          <UserAvatar
            key={index}
            handleFileChange={(e) => handleFileChange(e, index)}
            filePreview={filePreviews[index]}
            fileType={fileTypes[index]}
          />
        ))}
      </div>
      <Button
        label={isPending ? 'Uploading...' : 'Upload'}
        type="button"
        btnclass="w-full h-14"
        onClick={handleUploadImage}
        disabled={isPending}
      />
    </Modal>
  );
};

export default ProfileImage;
