import { useState } from 'react';
import { useRouter } from 'next/router';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import Layout from '@/components/layout/layout.component';
import Notification from '@/components/notification/notification.component';
import CustomButton from '@/components/custom-button/custom-button.component';
import CustomLink from '@/components/custom-link/custom-link.component';
import FormInput from '@/components/form-input/form-input.component';
import { API_URL } from '@/config/index';

const schema = yup.object().shape({
  name: yup.string().required('Name is a required field.'),
  performers: yup.string().required('Performers is a required field.'),
  venue: yup.string().required('Venue is a required field.'),
  address: yup.object().required('Address is a required field.'),
  date: yup.string().required('Date is a required field.'),
  time: yup.string().required('Time is a required field.'),
  description: yup
    .string()
    .min(15, 'The description must be at least 15 characters.')
    .required('Description is a required field.'),
});

export default function AddEventPage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Styles for Google places
  const customStyles = {
    input: (provided) => ({
      ...provided,
      boxShadow: 'none',
      padding: '6px 12px',
      ':focus': {
        ...provided[':focus'],
        boxShadow: 'none',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      padding: '0px 12px',
    }),
    control: (provided, { data, isDisabled, isFocused, isSelected }) => ({
      ...provided,
      boxShadow: errors.address?.message
        ? '0 0 1px #EF4444'
        : isFocused && '0 0 1px #111827',
      border: errors.address?.message
        ? '2px solid #EF4444'
        : isFocused
        ? '2px solid #111827'
        : '1px solid #D1D5DB',
      ':hover': {
        ...provided[':hover'],
        borderColor: errors.address?.message
          ? '#EF4444'
          : isFocused
          ? '#111827'
          : '#D1D5DB',
      },
    }),
    option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
      ...provided,
      backgroundColor: isFocused && '#8B5CF6',
      color: isFocused && '#fff',
    }),
  };

  //Form handle submit
  const onSubmit = handleSubmit(async (data) => {
    const { name, performers, venue, address, date, time, description } = data;
    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        performers,
        venue,
        date,
        time,
        description,
        address: address.label,
      }),
    });

    if (!res.ok) {
      toast(
        <Notification error headline='Error!'>
          Sorry something went wrong. Please try again
        </Notification>
      );
    } else {
      const event = await res.json();
      router.push(`/events/${event.slug}`);
      toast(
        <Notification success headline='Success'>
          Your event was successfully created!
        </Notification>
      );
    }
  });

  return (
    <Layout title='Add New Event | CodingLab'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto'>
          <div className='text-center py-6'>
            <h2 className='text-base font-hind font-semibold text-purple-700 tracking-wide uppercase'>
              CodingLab
            </h2>
            <p className='mt-1 text-4xl font-poppins font-extrabold text-blue-gray-800 sm:text-5xl sm:tracking-tight lg:text-6xl'>
              Add a new event!
            </p>
            <p className='max-w-xl font-hind mt-5 mx-auto text-xl text-gray-500'>
              Fill in the form following the instructions wherever needed and
              submit your event.
            </p>
          </div>
          <form
            className='space-y-8 divide-y divide-gray-200 pt-5'
            onSubmit={onSubmit}
          >
            <div className='space-y-8 divide-y divide-gray-200'>
              <div>
                <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <FormInput
                      id='name'
                      name='name'
                      type='text'
                      label='name'
                      labelText='Event Name'
                      register={{ ...register('name') }}
                      error={errors.name}
                      placeholder='React complete bootcamp'
                      error={errors.name?.message}
                    />
                  </div>
                  <div className='sm:col-span-3'>
                    <FormInput
                      id='performers'
                      name='performers'
                      type='text'
                      label='performers'
                      labelText='Performers'
                      register={{ ...register('performers') }}
                      error={errors.performers?.message}
                      placeholder='Jonas Spencer, David Boka, Mike Itz'
                    />
                  </div>
                  <div className='sm:col-span-3'>
                    <FormInput
                      id='venue'
                      name='venue'
                      type='text'
                      label='venue'
                      labelText='Venue'
                      register={{ ...register('venue') }}
                      error={errors.venue?.message}
                      placeholder='Madarin Oriental'
                    />
                  </div>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='address'
                      className='block text-sm font-medium font-hind text-gray-700'
                    >
                      Address
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm font-hind sm:text-sm react-select'>
                      <Controller
                        name='address'
                        render={({ field: { onChange, value } }) => (
                          <GooglePlacesAutocomplete
                            selectProps={{
                              value,
                              onChange: onChange,
                              name: 'address',
                              instanceId: 'address',
                              placeholder: 'Event address',
                              styles: customStyles,
                            }}
                            apiOptions={{ language: 'fr', region: 'fr' }}
                          />
                        )}
                        control={control}
                      />
                    </div>
                    <p className='mt-2 text-sm text-red-600' id='error'>
                      {errors.address?.message}
                    </p>
                  </div>
                  <div className='sm:col-span-3'>
                    <FormInput
                      id='date'
                      name='date'
                      type='date'
                      label='date'
                      labelText='Date'
                      register={{ ...register('date') }}
                      error={errors.date?.message}
                      placeholder='29/04/2021'
                    />
                  </div>
                  <div className='sm:col-span-3'>
                    <FormInput
                      id='time'
                      name='time'
                      type='time'
                      label='time'
                      labelText='Time'
                      register={{ ...register('time') }}
                      error={errors.time?.message}
                      placeholder='29/04/2021'
                    />
                  </div>

                  <div className='sm:col-span-6'>
                    <FormInput
                      id='description'
                      name='description'
                      type='text'
                      inputType='textarea'
                      label='description'
                      labelText='Description'
                      register={{ ...register('description') }}
                      error={errors.description?.message}
                      rows={4}
                      placeholder='This course investigates programming and problem solving using the Python programming language.'
                    >
                      <p className='mt-2 text-sm text-gray-500'>
                        Write a detailed and catchy description!
                      </p>
                    </FormInput>
                  </div>

                  <div className='sm:col-span-6 font-hind'>
                    <label
                      htmlFor='cover_photo'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Cover photo
                    </label>
                    <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                      <div className='space-y-1 text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <div className='flex text-sm text-gray-600'>
                          <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none'
                          >
                            <span>Upload a file</span>
                            <input
                              id='file-upload'
                              name='file-upload'
                              type='file'
                              className='sr-only'
                            />
                          </label>
                        </div>
                        <p className='text-xs text-gray-500'>PNG, JPG</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='pt-5'>
              <div className='flex justify-end'>
                <CustomLink
                  type='link-button'
                  url={`/events`}
                  customStyles='px-6 py-3 border border-blue-gray-300 text-base font-medium text-blue-gray-700 bg-white hover:bg-blue-gray-50'
                >
                  Cancel
                </CustomLink>
                <CustomButton
                  type='submit'
                  customStyles='px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-600'
                  addStyles='ml-3 inline-flex items-center font-hind'
                >
                  Submit
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
      </div>
      )
    </Layout>
  );
}
