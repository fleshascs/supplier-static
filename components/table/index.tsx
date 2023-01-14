import clsx from 'clsx';
import { FC, ReactNode } from 'react';

export const Table: FC<{ className?: string; children: ReactNode }> = ({ children, className }) => {
  return (
    <table
      style={{
        boxShadow: 'rgb(0 0 0 / 8%) 0px 1px 4px 0px',
        borderColor: '#cbd2d6'
      }}
      className={clsx(
        className,
        'border-collapse table-auto w-full text-md border rounded-md mb-4 bg-white'
      )}
    >
      {children}
    </table>
  );
};

export const Th: FC<{ className?: string; children: ReactNode }> = ({ children, className }) => {
  return (
    <th
      className={clsx(
        className,
        // 'border-b border-gray-600 font-medium p-0 sm:p-3 pt-0 pb-3 text-gray-200 text-left'
        'border-b  text-xs p-2 sm:p-3 pt-2 pb-3  text-left uppercase'
      )}
    >
      {children}
    </th>
  );
};

export const Td: FC<{ className?: string; children: ReactNode }> = ({ children, className }) => {
  return <td className={clsx('border-b text-xs  p-3', className)}>{children}</td>;
};
