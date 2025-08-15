import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../Modal';
import InputField from '../Input/InputField';
import Button from '../Button';
import ErrorMsg from '../ErrorMsg';
import SuccessMsg from '../SuccessMsg';
import { useEffect } from 'react';
import ImageUpload from '../ImageUpload';
import SelectField from '../Input/SelectField';

const VerifyMe = ({
  activeSettings,
  handleBackToHomePage,
  onSubmitVerification,
  isLoading,
  error,
  isSuccess,
}) => {
  const methods = useForm();

  const { reset, watch } = methods;

  const uploadedImage = watch('id_card_image');

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  const identifications = [
    { id: 1, name: 'National Id', value: 'national_id' },
    { id: 2, name: 'Passport', value: 'passport' },
    { id: 3, name: 'Drivers License', value: 'drivers_license' },
    { id: 4, name: 'Voters Card', value: 'voters_card' },
    { id: 5, name: 'International Passport', value: 'international_passport' },
  ];
  return (
    <Modal
      isOpen={activeSettings.verifyme}
      onClose={() => {
        handleBackToHomePage();
        reset();
      }}
      title="Verify me"
      size="max-w-xl"
      showFilterIcon={true}
    >
      {' '}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitVerification)}
          className="space-y-4 mt-10"
        >
          <SelectField
            label={'Select ID type'}
            name={'id_card_type'}
            defaultValue=""
          >
            <option value="">Select ID</option>
            {identifications.map((identification) => (
              <option key={identification.id} value={identification.value}>
                {identification.name}
              </option>
            ))}
          </SelectField>
          <div className="my-10">
            <ImageUpload name="id_card_image" />
          </div>

          <Button
            label="Submit"
            type="submit"
            btnclass="w-full h-14"
            isLoading={isLoading}
            disabled={!uploadedImage}
          />
        </form>
      </FormProvider>
      <ErrorMsg errorMessage={error?.message} />
      {isSuccess && (
        <SuccessMsg successMessage="Verification sent successfully" />
      )}
    </Modal>
  );
};

export default VerifyMe;
