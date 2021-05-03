import Layout from '@/components/layout/layout.component';
import Event from '@/components/event-item/event-item.component';
import CustomLink from '@/components/custom-link/custom-link.component';
import { API_URL } from '@/config/index';
import Image from 'next/image';
export default function Home({ events }) {
  return (
    <Layout>
      <div className={`bg-blue-gray-50`}>
        <div className='mx-auto pb-12 pt-6 px-4 max-w-7xl sm:px-6 lg:pb-24'>
          <div className='space-y-12'>
            <div className='space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none'>
              <h2 className='text-4xl font-hind font-bold tracking-tight sm:text-4xl text-blue-gray-800'>
                {events.length > 0 ? 'Upcoming Events' : 'No upcoming event'}
              </h2>
            </div>
            {(!events || events.length === 0) && (
              <div className='relative pt-8 px-4 sm:px-6 lg:px-8'>
                <div className='mt-8 prose prose-indigo prose-lg text-center text-blue-gray-500 mx-auto align-middle justify-center'>
                  <Image
                    className='w-full rounded-lg'
                    src='/assets/images/codingLab-search.svg'
                    alt='empty-events'
                    width={655}
                    height={437}
                  />
                </div>
              </div>
            )}
            {events?.length > 0 && (
              <ul className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8'>
                {events.map((event) => (
                  <Event key={event.id} event={event} />
                ))}
              </ul>
            )}
          </div>
          {events?.length > 0 && (
            <div className='text-center mt-6'>
              <CustomLink
                url='/events'
                type='link-button'
                customStyles='w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-base font-medium font-hind text-white sm:w-auto'
              >
                All Events
              </CustomLink>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
/**
 * getStaticProps = (Fetches datat at **build time**) ==> {
 * When building for ptoduction, it will make the request, then
 * it will get the data and it will generate it staticly. We can actually
 * use this method for a static website
 * }
 *
 * getStaticPaths = (Used to create dynamic routes) ==> {
 * For instance we are going to have events/slug. So if we use this method,
 * we could a request to whatever path it is .i.e api-route or strapi and it will
 * look every slug and will generate those path or routes for us so that we could have
 * a static website and have those paths automatically created at build time
 * }
 *
 * getServerSideProps = (fetch data on each request)
 */
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: {
      events: events,
    },
    revalidate: 1,
  };
}
