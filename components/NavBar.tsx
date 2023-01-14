import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import clsx from 'clsx';
// import Image from './Image';

const navigation = [{ name: 'Home', href: '/' }];

export default function NavBar() {
  const router = useRouter();
  return (
    <Disclosure as='nav' className='bg-white shadow-md'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start '>
                <div className='flex-shrink-0 flex items-center '>
                  <a href='/' className='flex items-center'>
                    <img
                      src='https://flowbite.com/docs/images/logo.svg'
                      className='mr-3 h-6 sm:h-9'
                      alt='Flowbite Logo'
                    />
                    <span
                      className='hidden lg:block self-center text-xl font-semibold whitespace-nowrap dark:text-white'
                      style={{ fontSize: '1.4em' }}
                    >
                      {process.env.siteName}
                    </span>
                  </a>
                </div>
                <div className='hidden sm:ml-6 font-medium sm:flex items-center'>
                  <div
                    className='flex space-x-4 items-center'
                    itemScope
                    itemType='https://schema.org/SiteNavigationElement'
                  >
                    {navigation.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <a
                          itemProp='url'
                          className={clsx(
                            item.href === router.pathname ? 'text-blue-700' : 'text-gray-700',
                            'block  hover:text-blue-700'
                          )}
                          aria-current={item.href === router.pathname ? 'page' : undefined}
                        >
                          <span itemProp='name'>{item.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.href}
                  as='a'
                  href={process.env.basePath + item.href}
                  className={clsx(
                    process.env.basePath + item.href === router.pathname
                      ? 'text-blue-700'
                      : 'text-gray-700',
                    'block px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.href === router.pathname ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
