import { FormProvider, useForm } from 'react-hook-form';
import PinField from 'react-pin-field';
import AuthWrapper from './AuthWrapper';
import Button from '../Button';
import TwoFactorCountdownTimer from '../TwoFactorCountdownTimer';
import { useMutation } from '@tanstack/react-query';
import { resetUserPassword } from '../Utils/api';
import ErrorMsg from '../ErrorMsg';

const TwoFactorAuth = ({ heading, subHeading, email, formData }) => {
  const methods = useForm();

  const pinCode = methods.watch('pinCode');

  const {
    mutate: resetPasswordMutation,
    isPending: isLoadingPassword,
    error: resetPasswordError,
  } = useMutation({
    mutationFn: resetUserPassword,
    onSuccess: () => {
      window.location.href = '/login';
    },
    onError: (err) => {
      console.error('Password reset failed:', err.message);
    },
  });

  const onSubmit = (data) => {
    if (formData.confirm_password) {
      const resetPayload = {
        email: formData.email,
        otp: data.pinCode,
        password: formData.password,
        password_confirmation: formData.confirm_password,
      };
      resetPasswordMutation(resetPayload);
    } else {
      window.location.href = '/connecting';
    }
  };

  const handlePinChange = (value) => {
    methods.setValue('pinCode', value);
  };

  return (
    <AuthWrapper heading={heading} subHeading={subHeading} email={email}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mt-7 flex flex-col items-center"
        >
          <div className="flex mb-5">
            <PinField
              length={4}
              validate={/^[a-zA-Z0-9]$/}
              onComplete={(value) => methods.setValue('pinCode', value)}
              style={{
                borderColor: '#C7C7C7',
                fontSize: '20px',
                borderRadius: '6px',
                paddingTop: '10px',
                paddingBottom: '10px',
                backgroundColor: '#ffffff',
                color: '#1f2937',
                placeholderColor: '#9ca3af',
                transition: 'border-color 0.3s ease-in-out',
                width: '50px',
                textAlign: 'center',
                margin: '0 5px',
                borderWidth: '1.5px',
              }}
              onChange={handlePinChange}
            />
          </div>
          <Button
            label="Proceed"
            type="submit"
            btnclass="w-full my-1"
            disabled={!pinCode || pinCode?.length !== 4}
            isLoading={isLoadingPassword}
          />
          <TwoFactorCountdownTimer email={formData.email} />
        </form>
      </FormProvider>
      <ErrorMsg errorMessage={resetPasswordError?.message} />
    </AuthWrapper>
  );
};

export default TwoFactorAuth;
