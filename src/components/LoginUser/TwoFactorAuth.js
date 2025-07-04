import { FormProvider, useForm } from 'react-hook-form';
import PinField from 'react-pin-field';
import AuthWrapper from './AuthWrapper';
import Button from '../Button';
import TwoFactorCountdownTimer from '../TwoFactorCountdownTimer';

const TwoFactorAuth = ({ heading, subHeading, email, resetPassword }) => {
  const methods = useForm();

  const pinCode = methods.watch('pinCode');

  const onSubmit = (data) => {
    console.log(data);
    if (resetPassword) {
      window.location.href = '/login';
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
              length={6}
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
            disabled={!pinCode || pinCode?.length !== 6}
            // isLoading={isLoading}
          />
          <TwoFactorCountdownTimer />
        </form>
      </FormProvider>
    </AuthWrapper>
  );
};

export default TwoFactorAuth;
