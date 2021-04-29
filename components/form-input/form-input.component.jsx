import React from 'react';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid';

export default function FormInput({
  handleChange,
  handlePaste,
  label,
  labelText,
  trailingIcon,
  error,
  register,
  validation,
  inputType = 'input',
  passwordEyeIcon,
  containerStyles,
  togglePassword,
  showPassword,
  children,
  hint,
  ...otherProps
}) {
  return (
    <div className={`${containerStyles}`}>
      <div className={`flex justify-between`}>
        {label && (
          <label
            htmlFor={label}
            className='block text-sm font-medium text-blue-gray-700 font-hind'
          >
            {labelText}
          </label>
        )}
        {hint && <span
          className='text-sm text-blue-gray-500 font-hind'
          id='email-optional'
        >
          {hint}
        </span>}
      </div>
      <div className='mt-1 relative rounded-md shadow-sm'>
        {inputType === 'input' && (
          <input
            {...otherProps}
            onChange={handleChange}
            onPaste={handlePaste}
            {...register}
            className={`${
              error
                ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                : 'border-blue-gray-300 placeholder-blue-gray-500 focus:ring-blue-gray-900 focus:border-blue-gray-900'
            } appearance-none block w-full ${
              trailingIcon ? 'py-3' : 'py-3 px-5'
            } sm:text-sm font-hind rounded-md`}
          />
        )}
        {inputType === 'textarea' && (
          <textarea
            {...otherProps}
            {...register}
            onChange={handleChange}
            className={`${
              error
                ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                : 'border-blue-gray-300 placeholder-blue-gray-500 focus:ring-blue-gray-900 focus:border-blue-gray-900'
            } appearance-none block w-full ${
              trailingIcon ? 'py-3' : 'py-3 px-5'
            } sm:text-sm font-hind rounded-md`}
          />
        )}

        {!error && passwordEyeIcon && (
          <div
            onClick={togglePassword}
            className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
          >
            {showPassword ? (
              <EyeIcon
                className='h-5 w-5 text-blue-gray-700'
                aria-hidden='true'
              />
            ) : (
              <EyeOffIcon
                className='h-5 w-5 text-blue-gray-700'
                aria-hidden='true'
              />
            )}
          </div>
        )}

        {error && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <ExclamationCircleIcon
              className='h-5 w-5 text-red-500'
              aria-hidden='true'
            />
          </div>
        )}
      </div>
      {error && (
        <p className='mt-2 text-sm text-red-600' id='error'>
          {error}
        </p>
      )}
      {children}
    </div>
  );
}
