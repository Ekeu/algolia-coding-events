import { useState, useEffect } from 'react';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { Dialog } from '@headlessui/react';
import CustomButton from '@/components/custom-button/custom-button.component';

import { API_URL } from '@/config/index';

export default function ImageUpload({
  eventId,
  handleImageUpload,
  onClose,
  title,
  token,
}) {
  const [imageToUpload, setImageToUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const eventFormData = new FormData();
    eventFormData.append('files', imageToUpload);
    eventFormData.append('ref', 'events');
    eventFormData.append('refId', eventId);
    eventFormData.append('field', 'image');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: eventFormData,
    });
    setLoading(false);
    if (res.ok) {
      handleImageUpload();
    }
  };
  useEffect(() => {
    if (!imageToUpload) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageToUpload);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageToUpload]);

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageToUpload(null);
      return;
    }
    setImageToUpload(e.target.files[0]);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className='z-20'>
        <div>
          <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100'>
            <CloudUploadIcon
              className='h-6 w-6 text-purple-600'
              aria-hidden='true'
            />
          </div>
          <div className='mt-3 text-center sm:mt-5'>
            <h3
              className='text-lg leading-6 font-medium font-hind text-blue-gray-900'
              id='modal-headline'
            >
              {title}
            </h3>
            <div className='mt-2'>
              <div className='mt-1 sm:mt-0'>
                <div className='max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-blue-gray-300 border-dashed rounded-md'>
                  <div className='space-y-1 text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-blue-gray-400'
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
                    <div className='flex text-sm text-blue-gray-600 z-20'>
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
                          accept='image/png image/jpeg'
                          onChange={handleFileChange}
                        />
                        {imageToUpload && (
                          <img
                            className='object-cover shadow-lg rounded-lg'
                            src={imagePreview}
                            alt='image-preview'
                          />
                        )}
                      </label>
                    </div>
                    <p className='text-xs text-blue-gray-500'>PNG, JPG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
          <CustomButton
            type='button'
            onClick={onClose}
            customStyles='px-6 py-3 border border-gray-300 text-white bg-white text-blue-gray-800 hover:bg-blue-gray-50'
            addStyles='ml-3 inline-flex items-center font-hind'
          >
            Cancel
          </CustomButton>
          <CustomButton
            type='submit'
            loading={loading}
            customStyles='px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-600'
            addStyles='ml-3 inline-flex items-center font-hind'
          >
            Upload
          </CustomButton>
        </div>
      </form>
    </>
  );
}
