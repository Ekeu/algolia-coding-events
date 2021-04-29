import Image from 'next/image';
import Link from 'next/link';
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';

import CustomLink from '@/components/custom-link/custom-link.component';
import CustomLinkRemark from '@/components/custom-link-remark/custom-link-remark.component';
import CustomButton from '@/components/custom-button/custom-button.component';
import Layout from '@/components/layout/layout.component';
import { API_URL } from '@/config/index';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

export default function EventPage({ event }) {
  const performers = event.performers.split(',').map((p) => p.trim());

  const eventDetail = [
    { label: 'Performers', value: performers },
    { label: 'Venue', value: event.venue },
    { label: 'Date', value: new Date(event.date).toLocaleDateString('fr-FR') },
    { label: 'Address', value: event.address },
    { label: 'Time', value: event.time },
  ];

  const content = unified()
    .use(parse)
    .use(remark2react, {
      remarkReactComponents: {
        a: CustomLinkRemark,
      },
    })
    .processSync(event.description).result;
  return (
    <Layout>
      <div className='relative bg-white py-8 sm:py-12'>
        <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start'>
          <div className='relative sm:py-16 lg:py-0'>
            <div
              aria-hidden='true'
              className='hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen'
            >
              <div className='absolute inset-y-0 right-1/2 w-full bg-blue-gray-50 rounded-r-3xl lg:right-72' />
              <svg
                className='absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12'
                width={404}
                height={392}
                fill='none'
                viewBox='0 0 404 392'
              >
                <defs>
                  <pattern
                    id='02f20b47-fd69-4224-a62a-4c9de5c763f7'
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits='userSpaceOnUse'
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className='text-blue-gray-200'
                      fill='currentColor'
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill='url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)'
                />
              </svg>
            </div>
            <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20 space-y-6'>
              <div className='relative pt-64 pb-36 rounded-2xl shadow-xl overflow-hidden'>
                <Image
                  className='absolute inset-0 h-full w-full object-cover'
                  src={
                    event.image?.formats
                      ? event.image.formats.thumbnail.url
                      : '/assets/images/codingLab-default-bg-event.png'
                  }
                  alt={event.name}
                  layout='fill'
                />
              </div>
              <div className='relative pt-64 pb-36 rounded-2xl shadow-xl overflow-hidden'>
                <Image
                  className='absolute inset-0 h-full w-full object-cover'
                  src={
                    event.image?.formats
                      ? event.image.formats.thumbnail.url
                      : '/assets/images/codingLab-default-bg-event.png'
                  }
                  alt={event.name}
                  layout='fill'
                />
              </div>
            </div>
          </div>

          <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0'>
            {/* Content area */}
            <div className='hidden pb-5 border-b border-blue-gray-200 sm:flex justify-end'>
              <div className='mt-3 flex sm:mt-0 sm:ml-4'>
                <CustomLink
                  type='link-button'
                  url={`/events/edit/${event.id}`}
                  customStyles='px-6 py-3 border border-blue-gray-300 text-base font-medium text-blue-gray-700 bg-white hover:bg-blue-gray-50'
                >
                  <PencilIcon
                    className='-ml-1 mr-2 h-5 w-5'
                    aria-hidden='true'
                  />
                  Edit event
                </CustomLink>
                <CustomButton
                  type='button'
                  onClick={() => {}}
                  customStyles='px-6 py-3 text-white bg-gradient-to-r from-orange-400 to-pink-600'
                  addStyles='ml-3 inline-flex items-center font-hind'
                >
                  <TrashIcon
                    className='-ml-1 mr-2 h-5 w-5'
                    aria-hidden='true'
                  />
                  Delete Event
                </CustomButton>
              </div>
            </div>
            <div className='pt-12 sm:pt-16 lg:pt-20'>
              <h2 className='text-3xl text-blue-gray-800 font-extrabold tracking-tight sm:text-4xl font-poppins'>
                {event.name}
              </h2>
              <div className='mt-6 text-blue-gray-500 space-y-6 font-hind'>
                <span className='text-lg'>{content}</span>
              </div>
            </div>
            <div className='mt-10'>
              <dl className='grid grid-cols-2 gap-x-4 gap-y-8'>
                {eventDetail.map((detail) => (
                  <div
                    key={detail.label}
                    className='border-t-2 border-blue-gray-100 pt-6'
                  >
                    <dt className='text-base font-hind font-medium text-blue-gray-500'>
                      {detail.label}
                    </dt>
                    <dd className='text-md font-medium tracking-tight text-blue-gray-800'>
                      {detail.label === 'Performers' ? (
                        <ul className='divide-y divide-transparent'>
                          {detail.value.map((performer) => (
                            <li
                              key={performer}
                              className='pr-4 pb-1 flex items-center justify-between'
                            >
                              <div className='w-0 flex-1 flex items-center'>
                                <span className='flex-1 w-0 truncate'>
                                  {performer}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className='mt-10'>
                <Link href='/events'>
                  <a className='text-base font-medium font-hind text-purple-600'>
                    {' '}
                    <span aria-hidden='true'>&larr;</span> Go Back
                  </a>
                </Link>
              </div>
              <div className='mt-6 flex sm:hidden pb-5 justify-start'>
                <div className='mt-3 flex sm:mt-0 sm:ml-4'>
                  <CustomLink
                    type='link-button'
                    url={`/events/edit/${event.id}`}
                    customStyles='px-6 py-3 border border-blue-blue-gray-300 text-base font-medium text-blue-blue-gray-700 bg-white hover:bg-blue-gray-50'
                  >
                    <PencilIcon
                      className='-ml-1 mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    Edit event
                  </CustomLink>
                  <CustomButton
                    type='button'
                    onClick={() => {}}
                    customStyles='px-6 py-3 text-white bg-gradient-to-r from-orange-400 to-pink-600'
                    addStyles='ml-3 inline-flex items-center font-hind'
                  >
                    <TrashIcon
                      className='-ml-1 mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    Delete Event
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events/?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      event: events[0],
    },
  };
}
