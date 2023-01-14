import { FC, ReactNode } from 'react';

export const GreenButton: FC<{ children: ReactNode }> = (props) => {
  return (
    <button
      type='button'
      className='inline-block px-7 py-5 bg-green-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-green-900 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'
      {...props}
    >
      {props.children}
    </button>
  );
};
