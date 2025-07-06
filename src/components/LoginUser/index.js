import Button from '../Button';
import InputField from '../Input/InputField';
import { useForm, FormProvider } from 'react-hook-form';
import AuthHeader from './AuthHeader';
import { useCallback, useState } from 'react';
import ConnectAppIcon from '@/Images/Icons/ConnectAppIcon.svg';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword, signIn } from '../Utils/api';
import ErrorMsg from '../ErrorMsg';
import useFormStore from '@/zustandStore/useFormStore';
import useUserStore from '@/zustandStore/useUserStore';

const LoginUser = () => {
  const router = useRouter();
  const [isAuthType, setIsAuthType] = useState({
    login: true,
    password: false,
    reset: false,
  });
  const methods = useForm();
  const setFormData = useFormStore((state) => state.setFormData);
  const { setUser } = useUserStore();

  const handleBackToLogin = () => {
    setIsAuthType({
      login: true,
      password: false,
      reset: false,
    });
  };

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setUser(data.user);
      handleOtpRoute({ confirmPassword: false });
    },
    onError: (err) => {
      console.error('Sign In failed:', err.message);
    },
  });
  const {
    mutate: forgotPasswordMutation,
    isPending: isLoadingPassword,
    error: passwordError,
  } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setIsAuthType({
        login: false,
        password: false,
        reset: true,
      });
    },
    onError: (err) => {
      console.error('Sign In failed:', err.message);
    },
  });

  const handleOtpRoute = (data) => {
    const heading = data?.confirmPassword
      ? 'Reset Password'
      : 'Confirm your Email';
    const subHeading = data?.confirmPassword
      ? 'Input the code to reset your password'
      : 'Input the code to complete the verification process';
    router.push({
      pathname: '/2fa',
      query: {
        heading,
        subHeading,
      },
    });
  };

  const onSubmit = (data) => {
    setFormData(data);
    const payload = {
      email: data.email,
      password: data.password,
      remember_me: true,
      device_token: 'sample-device-token-for-push-notifications',
    };
    if (isAuthType.login) {
      mutate(payload);
    }
    if (isAuthType.password) {
      const forgetPasswordPayload = {
        email: data.email,
      };
      forgotPasswordMutation(forgetPasswordPayload);
    }
    if (isAuthType.reset) {
      handleOtpRoute({
        confirmPassword: true,
      });
    }
  };

  const handlePassword = useCallback((identifier) => {
    switch (identifier) {
      case 'showPassword':
        setIsAuthType({
          login: false,
          password: true,
          reset: false,
        });
        break;
      case 'resetPassword':
        setIsAuthType({
          login: false,
          password: false,
          reset: true,
        });
        break;
      case 'back':
        handleBackToLogin();
        break;
      default:
        console.warn('Unknown identifier:', identifier);
    }
  }, []);

  const handleCreateAccount = useCallback(() => {
    router.push('/signup');
  }, [router]);
  return (
    <>
      <div className="flex justify-center">
        <ConnectAppIcon aria-label="Connect App Logo" />
      </div>
      <div className="flex flex-col my-20">
        <AuthHeader
          label={
            isAuthType.password
              ? 'Forgot Password'
              : isAuthType.login
                ? 'Login'
                : 'Reset Password'
          }
          description={
            isAuthType.password
              ? 'Enter your email address to rest password'
              : isAuthType.login
                ? 'Enter your details to login to your CONNECT APP account'
                : 'Enter your a new password to proceed'
          }
        />
        <FormProvider {...methods}>
          {isAuthType.login && (
            <>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <InputField
                    label={'Email Address'}
                    type="email"
                    name={'email'}
                  />
                  <InputField
                    label={'Password'}
                    type="password"
                    name={'password'}
                  />
                </div>
                <p
                  onClick={() => handlePassword('showPassword')}
                  className="text-base font-semibold leading-6 text-[#A20030] cursor-pointer w-max"
                >
                  Forgot Password?
                </p>
                <p
                  onClick={() => handlePassword('resetPassword')}
                  className="text-base font-semibold leading-6 text-[#A20030] cursor-pointer w-max"
                >
                  Reset Password
                </p>
                <Button
                  label="Login"
                  type="submit"
                  btnclass="w-full"
                  isLoading={isPending}
                />
                <div className="flex items-center justify-center gap-2 mt-5">
                  <span className="text-base text-[#5C5C5C] font-normal leading-6">
                    Don’t have an account?
                  </span>
                  <span
                    onClick={handleCreateAccount}
                    className="text-[#A20030] font-semibold text-base leading-6 cursor-pointer"
                  >
                    Create Account
                  </span>
                </div>
              </form>
            </>
          )}
          {isAuthType.password && (
            <>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <InputField
                    label={'Email Address'}
                    type="email"
                    name={'email'}
                  />
                </div>
                <Button
                  label="Proceed"
                  type="submit"
                  btnclass="w-full h-14"
                  isLoading={isLoadingPassword}
                />
                <div className="flex items-center justify-center gap-2 mt-5">
                  <p
                    onClick={() => handlePassword('back')}
                    className="text-base font-semibold leading-6 underline text-[#A20030] cursor-pointer w-max mt-5"
                  >
                    Back to login
                  </p>
                </div>
              </form>
            </>
          )}
          {isAuthType.reset && (
            <>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <InputField
                    label={'Email Address'}
                    type="email"
                    name={'email'}
                  />
                  <InputField
                    label={'Create New Password'}
                    type="password"
                    name={'new_password'}
                  />
                  <InputField
                    label={'Confirm New Password'}
                    type="password"
                    name={'confirm_password'}
                  />
                </div>
                <Button label="Proceed" type="submit" btnclass="w-full h-14" />
                <div className="flex items-center justify-center gap-2 mt-5">
                  <p
                    onClick={() => handlePassword('back')}
                    className="text-base font-semibold leading-6 underline text-[#A20030] cursor-pointer w-max mt-5"
                  >
                    Back to login
                  </p>
                </div>
              </form>
            </>
          )}
        </FormProvider>
        <ErrorMsg errorMessage={error?.message || passwordError?.message} />
      </div>
    </>
  );
};

export default LoginUser;
