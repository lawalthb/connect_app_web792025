import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { resendVerificationOtp } from './Utils/api';
import ErrorMsg from './ErrorMsg';

const TwoFactorCountdownTimer = ({ email }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);

  const { mutate, error } = useMutation({
    mutationFn: resendVerificationOtp,
    onError: (err) => {
      console.error('Resend failed:', err.message);
    },
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendCode = () => {
    mutate({ email });
    setTimeLeft(120);
    setCanResend(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      {canResend ? (
        <p
          onClick={handleResendCode}
          className="text-gray-500 font-normal text-base leading-[24px] "
        >
          Can’t find the code?{' '}
          <span className="cursor-pointer text-[#A20030]">Resend Code</span>
        </p>
      ) : (
        <p className="text-gray-500">Resend in {formatTime(timeLeft)}</p>
      )}
      <ErrorMsg errorMessage={error?.message} />
    </div>
  );
};

export default TwoFactorCountdownTimer;
