import TwoFactorAuth from '@/components/LoginUser/TwoFactorAuth';
import useFormStore from '@/zustandStore/useFormStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TwoFactorAuthorization = () => {
  const router = useRouter();
  const formData = useFormStore((state) => state.formData);
  const { heading, subHeading } = router.query;

  useEffect(() => {
    if (!formData.email) {
      router.push('/login');
    }
  }, [formData.email, router]);

  return (
    <div className="mx-auto w-full lg:min-w-[570px] mt-40">
      <TwoFactorAuth
        heading={heading}
        subHeading={subHeading}
        email={formData.email}
        formData={formData}
      />
    </div>
  );
};

export default TwoFactorAuthorization;
