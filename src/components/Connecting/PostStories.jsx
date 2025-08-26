import { useState } from 'react';
import Button from '../Button';
import UserAvatar from '../GeneralSettings/UserAvatar';
import Modal from '../Modal';
import DefaultMaleAvatar from '@/Images/DefaultMaleAvatar.png';
import { API_URL, postStories, uploadFile } from '../Utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import InputField from '../Input/InputField';
import { FormProvider, useForm } from 'react-hook-form';
import ErrorMsg from '../ErrorMsg';

const PostStories = ({ show, onClose, profileImages, token }) => {
  const [filePreviews, setFilePreviews] = useState(Array(1).fill(null));
  const [fileTypes, setFileTypes] = useState(Array(1).fill('image'));
  const [filesToSend, setFilesToSend] = useState(Array(1).fill(null));

  const methods = useForm();

  const queryClient = useQueryClient();

  const postStory = async (data) => {
    const formData = new FormData();
    // formData.append('file', data.file);
    formData.append('type', data.type);
    formData.append('content', data.content);
    formData.append('privacy', data.privacy);
    formData.append('allow_replies', data.allow_replies);

    if (data.file && data.file instanceof File) {
      formData.append('file', data.file);
    }

    try {
      const response = await fetch(`${API_URL}/stories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload story');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const {
    mutate: uploadAvatar,
    isPending,
    error,
  } = useMutation({
    mutationFn: postStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myStory'] });
      onClose();
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
        type: fileTypes[0],
        privacy: 'all_connections',
        allow_replies: 1,
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
