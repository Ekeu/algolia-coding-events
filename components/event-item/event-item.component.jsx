import Link from 'next/link';
import Image from 'next/image';
import { ClockIcon } from '@heroicons/react/solid';

export default function Event({ event }) {
  return (
    <div className='space-y-4 cursor-pointer'>
      <div>
        <div className='pb-5/6 relative'>
          <Image
            className='h-full w-full object-cover absolute rounded-lg shadow-md'
            src={
              event.image
                ? event.image.formats.thumbnail.url
                : '/assets/images/codingLab-default-bg-event.png'
            }
            layout='fill'
          />
        </div>
        <Link href={`/events/${event.slug}`}>
          <div className='relative px-4 -mt-16'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <div className='flex items-baseline'>
                <span className='font-hind inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs uppercase tracking-widest font-semibold px-2 py-1 rounded-full'>
                  {new Date(event.date).toLocaleDateString('fr-FR')}
                </span>
                <div className='ml-2 text-blue-gray-600 text-xs uppercase font-semibold tracking-widest font-hind'>
                  {event.venue}
                </div>
              </div>
              <h4 className='mt-2 font-semibold text-blue-gray-700 text-base leading-snug truncate font-hind'>
                {event.name}
              </h4>
              <div className='mt-1 text-poppins inline-flex items-center'>
                <ClockIcon
                  className='-ml-1 mr-2 h-5 w-5 text-blue-gray-800'
                  aria-hidden='true'
                />{' '}
                {event.time}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
