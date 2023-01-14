import { useState } from 'react';
import Card from '../components/Card';
import { SearchField } from '../components/SearchField';
import { Dropzone } from '../components/Dropzone';
import { Button } from '../components/Button';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [categoryColumnValue, setCategoryColumnValue] = useState('Kategorijos prekių');
  const [file, setFile] = useState(null);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('searchQuery', searchValue);
    formData.append('categoryColumn', categoryColumnValue);

    fetch(process.env.domain + '/api/filter', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.blob())
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      })
      .catch(() => {
        alert('Failed');
      });
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row lg:space-x-4 pt-16'>
        <Card>
          <div className='p-3 flex justify-between items-center'>
            {file ? null : <Dropzone onUpload={(file) => setFile(file)} />}
            {file ? file.name : null}
          </div>
        </Card>
      </div>
      {file ? (
        <div className='justify-center flex  pt-5'>
          <div className='flex flex-col w-full'>
            <Card>
              <label className='form-label inline-block mb-1 text-gray-700 pt-2 text-md font-medium'>
                Categories column name
              </label>

              <div className='flex flex-row items-center lg:space-x-4'>
                <input
                  name='categoryColumn'
                  type='text'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding text-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  onChange={(e) => setCategoryColumnValue(e.target.value)}
                  value={categoryColumnValue}
                />
              </div>
            </Card>
          </div>
        </div>
      ) : null}
      {file ? (
        <div className='justify-center flex  pt-5'>
          <SearchField
            placeholder='Categories to filter'
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
      ) : null}
      {file ? (
        <div className='flex justify-end   pt-5'>
          <Button variant='primary' onClick={onSubmit}>
            <span className='hidden md:inline'>Filter and download</span>
          </Button>
        </div>
      ) : null}
    </>
  );
}
