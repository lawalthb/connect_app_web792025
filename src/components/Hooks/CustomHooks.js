import { useRouter } from 'next/router';

export const useHandleOtpRoute = () => {
  const router = useRouter();

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

  return handleOtpRoute;
};
