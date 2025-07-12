import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../Modal';
import Button from '../Button';
import InputField from '../Input/InputField';
import { socialMediaLogos } from '../Utils/methods';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateProfile, updateSocialCircles } from '../Utils/api';
import ErrorMsg from '../ErrorMsg';
import SuccessMsg from '../SuccessMsg';
import CustomSelect from '../Input/CustomSelect';

const options = socialMediaLogos.map((item) => ({
  value: item.type,
  label: item.type,
  logo: item.logo,
}));

const AddExternalLinks = ({ activeSettings, handleBackToHomePage }) => {
  const methods = useForm();
  const { reset } = methods;
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const {
    mutate,
    isPending,
    isSuccess,
    error,
    reset: restLink,
  } = useMutation({
    mutationFn: updateSocialCircles,
    onSuccess: () => {
      setTimeout(() => {
        restLink();
        reset();
        setSelectedPlatform(null);
        handleBackToHomePage();
      }, 2000);
    },
    onError: (err) => {
      console.error('Social Link update failed:', err.message);
    },
  });

  const handleChange = (selectedOption) => {
    setSelectedPlatform(selectedOption);
  };

  const onSubmitExternalLinks = (data) => {
    const payload = {
      social_links: [{ platform: selectedPlatform.value, url: data.url }],
    };
    mutate(payload);
  };

  return (
    <Modal
      isOpen={activeSettings.addexternallinks}
      onClose={() => {
        handleBackToHomePage();
        reset();
      }}
      title="Add External Links"
      size="max-w-xl"
      showFilterIcon={true}
    >
      {' '}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitExternalLinks)}
          className="space-y-4 mt-10"
        >
          <div className="w-full">
            <CustomSelect
              value={selectedPlatform}
              onChange={handleChange}
              options={options}
            />
          </div>
          <InputField
            label="Link URL"
            type="url"
            name="url"
            required
            extraValidation={{
              matchesPlatform: (value) => {
                if (!selectedPlatform) return 'Please select a platform first';

                const platform = selectedPlatform.value
                  .toLowerCase()
                  .split(' ')[0];
                if (!value.toLowerCase().includes(platform)) {
                  return `The URL must be a valid ${selectedPlatform.value} link`;
                }

                return true;
              },
            }}
          />
          <Button
            label="Save"
            type="submit"
            btnclass="w-full h-14"
            isLoading={isPending}
          />
        </form>
        <ErrorMsg errorMessage={error?.message} />
        {isSuccess && (
          <SuccessMsg successMessage="Social link updated successfully" />
        )}
      </FormProvider>
    </Modal>
  );
};

export default AddExternalLinks;
