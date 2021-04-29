import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

export default function SearchInput() {
  return (
    <div className='max-w-lg w-full lg:max-w-xs'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </div>
        <input
          id='search'
          name='search'
          className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Search'
          type='search'
        />
      </div>
    </div>
  );
}
