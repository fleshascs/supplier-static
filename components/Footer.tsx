import Container from './Container';

const Footer = () => {
  return (
    <footer className='bg-gray-800 border-t border-gray-700 text-gray-400'>
      <Container>
        <div className='py-6 flex flex-col lg:flex-row items-center'>
          <div
            className='flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2'
            itemScope
            itemType='http://schema.org/Organization'
          >
            Cruising since <span className='font-semibold text-red-700 px-2'>2014</span> © All
            rights Reversed.{' '}
            <a className='font-semibold text-red-700 ml-2' itemProp='url' href={process.env.domain}>
              <span itemProp='name'>{process.env.siteName}</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
