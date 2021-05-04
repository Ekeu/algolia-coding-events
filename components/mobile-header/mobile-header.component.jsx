import React from 'react';
import { Disclosure } from '@headlessui/react';

import CustomLink from '../custom-link/custom-link.component';

const MobileHeader = ({ signOut, user }) => {
  return (
    <Disclosure.Panel className={`lg:hidden`}>
      <div className='pt-2 pb-3 space-y-1'>
        <CustomLink url='/events' type='mobile'>
          Events
        </CustomLink>
      </div>
      <div className='pt-4 pb-3 border-t border-gray-200'>
        <div className='flex items-center px-4'>
          <div className='flex-shrink-0'>
            <img
              className='h-10 w-10 rounded-full'
              src={user?.photoURL}
              alt={user?.username}
            />
          </div>
          <div className='ml-3'>
            <div className='text-base font-medium text-gray-800'>
              {user?.username}
            </div>
            <div className='text-sm font-medium text-gray-500'>
              {user?.email}
            </div>
          </div>
        </div>
        <div className='mt-3 space-y-1'>
          <CustomLink
            url='/events/add'
            custom='block capitalize px-4 py-2 text-base font-medium text-blue-gray-500 hover:text-blue-gray-800 hover:bg-blue-gray-100'
          >
            Add Event
          </CustomLink>
          <CustomLink
            url='/auth/me/dashboard'
            custom='block capitalize px-4 py-2 text-base font-medium text-blue-gray-500 hover:text-blue-gray-800 hover:bg-blue-gray-100'
          >
            Dashboard
          </CustomLink>
          <CustomLink
            type='button'
            onClick={signOut}
            custom='text-base font-medium text-blue-gray-500 hover:text-blue-gray-800 hover:bg-blue-gray-100'
          >
            Sign out
          </CustomLink>
        </div>
      </div>
    </Disclosure.Panel>
  );
};

export default MobileHeader;
