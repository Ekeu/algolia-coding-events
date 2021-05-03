import { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

import Layout from '@/components/layout/layout.component';
import Notification from '@/components/notification/notification.component';
import EventsDashboard from '@/components/events-dashboard/events-dashboard.component';
import CustomLink from '@/components/custom-link/custom-link.component';
import AuthContext from '@/context/auth.context';
import { parseCookies } from '@/utils/functions';
import { API_URL } from '@/config/index';

export default function DashBoardPage({ events, token }) {
  const { user } = useContext(AuthContext);
  const router = useRouter()

  const handleDeleteEvent = async (id) => {
    if (confirm('Are you sure ? There is no coming back!')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast(
          <Notification error headline='Error!'>
            {data.message}
          </Notification>
        );
      } else {
        toast(
          <Notification success headline='Success'>
            Your event was successfully deleted!
          </Notification>
        );
        router.reload();
      }
    }
  };
  return (
    <Layout title='Dashboard | CodingLab'>
      <div className='bg-white'>
        <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-base font-semibold text-purple-600 font-hind tracking-wide uppercase'>
              Dashboard
            </h2>
            <p className='mt-1 text-4xl font-extrabold font-poppins text-blue-gray-800 sm:text-5xl sm:tracking-tight lg:text-6xl'>
              Hello, {user?.username}!
            </p>
            <p className='max-w-xl mt-5 mx-auto text-xl text-blue-gray-500'>
              Welcome to your dashboard. Here, you can find a list of all your
              events.
            </p>
          </div>
          {events?.length === 0 ? (
            <>
              <div className='relative pt-8 px-4 sm:px-6 lg:px-8'>
                <div className='mt-8 prose prose-indigo prose-lg text-center text-blue-gray-500 mx-auto align-middle justify-center'>
                  <Image
                    className='w-full rounded-lg'
                    src='/assets/images/codingLab-no-events.svg'
                    alt='empty-events'
                    width={655}
                    height={437}
                  />
                </div>
              </div>
              <div className='text-center mt-6'>
                <CustomLink
                  url='/events/add'
                  type='link-button'
                  customStyles='w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-base font-medium font-hind text-white sm:w-auto'
                >
                  Add an event
                </CustomLink>
              </div>
            </>
          ) : (
            <EventsDashboard
              events={events}
              handleDeleteEvent={handleDeleteEvent}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userEvents = await res.json();

  return {
    props: {
      events: userEvents,
      token,
    },
  };
}
