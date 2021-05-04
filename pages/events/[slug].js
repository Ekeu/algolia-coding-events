import Image from 'next/image';
import Link from 'next/link';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import EventMapLocation from '@/components/event-map-location/event-map-location.component';
import Layout from '@/components/layout/layout.component';
import { returnImage } from '@/utils/functions';
import { API_URL } from '@/config/index';

export default function EventPage({ event, source }) {
  const performers = event.performers.split(',').map((p) => p.trim());

  const eventDetail = [
    { label: 'Performers', value: performers },
    { label: 'Venue', value: event.venue },
    { label: 'Date', value: new Date(event.date).toLocaleDateString('fr-FR') },
    { label: 'Address', value: event.address },
    { label: 'Time', value: event.time },
  ];

  const content = hydrate(source);

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
                  src={returnImage(event)}
                  alt={event.name}
                  layout='fill'
                />
              </div>
              <div className='relative pt-64 pb-36 rounded-2xl shadow-xl overflow-hidden'>
                <div className='absolute inset-0 h-full w-full object-cover'>
                  <EventMapLocation event={event} />
                </div>
              </div>
            </div>
          </div>

          <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0'>
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
  const mdxSource = await renderToString(events[0].description);
  return {
    props: {
      event: events[0],
      source: mdxSource,
    },
  };
}
