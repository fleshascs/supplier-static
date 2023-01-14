import { FC, HTMLProps } from 'react';

type PrimaryButtonProps = HTMLProps<HTMLButtonElement> & {
  type: 'button' | 'submit' | 'reset';
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({ type = 'button', children, ...rest }) => {
  //px-7 py-3
  //px-6 py-2.5
  return (
    <button
      className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
