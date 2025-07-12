import Modal from '../Modal';
import Button from '../Button';
import { useMutation } from '@tanstack/react-query';
import ErrorMsg from '../ErrorMsg';
import SuccessMsg from '../SuccessMsg';
import { useState } from 'react';
import { updateProfile } from '../Utils/api';
import CustomSelect from '../Input/CustomSelect';

const ChangeCountry = ({
  activeSettings,
  handleBackToHomePage,
  countryList,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { mutate, isPending, isSuccess, error, reset } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setTimeout(() => {
        reset();
        setSelectedCountry(null);
        handleBackToHomePage();
      }, 2000);
    },
    onError: (err) => {
      console.error('Country update failed:', err.message);
    },
  });

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
  const onSubmitNewCountry = () => {
    const payload = {
      country_id: selectedCountry.value,
    };
    mutate(payload);
  };

  const formattedCountries = countryList?.flat();

  const options = formattedCountries?.map((item) => ({
    value: item.id,
    label: item.name,
    logo: item.flag,
  }));

  return (
    <Modal
      isOpen={activeSettings.changecountry}
      onClose={handleBackToHomePage}
      title="Change Country"
      size="max-w-xl"
      showFilterIcon={true}
    >
      <div className="w-full mb-20 mt-10">
        <CustomSelect
          value={selectedCountry}
          onChange={handleChange}
          options={options}
          label="Select Country"
          placeholder="Choose country..."
        />
      </div>
      <Button
        label="Change Country"
        type="button"
        btnclass="w-full h-14"
        onClick={onSubmitNewCountry}
        isLoading={isPending}
      />
      <ErrorMsg errorMessage={error?.message} />
      {isSuccess && (
        <SuccessMsg successMessage="Country updated successfully" />
      )}
    </Modal>
  );
};

export default ChangeCountry;
