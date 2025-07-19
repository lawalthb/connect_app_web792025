import DropDownIcon from '@/Images/Icons/DropDownIcon';
import { useEffect, useRef, useState } from 'react';

const MultiSelectDropdown = ({
  options = [],
  label = 'Select Options',
  selectedOptions,
  handleOptionToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full text-base rounded-[10px] hover:border hover:border-[#A20030] text-gray-500 pl-3 pr-1 py-2 h-14 text-left bg-[rgba(162,0,48,0.29)] shadow-sm focus:outline-none focus:border-[#A20030] focus:border-2 transition duration-300 ease-in-out"
      >
        <div className="flex items-center justify-between w-full">
          <div>
            {selectedOptions?.length > 0
              ? selectedOptions.map((opt) => opt.name).join(', ')
              : 'Select options'}
          </div>
          <DropDownIcon className="fill-gray-500" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center px-4 py-2 hover:bg-[#A20030] cursor-pointer text-gray-500"
            >
              <input
                type="checkbox"
                checked={selectedOptions?.some((item) => item.id === option.id)}
                disabled={
                  selectedOptions?.length >= 3 &&
                  !selectedOptions?.some((item) => item.id === option.id)
                }
                onChange={() => handleOptionToggle(option)}
                className="mr-2"
              />
              {option.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
