import TwoFactorAuth from '@/components/LoginUser/TwoFactorAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TwoFactorAuthorization = () => {
  const router = useRouter();
  const { email, heading, subHeading, resetPassword } = router.query;

  useEffect(() => {
    if (!email) {
      router.push('/login');
    }
  }, [email, router]);

  return (
    <div className="mx-auto min-w-[570px] mt-40">
      <TwoFactorAuth
        heading={heading}
        subHeading={subHeading}
        email={email}
        resetPassword={resetPassword}
      />
    </div>
  );
};

export default TwoFactorAuthorization;
