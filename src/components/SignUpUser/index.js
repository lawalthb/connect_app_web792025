import Button from '../Button';
import InputField from '../Input/InputField';
import { useForm, FormProvider } from 'react-hook-form';
import { useCallback, useState } from 'react';
import ConnectAppIcon from '@/Images/Icons/ConnectAppIcon.svg';
import { useRouter } from 'next/router';
import AuthHeader from '../LoginUser/AuthHeader';
import SelectField from '../Input/SelectField';
import ImageUpload from '../ImageUpload';
import AuthFooter from './AuthFooter';
import { signUp } from '../Utils/api';
import { useMutation } from '@tanstack/react-query';
import ErrorMsg from '../ErrorMsg';
import { dataURLtoFile } from '../Utils/methods';
import CountrySelect from '../Input/CountrySelect';

const SignUpUser = () => {
  const router = useRouter();
  const [isAuthType, setIsAuthType] = useState({
    firstStep: true,
    secondStep: false,
  });
  const methods = useForm();

  const firstName = methods.watch('first_name');
  const lastName = methods.watch('last_name');
  const email = methods.watch('email');
  const password = methods.watch('password');

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      router.push('/login');
    },
    onError: (err) => {
      console.error('Signup failed:', err.message);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      password: data.password,
      username: `${data.first_name} ${data.last_name}`,
      country_id: 1,
      profile_image: data.identityMedia ? data.identityMedia : '',
    };
    mutate(payload);
  };

  const handleSignUpSTeps = useCallback((identifier) => {
    switch (identifier) {
      case 'next':
        setIsAuthType({
          firstStep: false,
          secondStep: true,
        });
        break;
      default:
        console.warn('Unknown identifier:', identifier);
    }
  }, []);

  const handleLogIn = useCallback(() => {
    router.push('/login');
  }, [router]);
  return (
    <>
      <div className="flex justify-center">
        <ConnectAppIcon aria-label="Connect App Logo" />
      </div>
      <div className="flex flex-col mx-auto w-full lg:w-[420px] my-20">
        <AuthHeader
          label={'Create Account'}
          description={'Enter your details to create your CONNECT APP account'}
        />
        <FormProvider {...methods}>
          {isAuthType.firstStep && (
            <>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <InputField
                    label={'First Name'}
                    type="text"
                    name={'first_name'}
                  />
                  <InputField
                    label={'Last Name'}
                    type="text"
                    name={'last_name'}
                  />
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
                  <SelectField
                    label="Gender"
                    name="gender"
                    defaultValue=""
                    required={false}
                  >
                    {['Male', 'Female'].map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </SelectField>
                </div>
                <Button
                  label="Next"
                  type="button"
                  btnclass="w-full h-14"
                  onClick={() => handleSignUpSTeps('next')}
                  disabled={!firstName || !lastName || !email || !password}
                />
                <AuthFooter handleLogIn={handleLogIn} />
              </form>
            </>
          )}
          {isAuthType.secondStep && (
            <>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <CountrySelect
                  name="country"
                  label="Location"
                  required={false}
                />
                <SelectField
                  label="Language"
                  name="language"
                  defaultValue=""
                  required={false}
                >
                  {['English', 'French'].map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </SelectField>
                <ImageUpload />
                <Button
                  label="Create Account"
                  type="submit"
                  btnclass="w-full mt-10 h-14"
                  isLoading={isPending}
                />
                <AuthFooter handleLogIn={handleLogIn} />
              </form>
            </>
          )}
        </FormProvider>
        <ErrorMsg errorMessage={error?.message} />
      </div>
    </>
  );
};

export default SignUpUser;
