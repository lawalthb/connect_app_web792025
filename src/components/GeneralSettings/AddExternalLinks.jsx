import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../Modal';
import SelectField from '../Input/SelectField';
import Button from '../Button';
import InputField from '../Input/InputField';
import { socialMediaLogos } from '../Utils/methods';
import { useState } from 'react';
import Select from 'react-select';

const options = socialMediaLogos.map((item) => ({
  value: item.type,
  label: item.type,
  logo: item.logo,
}));

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    minHeight: '56px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: 'rgba(162,0,48,0.29)',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(162, 0, 48, 0.3)' : 'none',
    transition: 'border 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      borderColor: '#A20030',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: state.isSelected
      ? 'rgba(162,0,48,0.2)'
      : state.isFocused
        ? 'rgba(162,0,48,0.29)'
        : 'rgba(162,0,48,0.1)',
    color: '#0B0D0E',
    padding: '10px 15px',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }),
  container: (provided) => ({
    ...provided,
    width: '100%',
  }),
};

const formatOptionLabel = ({ label, logo }) => (
  <div className="flex items-center gap-2 ">
    <img src={logo} alt={label} className="w-5 h-5" />
    <span>{label}</span>
  </div>
);

const AddExternalLinks = ({
  activeSettings,
  handleBackToHomePage,
  onSubmitExternalLinks,
}) => {
  const methods = useForm();
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const handleChange = (selectedOption) => {
    setSelectedPlatform(selectedOption);
  };

  const selectedLogo = socialMediaLogos.find(
    (item) => item.type === selectedPlatform,
  );
  return (
    <Modal
      isOpen={activeSettings.addexternallinks}
      onClose={handleBackToHomePage}
      title="Add External Links"
      size="max-w-xl"
      showFilterIcon={true}
    >
      {' '}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitExternalLinks)}
          className="space-y-4 mt-10"
        >
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Platform
            </label>
            <Select
              options={options}
              styles={customStyles}
              formatOptionLabel={formatOptionLabel}
              onChange={handleChange}
              placeholder="Choose platform..."
              isSearchable
            />
          </div>
          <InputField
            label={'Link URL'}
            type="text"
            name={'url'}
            required={false}
          />
          <Button label="Save" type="submit" btnclass="w-full h-14" />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AddExternalLinks;
