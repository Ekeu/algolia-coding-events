import Link from 'next/link';
import { EVENTS_PER_PAGE } from '@/config/index';

export default function EventPagination({ page, totalEventsCount }) {
  const calculateLastPage = Math.ceil(totalEventsCount / EVENTS_PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='relative inline-flex items-center px-4 py-2 border border-blue-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
            Previous
          </a>
        </Link>
      )}
      {page < calculateLastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='ml-3 relative inline-flex items-center px-4 py-2 border border-blue-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
            Next
          </a>
        </Link>
      )}
    </>
  );
}
