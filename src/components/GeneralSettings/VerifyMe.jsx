import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../Modal';
import InputField from '../Input/InputField';
import Button from '../Button';
import ErrorMsg from '../ErrorMsg';
import SuccessMsg from '../SuccessMsg';
import { useEffect } from 'react';
import ImageUpload from '../ImageUpload';

const VerifyMe = ({
  activeSettings,
  handleBackToHomePage,
  onSubmitVerification,
  isLoading,
  error,
  isSuccess,
}) => {
  const methods = useForm();

  const { reset } = methods;

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);
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
          <InputField label={'Select ID type'} type="text" name={'id_type'} />
          <div className="my-10">
            <ImageUpload name="media" />
          </div>

          <Button
            label="Submit"
            type="submit"
            btnclass="w-full h-14"
            isLoading={isLoading}
          />
        </form>
      </FormProvider>
      <ErrorMsg errorMessage={error?.message} />
      {isSuccess && (
        <SuccessMsg successMessage="Password changed successfully" />
      )}
    </Modal>
  );
};

export default VerifyMe;
