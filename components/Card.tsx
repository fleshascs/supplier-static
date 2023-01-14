import { FC, ReactNode } from 'react';
import clsx from 'clsx';

const Card: FC<{ children: ReactNode; className?: string; innerPadding?: boolean }> = ({
  children,
  className,
  innerPadding = true
}) => {
  return (
    <div
      className={clsx(
        className,
        { 'p-2 sm:p-6': innerPadding },
        'w-full text-md mb-4 rounded-lg bg-white shadow-md'
      )}
    >
      {children}
    </div>
  );
};
export default Card;
