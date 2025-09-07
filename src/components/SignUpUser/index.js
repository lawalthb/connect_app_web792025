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
import { API_URL, getCountry, signUp } from '../Utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import ErrorMsg from '../ErrorMsg';
import { useHandleOtpRoute } from '../Hooks/CustomHooks';
import useUserStore from '@/zustandStore/useUserStore';
import useFormStore from '@/zustandStore/useFormStore';
import SuccessMsg from '../SuccessMsg';
import CustomSelect from '../Input/CustomSelect';
import { useCountryStore } from '@/zustandStore/useCountryStore';
import Loader from '../Loader/Loader';

const SignUpUser = () => {
  const router = useRouter();
  const [isAuthType, setIsAuthType] = useState({
    firstStep: true,
    secondStep: false,
  });
  const methods = useForm();
  const setFormData = useFormStore((state) => state.setFormData);
  const { setUser } = useUserStore();
  const handleOtpRoute = useHandleOtpRoute();
  const { selectedCountry, setSelectedCountry } = useCountryStore();

  const firstName = methods.watch('first_name');
  const lastName = methods.watch('last_name');
  const email = methods.watch('email');
  const password = methods.watch('password');

  const { data: countryList, isLoading: isLoadingCountry } = useQuery({
    queryKey: ['country'],
    queryFn: getCountry,
  });

  const registerUser = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('username', data.username);
    formData.append('country_id', data.country_id);

    if (data.profile_image && data.profile_image instanceof File) {
      formData.append('profile_image', data.profile_image);
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload story');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data.user);
      setTimeout(() => {
        reset();
        handleOtpRoute({ confirmPassword: false });
      }, 2000);
    },
    onError: (err) => {
      console.error('Signup failed:', err.message);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      phone_number: data.phone_number,
      password: data.password,
      username: `${data.first_name} ${data.last_name}`,
      country_id: selectedCountry?.value,
      profile_image: data.identityMedia ? data.identityMedia : '',
    };
    setFormData(payload);
    mutate(payload);
  };

  const handleSignUpSTeps = useCallback(async (identifier) => {
    switch (identifier) {
      case 'next':
        // ✅ Validate specific fields before moving to step 2
        const isValid = await methods.trigger([
          'first_name',
          'last_name',
          'email',
          'password',
        ]);

        if (isValid) {
          setIsAuthType({
            firstStep: false,
            secondStep: true,
          });
        }
        break;
      default:
        console.warn('Unknown identifier:', identifier);
    }
  }, []);

  const handleLogIn = useCallback(() => {
    router.push('/login');
  }, [router]);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  if (isLoadingCountry) return <Loader />;

  const formattedCountries = countryList?.data?.countries?.flat();

  const options = formattedCountries?.map((item) => ({
    value: item.id,
    label: item.name,
    logo: item.flag,
  }));
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
                    label={'Phone Number'}
                    type="number"
                    name={'phone_number'}
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
                {/* <CountrySelect
                  name="country"
                  label="Location"
                  required={false}
                /> */}
                <CustomSelect
                  value={selectedCountry}
                  onChange={handleChange}
                  options={options}
                  label="Location"
                  placeholder="Select country..."
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
        {isSuccess && <SuccessMsg successMessage="Signed up successfully" />}
      </div>
    </>
  );
};

export default SignUpUser;
