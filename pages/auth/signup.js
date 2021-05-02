import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import AuthContext from '@/context/auth.context';

import { generateGravatar } from '../../utils/functions';

import CustomButton from '@/components/custom-button/custom-button.component';
import Layout from '@/components/layout/layout.component';
import FormInput from '@/components/form-input/form-input.component';
import Notification from '@/components/notification/notification.component';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { signup, error, loading } = useContext(AuthContext);

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

  const onSubmit = handleSubmit(async ({ username, email, password }) => {
    signup({ username, email, password, photoURL: generateGravatar(email) });
    /* try {
      setLoading(true);
      const photoURL = `https://robohash.org/${email}.png?set=set3&size=150x150`;
      await signup({
        userName,
        email,
        password,
        photoURL,
      });
      setLoading(false);
      toast(
        <Notification success headline='Registration succeeded!'>
          Thank you for joining Unity Booking App! Please Sign in
        </Notification>
      );
      history.push('/signin');
    } catch (error) {
      console.log(error);
      if (error.response.status === 400)
        toast(
          <Notification error headline='Registration Failed!'>
            {error.response.data}
          </Notification>
        );
      setLoading(false);
    } */
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout title='Sign Up | CodingLab'>
      <div className='min-h-screen bg-blue-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
            className='mx-auto h-12 w-auto'
            src='/assets/images/codingLab-logo.svg'
            alt='CodingLab'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold font-hind text-blue-gray-800'>
            I do not have an account 🎉
          </h2>
          <p className='mt-2 text-center text-sm text-blue-gray-600 max-w'>
            Already a member?
            <Link href='/auth/signin'>
              <a className='font-medium text-purple-500 hover:text-purple-500'>
                {' '}
                Sign in
              </a>
            </Link>
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={onSubmit}>
              <FormInput
                id='username'
                name='username'
                type='text'
                label='username'
                labelText='User name'
                autoComplete='username'
                register={register('username', {
                  required: 'User name is a required field.',
                  maxLength: {
                    value: 15,
                    message:
                      'User name must not be greater than 15 characters.',
                  },
                  minLength: {
                    value: 3,
                    message: 'User name must be at least 3 characters.',
                  },
                })}
                placeholder='monks___'
                error={errors.username?.message}
              />

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
                autoComplete='new-password'
                labelText='Password'
                label='password'
                placeholder='******'
                register={register('password', {
                  required: 'Password is a required field.',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  validate: (value) => {
                    return (
                      [
                        /[a-z]/,
                        /[A-Z]/,
                        /[0-9]/,
                        /[^a-zA-Z0-9]/,
                      ].every((pattern) => pattern.test(value)) ||
                      'Password must include a lower, upper, number and special characters.'
                    );
                  },
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
                  Sign up
                </CustomButton>
              </div>
            </form>

            <div className='mt-6'></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
