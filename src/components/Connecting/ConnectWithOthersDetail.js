import Daniella from '@/Images/Daniella.png';
import FilterModal from '../Modal/FilterModal';
import { useEffect, useState } from 'react';
import FilterButton from '../FilterButton';
import ProfileCourasel from '../ProfileCourasel';
import Button from '../Button';
import { useRouter } from 'next/router';
import UserProfile from './UserProfile';
import BackToPreviousScreen from '../BackToPreviousScreen';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from '../Input/InputField';
import CustomSelect from '../Input/CustomSelect';
import { useCountryStore } from '@/zustandStore/useCountryStore';

const ConnectWithOthersDetail = ({
  profiles,
  socialId,
  handleButtonClick,
  countryList,
  handleBack,
  socialCircles,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [profile, setProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const { selectedCountry, setSelectedCountry } = useCountryStore();

  useEffect(() => {
    const data = profiles[0];
    handleUserData(data);
  }, []);

  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
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

  const handleUserData = (data) => {
    setUserData(data);
  };

  const router = useRouter();

  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const handleViewProfile = () => {
    setProfile((prev) => !prev);
  };
  return (
    <div className="max-w-[805px] mx-auto pb-20">
      {!profile && (
        <>
          <BackToPreviousScreen onBackClick={handleBack} />
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-x-5 w-full max-w-[710px] items-center justify-center mb-6">
              <Button
                label="Livestream"
                variant="outlined"
                btnclass="w-full lg:w-auto h-10 whitespace-nowrap px-6 lg:px-16"
                btnstyle="rounded"
                onClick={() => router.push('/livestream')}
              />
              <Button
                label="Subscription"
                btnclass="w-full lg:w-auto h-10 whitespace-nowrap px-6 lg:px-16"
                btnstyle="rounded"
                onClick={() =>
                  router.push(`/settings?active=subscription&id=${socialId}`)
                }
              />
              <div className="w-full lg:w-auto">
                <FilterButton handleFilter={handleFilter} />
              </div>
            </div>
            {socialId === 11 && (
              <div className="flex gap-10 w-full md:w-1/2 z-10">
                <CustomSelect
                  value={selectedCountry}
                  onChange={handleChange}
                  options={options}
                  label="Country"
                  placeholder="Choose country..."
                  labelClass="text-base font-bold"
                />
              </div>
            )}

            <ProfileCourasel
              profiles={profiles}
              handleViewProfile={handleViewProfile}
              socialId={socialId}
              handleUserData={handleUserData}
              handleButtonClick={handleButtonClick}
              selectedCountryId={selectedCountry?.value}
            />

            {showFilter && (
              <FilterModal showFilter={showFilter} handleFilter={handleFilter}>
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-4 my-5"
                  >
                    <InputField
                      label={'Age'}
                      type="text"
                      name={'age'}
                      required={false}
                    />
                    <InputField
                      label={'Language'}
                      type="text"
                      name={'language'}
                      required={false}
                    />
                    <InputField
                      label={'Interest'}
                      type="text"
                      name={'interest'}
                      required={false}
                    />
                    <Button
                      type="submit"
                      label="Apply Filter"
                      className="w-full h-14"
                    />
                  </form>
                </FormProvider>
              </FilterModal>
            )}
          </div>
        </>
      )}
      {profile && (
        <div className="mb-10">
          <BackToPreviousScreen onBackClick={handleViewProfile} />
        </div>
      )}
      {profile && (
        <UserProfile userData={userData} socialCircles={socialCircles} />
      )}
    </div>
  );
};

export default ConnectWithOthersDetail;
