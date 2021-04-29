import React from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
} from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';

const Notification = ({
  closeToast,
  error,
  success,
  warning,
  headline,
  children,
}) => {
  return (
    <div className='max-w-sm w-full bg-white font-hind shadow-md rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
      <div className='p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0'>
            {success && (
              <CheckCircleIcon
                className='h-6 w-6 text-green-400'
                aria-hidden='true'
              />
            )}
            {error && (
              <ExclamationCircleIcon
                className='h-6 w-6 text-red-400'
                aria-hidden='true'
              />
            )}
            {warning && (
              <ExclamationIcon
                className='h-6 w-6 text-yellow-400'
                aria-hidden='true'
              />
            )}
          </div>
          <div className='ml-3 w-0 flex-1 pt-0.5'>
            <p className='text-sm font-medium text-blue-gray-900'>{headline}</p>
            <p className='mt-1 text-sm text-blue-gray-500'>{children}</p>
          </div>
          <div className='ml-4 flex-shrink-0 flex'>
            <button
              onClick={closeToast}
              className='bg-white rounded-md inline-flex text-blue-gray-400 hover:text-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <span className='sr-only'>Close</span>
              <XIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
