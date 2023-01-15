import { FC, useState } from 'react';
import { TextFieldProps } from './TextField';
import useDebounce from 'react-use/lib/useDebounce';
import { Spinner } from './Spinner';
import { useQuery } from 'react-query';
import { SearchIcon } from '@heroicons/react/outline';
import Card from './Card';
import clsx from 'clsx';

export type SearchValue = {
  value: string;
  column: string;
};

type SearchFieldProps = Omit<TextFieldProps, 'value'> & {
  searchValues: SearchValue[];
  setSearchValues: (val: SearchValue[]) => void;
  fuse: any;
  selectedColumn: string;
};

export const SearchField: FC<SearchFieldProps> = ({
  searchValues,
  setSearchValues,
  selectedColumn,
  fuse,
  ...rest
}) => {
  const [rawSearchValue, setRawSearchValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const { isLoading, error, data } = useQuery<any, Error>(
    'query' + searchValue,
    () => {
      return fuse.search(searchValue);
    },
    { enabled: !!searchValue }
  );

  const onValueChange = (e) => {
    const value = e.target.value;
    setRawSearchValue(value);
  };
  const removeSearchValue = (i: number) => {
    setSearchValues(searchValues.filter((_, index) => index !== i));
  };

  useDebounce(() => setSearchValue(rawSearchValue), 500, [rawSearchValue]);

  return (
    <div className='flex flex-col w-full'>
      <Card>
        {searchValues.length ? (
          <div className='flex flex-row flex-wrap items-center lg:space-x-4 text-xs mb-3 '>
            {searchValues.map((s, index) => (
              <div
                key={s.value}
                className='p-3 my-1 bg-gray-100 cursor-pointer'
                onClick={() => removeSearchValue(index)}
              >
                {s.value}
              </div>
            ))}
          </div>
        ) : null}
        <div className='flex flex-row items-center lg:space-x-4'>
          <input
            type='text'
            className={clsx(
              'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding text-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ',
              {
                'border-b': !isLoading && !error && !!data
              }
            )}
            onChange={onValueChange}
            value={rawSearchValue}
            {...rest}
          />
          <SearchIcon className='h-7 w-7 inline' />
          {isLoading ? <Spinner /> : null}
        </div>

        {!isLoading && !error && data ? (
          <div className='mt-10 font-bold max-h-60 overflow-y-auto'>
            {data.map((d) => (
              <div
                key={d.item}
                className='cursor-pointer'
                onClick={() => {
                  setSearchValues([
                    ...searchValues,
                    {
                      value: d.item,
                      column: selectedColumn
                    }
                  ]);
                  // setRawSearchValue('');
                }}
              >
                {d.item}
              </div>
            ))}
          </div>
        ) : null}
      </Card>
    </div>
  );
};
