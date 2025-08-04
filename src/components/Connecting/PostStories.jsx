import { useState } from 'react';
import Button from '../Button';
import UserAvatar from '../GeneralSettings/UserAvatar';
import Modal from '../Modal';
import DefaultMaleAvatar from '@/Images/DefaultMaleAvatar.png';
import { postStories, uploadFile } from '../Utils/api';
import { useMutation } from '@tanstack/react-query';
import InputField from '../Input/InputField';
import { FormProvider, useForm } from 'react-hook-form';
import ErrorMsg from '../ErrorMsg';

const PostStories = ({ show, onClose, profileImages }) => {
  const [filePreviews, setFilePreviews] = useState(Array(1).fill(null));
  const [fileTypes, setFileTypes] = useState(Array(1).fill('image'));
  const [filesToSend, setFilesToSend] = useState(Array(1).fill(null));

  const methods = useForm();

  const {
    mutate: uploadAvatar,
    isPending,
    error,
  } = useMutation({
    mutationFn: postStories,
    onSuccess: (data) => {
      console.log('✅ Upload successful:', data);
    },
    onError: (error) => {
      console.error('❌ Upload failed:', error.message);
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

  const onSubmit = (data) => {
    filesToSend.forEach((file) => {
      const payload = {
        ...data,
        file,
      };
      if (file) uploadAvatar(payload);
    });
  };

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Add Story"
      size="max-w-xl"
      showFilterIcon
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="my-10 flex flex-wrap gap-3 justify-center">
            {profileImages?.slice(0, 1).map((image, index) => (
              <UserAvatar
                key={index}
                isStories
                handleFileChange={(e) => handleFileChange(e, index)}
                filePreview={filePreviews[index]}
                fileType={fileTypes[index]}
                image={image}
              />
            ))}
          </div>
          <InputField label={'Caption'} type="text" name={'content'} />
          <Button
            label={'Post Story'}
            type="submit"
            btnclass="w-full h-14"
            disabled={isPending}
            isLoading={isPending}
          />
        </form>
        <ErrorMsg errorMessage={error?.message} />
      </FormProvider>
    </Modal>
  );
};

export default PostStories;
