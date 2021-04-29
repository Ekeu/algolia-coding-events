import Image from 'next/image';
export default function Hero() {
  return (
    <div className='relative py-8'>
      <div className='absolute inset-x-0 bottom-0 h-1/2 bg-white' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <div className='relative shadow-xl sm:rounded-2xl sm:overflow-hidden'>
          <div className='absolute inset-0'>
            <Image
              className='h-full w-full object-cover'
              src='/assets/images/codingLab-female-programmer.jpg'
              alt='Female programmer on wheels'
              layout='fill'
            />
            <div
              className='absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600'
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
          <div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8'>
            <h1 className='text-center text-5xl font-extrabold font-poppins tracking-tight sm:text-6xl lg:text-7xl'>
              <span className='block text-white'>Welcome to</span>
              <span className='block text-purple-300'>CodingLab</span>
            </h1>
            <p className='mt-6 max-w-lg mx-auto text-center text-2xl text-white sm:max-w-3xl'>
              Discover the best coding events!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
