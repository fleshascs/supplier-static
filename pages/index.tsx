import { useRef, useState } from 'react';
import Card from '../components/Card';
import { SearchField } from '../components/SearchField';
import { Dropzone } from '../components/Dropzone';
import { Button } from '../components/Button';
import { getCategories, getSheetData, loadWorkbook, processSheet } from '../lib/processSheet';
import Fuse from 'fuse.js';
import { ExcelColumnSelect } from '../components/ExcelColumnSelect';

export default function Home() {
  const [searchValues, setSearchValues] = useState([]);
  const [categories, setCategories] = useState(null);
  const file = useRef(null);
  const workbook = useRef(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');

  const onFileUpload = async (blob: Blob) => {
    setFileUploaded(false);
    file.current = blob;
    const wb = await loadWorkbook(blob);
    workbook.current = wb;
    const rows = getSheetData(wb);
    const columns = Object.keys(rows[0]);
    const column = columns[columns.length >= 4 ? 3 : 0];
    const categoriesSet = getCategories(rows, column);
    const fuse = new Fuse(Array.from(categoriesSet));
    setCategories(fuse);
    setSelectedColumn(column);
    setColumns(columns);
    setFileUploaded(true);
  };

  const onColumnChange = (column) => {
    const rows = getSheetData(workbook.current);
    const categoriesSet = getCategories(rows, column);
    const fuse = new Fuse(Array.from(categoriesSet));
    setCategories(fuse);
    setSelectedColumn(column);
  };

  const onSubmit = () => {
    if (!selectedColumn) {
      alert('Category column is required.');
      return;
    }

    const searchQueries = searchValues.map((q) => q.trim()).filter((q) => !!q.length);

    if (!searchQueries.length) {
      alert('Category filter can not be empty.');
      return;
    }

    processSheet(workbook.current, searchQueries, selectedColumn).catch((e) => {
      alert('Failed.');
    });
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row lg:space-x-4 pt-16'>
        <Card>
          <div className='p-3 flex justify-between items-center'>
            {fileUploaded ? null : <Dropzone onUpload={onFileUpload} />}

            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              fileUploaded ? file.current.name : null
            }
          </div>
        </Card>
      </div>
      {fileUploaded ? (
        <div className='justify-center flex  pt-5'>
          <div className='flex flex-col w-full'>
            <Card>
              <label className='form-label inline-block mb-1 text-gray-700 pt-2 text-md font-medium'>
                Categories column name
              </label>

              <div className='flex flex-row items-center lg:space-x-4'>
                <ExcelColumnSelect
                  items={columns}
                  selected={selectedColumn}
                  setSelected={onColumnChange}
                />
              </div>
            </Card>
          </div>
        </div>
      ) : null}
      {fileUploaded ? (
        <div className='justify-center flex  pt-5'>
          <SearchField
            fuse={categories}
            placeholder='Categories to filter'
            searchValues={searchValues}
            setSearchValues={(values) => setSearchValues(values)}
          />
        </div>
      ) : null}
      {fileUploaded ? (
        <div className='flex justify-end pt-5'>
          <Button variant='primary' onClick={onSubmit}>
            Filter and download
          </Button>
        </div>
      ) : null}
    </>
  );
}
