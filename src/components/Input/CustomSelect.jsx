import React from 'react';
import Select from 'react-select';

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
  <div className="flex items-center gap-2">
    <img src={logo} alt={label} className="w-5 h-5" />
    <span>{label}</span>
  </div>
);

const CustomSelect = ({
  onChange,
  value,
  options,
  label = 'Select Platform',
  placeholder = 'Choose platform...',
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        placeholder={placeholder}
        isSearchable
      />
    </div>
  );
};

export default CustomSelect;
