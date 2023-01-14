import React, { FC, ReactNode } from 'react';

export const ListGroup: FC<{ children: ReactNode }> = (props) => {
  return (
    <ul
      style={{ boxShadow: 'rgb(0 0 0 / 8%) 0px 1px 4px 0px', borderColor: '#cbd2d6' }}
      className='bg-white rounded-lg border border-gray-200 text-gray-900 rounded-md mb-4'
    >
      {props.children}
    </ul>
  );
};
export const ListGroupItem: FC<{ children: ReactNode }> = (props) => {
  return (
    <li className='px-6 py-4 border-b border-gray-200 w-full flex items-center space-x-4'>
      {props.children}
    </li>
  );
};
