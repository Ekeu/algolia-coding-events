import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import Hero from '../hero/hero.component';

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Bangers&family=Hind:wght@300;400;500;600;700&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap'
          rel='stylesheet'
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css" integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc=" crossOrigin="anonymous"/>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      <ToastContainer
        hideProgressBar
        closeButton={false}
        style={{ width: '25rem', padding: '0px' }}
      />
      {router.pathname === '/' && <Hero />}
      <>{children}</>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'CodingLab | Coding Events and Free Programming Courses',
  description:
    'Find all the latest coding events and have access to free online programming courses',
  keywords:
    'coding, programming, language, progrmming language, events, coding events, courses, tutorials',
};
