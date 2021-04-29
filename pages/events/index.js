import Layout from '@/components/layout/layout.component';
import Event from '@/components/event-item/event-item.component';
import { API_URL } from '@/config/index';
export default function EventsPage({ events }) {
  return (
    <Layout>
      <div className='bg-blue-gray-50'>
        <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
          <div className='space-y-12'>
            <div className='text-center'>
              <h2 className='text-base font-hind font-semibold text-purple-600 tracking-wide uppercase'>
                CodingLab
              </h2>
              <p className='mt-1 text-4xl font-poppins font-extrabold text-blue-gray-800 sm:text-5xl sm:tracking-tight lg:text-6xl'>
                Coding Events
              </p>
            </div>
            <ul className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8'>
              {events.map((event) => (
                <Event key={event.id} event={event} />
              ))}
            </ul>
          </div>
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
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await res.json();

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
}
