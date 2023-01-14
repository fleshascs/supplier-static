import { useRef, useState } from 'react';
import Card from '../components/Card';
import { SearchField, SearchValue } from '../components/SearchField';
import { Dropzone } from '../components/Dropzone';
import { Button } from '../components/Button';
import { getCategories, getSheetData, loadWorkbook, processSheet } from '../lib/processSheet';
import Fuse from 'fuse.js';
import { Select } from '../components/Select';

export default function Home() {
  const [searchValues, setSearchValues] = useState<SearchValue[]>([]);
  const [categories, setCategories] = useState(null);
  const file = useRef(null);
  const workbook = useRef(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [columns, setColumns] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');

  const onFileUpload = async (blob: Blob) => {
    setFileUploaded(false);
    file.current = blob;
    const wb = await loadWorkbook(blob);
    workbook.current = wb;
    const sheetName = wb.SheetNames[wb.SheetNames.length - 1];
    const rows = getSheetData(wb.Sheets[sheetName]);
    const columns = Object.keys(rows[0]);
    const column = columns[0];
    const categoriesSet = getCategories(rows, column);
    const fuse = new Fuse(Array.from(categoriesSet));

    setSheets(wb.SheetNames);
    setSelectedSheet(sheetName);
    setCategories(fuse);
    setSelectedColumn(column);
    setColumns(columns);
    setFileUploaded(true);
  };

  const onColumnChange = (column: string) => {
    const wb = workbook.current;
    const rows = getSheetData(wb.Sheets[selectedSheet]);
    const categoriesSet = getCategories(rows, column);
    const fuse = new Fuse(Array.from(categoriesSet));
    setCategories(fuse);
    setSelectedColumn(column);
  };

  const onSheetChange = (sheetName: string) => {
    const wb = workbook.current;
    const rows = getSheetData(wb.Sheets[sheetName]);
    let fuse = new Fuse([]);
    let column = '';
    let columns: string[] = [];
    if (rows.length) {
      columns = Object.keys(rows[0]);
      column = columns[0];
      const categoriesSet = getCategories(rows, column);
      fuse = new Fuse(Array.from(categoriesSet));
    }
    setSelectedSheet(sheetName);
    setColumns(columns);
    setCategories(fuse);
    setSelectedColumn(column);
  };

  const onSubmit = () => {
    if (!selectedColumn) {
      alert('Category column is required.');
      return;
    }

    const searchQueries = searchValues
      .map((q) => ({ ...q, value: q.value.trim() }))
      .filter((q) => !!q.value.length);

    if (!searchQueries.length) {
      alert('Category filter can not be empty.');
      return;
    }

    processSheet(workbook.current.Sheets[selectedSheet], searchQueries).catch((e) => {
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
        <div className='flex flex-col lg:flex-row lg:space-x-4 pt-5 items-stretch'>
          <div className='basis-1/3'>
            <div className='justify-center flex'>
              <div className='flex flex-col w-full'>
                <Card>
                  <label className='form-label inline-block mb-1 text-gray-700 pt-2 text-md font-medium'>
                    Sheet name
                  </label>
                  <div className='flex flex-row items-center lg:space-x-4'>
                    <Select items={sheets} selected={selectedSheet} setSelected={onSheetChange} />
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className='basis-2/3'>
            <div className='justify-center flex'>
              <div className='flex flex-col w-full'>
                <Card>
                  <label className='form-label inline-block mb-1 text-gray-700 pt-2 text-md font-medium'>
                    Column name
                  </label>
                  <div className='flex flex-row items-center lg:space-x-4'>
                    {columns.length ? (
                      <Select
                        items={columns}
                        selected={selectedColumn}
                        setSelected={onColumnChange}
                      />
                    ) : (
                      'This sheet has no columns.'
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {fileUploaded ? (
        <div className='justify-center flex  pt-5'>
          <SearchField
            fuse={categories}
            placeholder='Categories to filter'
            searchValues={searchValues}
            setSearchValues={setSearchValues}
            selectedColumn={selectedColumn}
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
