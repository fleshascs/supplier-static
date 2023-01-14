import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'dashed';
  onClick?: () => void;
  rounded?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, children, rounded = true, ...rest }, ref) => {
    let classes = 'space-x-3 px-4 py-2 flex items-center border ';
    switch (variant) {
      case 'primary':
        classes +=
          'text-white bg-blue-600 active:bg-blue-800 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0';
        break;
      case 'dashed':
        classes += 'text-indigo-500 border-indigo-500 hover:bg-gray-100 border-dashed';
        break;
      default:
        classes +=
          'text-gray-600 transition-colors duration-200 transform bg-white hover:bg-gray-100 focus:outline-none';
        break;
    }
    return (
      <button ref={ref} className={clsx(classes, { 'rounded-lg ': rounded })} {...rest}>
        {children}
      </button>
    );
  }
);
