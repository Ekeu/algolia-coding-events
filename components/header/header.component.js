import { useContext, Fragment } from 'react';
import Link from 'next/link';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import SearchInput from '../search-input/search-input.component';
import AuthContext from '@/context/auth.context';
import CustomLink from '../custom-link/custom-link.component';
import MobileHeader from '../mobile-header/mobile-header.component';

export default function Header() {
  const { user, signout } = useContext(AuthContext);
  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex px-2 lg:px-0'>
                <div className='flex-shrink-0 flex items-center'>
                  <Link href='/'>
                    <img
                      className='block lg:hidden h-8 w-auto cursor-pointer'
                      src='/assets/images/codingLab-logo.svg'
                      alt='CodingLab'
                    />
                  </Link>
                  <Link href='/'>
                    <img
                      className='hidden lg:block h-8 w-auto cursor-pointer'
                      src='/assets/images/codingLab-logo.svg'
                      alt='CodingLab'
                    />
                  </Link>
                </div>
                <div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
                  <CustomLink url='/events' type='nav'>
                    Events
                  </CustomLink>
                </div>
              </div>
              <div className='flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end'>
                <SearchInput />
              </div>
              <div className='flex items-center lg:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='hidden lg:flex lg:items-center'>
                {user ? (
                  <Menu as='div' className='ml-4 relative flex-shrink-0'>
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'>
                            <span className='sr-only'>Open user menu</span>
                            <img
                              className='h-8 w-8 rounded-full'
                              src={user?.photoURL}
                              alt={user?.username}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items
                            static
                            className='z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                          >
                            <Menu.Item>
                              <Link href='/events/add'>
                                <a className='block px-4 py-2 text-sm text-blue-gray-700 hover:bg-blue-gray-100'>
                                  Add Event
                                </a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link href='/auth/me/dashboard'>
                                <a className='block px-4 py-2 text-sm text-blue-gray-700 hover:bg-blue-gray-100'>
                                  Dashboard
                                </a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <CustomLink
                                type='button'
                                role='menuitem'
                                onClick={() => signout()}
                              >
                                Sign Out
                              </CustomLink>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                ) : (
                  <CustomLink
                    url='/auth/signin'
                    type='link-button'
                    customStyles='w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-base font-medium font-hind text-white sm:w-auto'
                  >
                    Sign in
                  </CustomLink>
                )}
              </div>
            </div>
          </div>
          <MobileHeader signOut={() => signout()} user={user} />
        </>
      )}
    </Disclosure>
  );
}
