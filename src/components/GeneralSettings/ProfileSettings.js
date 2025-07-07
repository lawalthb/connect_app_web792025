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

const ProfileSettings = () => {
  const [successfullySaved, setSuccessfullySaved] = useState(false);
  const methods = useForm();

  const countrySelected = methods.watch('country');
  const onSubmit = (data) => {
    console.log(data);
    setSuccessfullySaved(true);
    setTimeout(() => {
      setSuccessfullySaved(false);
    }, 5000);
  };
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
      <div className="mt-10">
        <UserAvatar updateImage={false} />
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
                  name={'name'}
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
                    name={'phone'}
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
                  <CountrySelect
                    name="country_id"
                    label="Country"
                    required={false}
                  />
                </div>
                <div className="w-1/2">
                  <SelectField
                    label="State"
                    name="state"
                    defaultValue=""
                    type="region"
                    country={countrySelected}
                    required={false}
                  />
                </div>
              </div>
              <InputField
                label={'Street Address'}
                type="text"
                name={'street'}
                required={false}
              />
            </div>
            <Button
              label="Save"
              type="submit"
              btnclass="w-[225px] mt-10 h-14 ml-auto"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfileSettings;
