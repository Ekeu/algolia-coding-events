import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import AuthContext from '@/context/auth.context';

import CustomButton from '@/components/custom-button/custom-button.component';
import Layout from '@/components/layout/layout.component';
import FormInput from '@/components/form-input/form-input.component';
import Notification from '@/components/notification/notification.component';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { signin, error, loading } = useContext(AuthContext);

  useEffect(
    () =>
      error &&
      toast(
        <Notification error headline='Signin Failed!'>
          {error}
        </Notification>
      )
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    signin({ email, password });
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout title='Sign In | CodingLab'>
      <div className='min-h-screen bg-blue-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
            className='mx-auto h-12 w-auto'
            src='/assets/images/codingLab-logo.svg'
            alt='CodingLab'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold font-hind text-blue-gray-800'>
            I already have an account ✌🏽
          </h2>
          <p className='mt-2 text-center text-sm text-blue-gray-600 max-w'>
            Or don't have and account yet?
            <Link href='/auth/signup'>
              <a className='font-medium text-purple-500 hover:text-purple-500'>
                {' '}
                Sign up
              </a>
            </Link>
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={onSubmit}>
              <FormInput
                id='email'
                name='email'
                type='email'
                label='email'
                labelText='Email address'
                autoComplete='email'
                register={register('email', {
                  required: 'Email is a required field.',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Please enter a valid email',
                  },
                })}
                placeholder='monks.dev@clab.com'
                error={errors.email?.message}
              />
              <FormInput
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='current-password'
                labelText='Password'
                label='password'
                placeholder='******'
                register={register('password', {
                  required: 'Password is a required field.',
                })}
                showPassword={showPassword}
                togglePassword={togglePassword}
                error={errors.password?.message}
                passwordEyeIcon
              />

              <div>
                <CustomButton
                  type='submit'
                  customStyles='w-full px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-600'
                  addStyles='inline-flex items-center font-hind'
                  loading={loading}
                >
                  Sign in
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
