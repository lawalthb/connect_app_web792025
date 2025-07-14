import ConfirmedIcon from '@/Images/Icons/ConfirmedIcon.svg';
import { IoCloseSharp } from 'react-icons/io5';
import UserAvatar from './UserAvatar';
import FilterModalIcon from '@/Images/Icons/FilterModalIcon.svg';
import InputField from '../Input/InputField';
import { FormProvider, useForm } from 'react-hook-form';
import SelectField from '../Input/SelectField';
import Button from '../Button';
import { useState } from 'react';
import CountrySelect from '../Input/CountrySelect';
import { updateProfile } from '../Utils/api';
import { useMutation } from '@tanstack/react-query';
import CustomSelect from '../Input/CustomSelect';
import ErrorMsg from '../ErrorMsg';

const ProfileSettings = ({ countryList }) => {
  const [successfullySaved, setSuccessfullySaved] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const methods = useForm();

  const { reset } = methods;

  const {
    mutate,
    isPending,
    isSuccess,
    error,
    reset: resetProfile,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setSuccessfullySaved(true);
      setTimeout(() => {
        resetProfile();
        reset();
        setSuccessfullySaved(false);
      }, 5000);
    },
    onError: (err) => {
      console.error('Profile update failed:', err.message);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      country_id: selectedCountry.value,
    };
    mutate(payload);
  };

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const formattedCountries = countryList?.flat();

  const options = formattedCountries?.map((item) => ({
    value: item.id,
    label: item.name,
    logo: item.flag,
  }));
  return (
    <div className="w-[90%] lg:w-[60%] py-20 px-10 mx-auto mt-20">
      <div className="flex items-center justify-between ">
        <h3 className="text-gray-700 font-semibold text-2xl leading-6 -mt-10">
          Profile
        </h3>
        {successfullySaved && (
          <div className="flex items-center justify-between  border-[#1AA551] bg-[#EAFBF1] px-4 py-5 rounded-lg w-[442px]">
            <div className="flex items-center gap-4">
              <ConfirmedIcon />
              <p className="text-[#1AA551] text-sm leading-4 font-semibold ">
                Changes has been saved
              </p>
            </div>
            <IoCloseSharp
              onClick={() => setSuccessfullySaved(false)}
              className="text-[#1AA551] cursor-pointer"
            />
          </div>
        )}
      </div>
      <FilterModalIcon className="w-10 mt-5 ml-auto" />
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex gap-10">
                <InputField
                  label={'Full Name'}
                  type="text"
                  name={'full_name'}
                  required={false}
                />
                {/* <InputField
                  label={'Email Address'}
                  type="email"
                  name={'email'}
                  required={false}
                /> */}
              </div>
              <div className="flex gap-10 w-full">
                <div className="w-1/2">
                  <InputField
                    label={'Phone Number'}
                    type="number"
                    name={'phone_number'}
                    required={false}
                  />
                </div>
                <div className="flex gap-10 w-1/2">
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
                  <InputField
                    label={'Date of Birth'}
                    type="date"
                    name={'birth_date'}
                    required={false}
                  />
                </div>
              </div>
              <div className="flex w-full gap-10">
                <div className="w-1/2">
                  {/* <CountrySelect
                    name="country_id"
                    label="Country"
                    required={false}
                  /> */}
                  <CustomSelect
                    value={selectedCountry}
                    onChange={handleChange}
                    options={options}
                    label="Select Country"
                    placeholder="Choose country..."
                  />
                </div>
                <div className="w-1/2">
                  <SelectField
                    label="State"
                    name="state"
                    defaultValue=""
                    type="region"
                    country={selectedCountry?.label}
                    required={false}
                  />
                </div>
              </div>
              <InputField
                label={'City'}
                type="text"
                name={'city'}
                required={false}
              />
            </div>
            <Button
              label="Save"
              type="submit"
              btnclass="w-[225px] mt-10 h-14 ml-auto"
              isLoading={isPending}
            />
          </form>
          <ErrorMsg errorMessage={error?.message} />
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfileSettings;
