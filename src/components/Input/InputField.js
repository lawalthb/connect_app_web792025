import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InputDatePicker from './InputDatePicker';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getFormFieldError } from '../Utils/methods';
import FormLabel from '../FormLabel';

const trapSpacesForRequiredFields = (value, required, type) => {
  if (type !== 'text') {
    return true;
  }
  if (required) {
    return !!value.trim();
  }
};

const InputField = ({
  type = 'text',
  id,
  name,
  errMsg,
  className = '',
  required = true,
  label,
  validatePassword,
  extraPattern,
  extraValidation,
  rightIconComponent = type === 'password',
  size = 'md',
  containerClass = 'mb-5',
  requiredMsg = 'This field is required',
  customCounter,
  enableValidation = true,
  portalId,
  ...otherProps
}) => {
  const patternMap = {
    text: /[a-zA-Z0-9]/,
    name: /^[a-zA-Z-]+$/,
    date: '',
    url:
      extraPattern ||
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    password:
      /(?=[A-Za-z0-9@#$%^&*()_+\-=[\]{}|\\;:'",.<>?/!]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*()_+\-=[\]{}|\\;:'",.<>?/!])(?=.{8,}).*$/,
    number: /^-?\d*\.?\d+$/,
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const pattern = patternMap[type] || '';

  const [showPassword, setShowPassword] = useState(false);

  let minMax = {};
  if (otherProps.min || otherProps.max) {
    minMax = {
      min: {
        value: otherProps.min,
        message: errMsg,
      },
      max: {
        value: otherProps.max,
        message: errMsg,
      },
    };
  }

  const numberInputClass =
    type === 'number'
      ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      : '';

  const sizes = {
    sm: 'text-sm rounded-md',
    md: 'text-base rounded-[10px]',
    lg: 'text-xl rounded-xl ',
  };
  const baseClasses =
    'py-2.5 pl-3 w-full h-14 text-gray-500 bg-[rgba(162,0,48,0.29)] placeholder-gray-400 focus:outline-none focus:border-[#A20030] focus:border-2 transition duration-300 ease-in-out ';
  const errorClass = errors?.[name]?.message
    ? 'border-red-600 border'
    : 'border dark:border-white border-gray-300';
  const hasRightIcon = rightIconComponent ? 'pr-8' : 'pr-2.5';
  const hoverClass = 'hover:border hover:border-[#A20030] ';
  const disabledClass =
    'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 disabled:placeholder-gray-400 disabled:border-gray-200';
  const inputClasses = `${baseClasses} ${sizes[size]} ${errorClass} ${hasRightIcon} ${hoverClass} ${disabledClass} ${className} ${numberInputClass}`;

  const passwordValidations = {
    validate: (value) => (validatePassword ? validatePassword(value) : null),
    minLength: {
      value: 8,
      message: 'Password must have at least 8 characters',
    },
    pattern: {
      value: pattern,
      message: `Strong passwords should be at least 8 characters long
		with a mix of upper case, lower case, number, and
		special characters`,
    },
    ...minMax,
  };

  const element = () => {
    switch (type) {
      case 'password':
        return (
          <div className="relative">
            <input
              className={inputClasses}
              type={showPassword ? 'text' : 'password'}
              id={id || name}
              {...register(name, {
                required: required ? 'Password is required' : false,
                ...(enableValidation ? passwordValidations : {}),
              })}
              name={name}
              {...otherProps}
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-3 top-[33%] cursor-pointer text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-[33%] cursor-pointer text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        );

      case 'date':
        return (
          <InputDatePicker
            minDate={otherProps.min}
            maxDate={otherProps.max}
            name={name}
            popperPlacement="top-start"
            className={`${inputClasses} !w-full !pl-7 min-h-[2.75rem]`}
            containerClass="w-full z-[11]"
            showIcon
            isClearable
            required={required}
            requiredMsg={requiredMsg || 'This field is required'}
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            extraValidation={extraValidation}
            portalId={portalId}
            {...otherProps}
          />
        );

      default:
        return (
          <div className="relative">
            <input
              className={inputClasses}
              type={type === 'native-date' ? 'date' : type}
              id={id || name}
              {...register(name, {
                required: required ? requiredMsg : false,
                validate: {
                  isNotEmpty: (value) =>
                    trapSpacesForRequiredFields(value, required, type),
                  ...extraValidation,
                },
                pattern: {
                  value: pattern,
                  message: `Please enter a valid ${type} field`,
                },
                ...minMax,
              })}
              name={name}
              {...otherProps}
            />
            {rightIconComponent &&
              React.cloneElement(rightIconComponent, {
                className: `absolute right-3 top-[33%] cursor-pointer`,
              })}
          </div>
        );
    }
  };

  const errorMessage = getFormFieldError(errors, name);

  return (
    <>
      <div className={`flex flex-col gap-y-1 w-full ${containerClass}`}>
        <FormLabel
          id={id}
          name={name}
          size={size}
          label={label}
          required={required}
        />
        <div>{element()}</div>
        {errorMessage && (
          <p className="text-red-500 text-xs font-normal">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default InputField;
