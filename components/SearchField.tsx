import { FC, useState } from 'react';
import { TextField, TextFieldProps } from './TextField';
import useDebounce from 'react-use/lib/useDebounce';
import { Spinner } from './Spinner';
import { QueryFunctionContext, QueryKey, useQuery } from 'react-query';
import { SearchIcon } from '@heroicons/react/outline';
import Card from './Card';

export const queryFn =
  (q: string) =>
  <T = unknown, TQueryKey extends QueryKey = QueryKey>({
    signal
  }: QueryFunctionContext<TQueryKey>): T | Promise<T> => {
    return fetch(process.env.basePath + '/stocks.json?q=' + q, {
      signal
    }).then((res) => res.json());
  };

type SearchFieldProps = Omit<TextFieldProps, 'value'> & { value: string };

export const SearchField: FC<SearchFieldProps> = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const { isLoading, error, data } = useQuery<any, Error>(
    'stocks-query' + searchValue,
    (...args) => queryFn(searchValue)(...args),
    { enabled: !!searchValue }
  );

  useDebounce(() => setSearchValue(props.value), 500, [props.value]);

  return (
    <div className='flex flex-col w-full'>
      <Card>
        <div className='flex flex-row items-center lg:space-x-4'>
          <input
            type='text'
            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding text-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            {...props}
          />
          <SearchIcon className='h-7 w-7 inline' />
          {isLoading ? <Spinner /> : null}
        </div>
      </Card>
      {/* <div>{!isLoading && !error ? JSON.stringify(data) : null}</div> */}
    </div>
  );
};
