import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../Modal';
import InputField from '../Input/InputField';
import Button from '../Button';
import ErrorMsg from '../ErrorMsg';
import SuccessMsg from '../SuccessMsg';
import { useEffect } from 'react';

const ChangePassword = ({
  activeSettings,
  handleBackToHomePage,
  onSubmitNewPassword,
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
      isOpen={activeSettings.changepassword}
      onClose={() => {
        handleBackToHomePage();
        reset();
      }}
      title="Change Password"
      size="max-w-xl"
      showFilterIcon={true}
    >
      {' '}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitNewPassword)}
          className="space-y-4 mt-10"
        >
          <InputField
            label={'Old Password'}
            type="password"
            name={'current_password'}
          />
          <InputField
            label={'New Password'}
            type="password"
            name={'password'}
          />
          <InputField
            label={'Confirm Password'}
            type="password"
            name={'password_confirmation'}
          />

          <Button
            label="Change Password"
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

export default ChangePassword;
