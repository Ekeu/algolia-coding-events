import Head from 'next/head';
export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Bangers&family=Hind:wght@300;400;500;600;700&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap'
          rel='stylesheet'
        />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
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
