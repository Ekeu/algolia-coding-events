import moment from 'moment';
import Link from 'next/link';

export default function EventsDashboard({ events, handleDeleteEvent }) {
  const tableHead = ['Title', 'Venue', 'Date'];
  return (
    <div className='flex flex-col py-20 font-hind'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-blue-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-blue-gray-50'>
                <tr>
                  {tableHead.map((th) => (
                    <th
                      scope='col'
                      key={th}
                      className='px-6 py-3 text-left text-xs font-medium text-blue-gray-500 uppercase tracking-wider'
                    >
                      {th}
                    </th>
                  ))}
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, eventIdx) => (
                  <tr
                    key={event.id}
                    className={eventIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className='px-6 py-4 whitespace-nowrap cursor-pointer text-sm font-medium text-blue-gray-800'>
                      <Link href={`/events/${event.slug}`}>{event.name}</Link>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-gray-500'>
                      {event.venue}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-gray-500'>
                      {moment(event.date).format('yyyy-MM-DD')}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <a
                        className='text-pink-600 hover:text-pink-900 cursor-pointer'
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </a>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <Link href={`/events/edit/${event.id}`}>
                        <a className='text-purple-600 hover:text-purple-900'>
                          Edit
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
