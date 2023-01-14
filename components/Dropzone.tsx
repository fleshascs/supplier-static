import React, { FC, useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './Button';
import { DocumentIcon } from '@heroicons/react/outline';

interface DropzoneProps {
  onUpload: (file: Blob) => void;
}

const activeStyle = {
  borderColor: '#838897'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export const Dropzone: FC<DropzoneProps> = ({ onUpload }) => {
  const [loader, setLoader] = useState(false);
  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    const item = acceptedFiles[acceptedFiles.length - 1];
    onUpload(item);
    setLoader(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': []
    },
    onDrop
  });

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      <Button variant='dashed' {...getRootProps({ style })}>
        <DocumentIcon className='h-5 w-5' />
        <span className='hidden md:inline'>{loader ? 'Loading...' : 'Upload xlsx file'} </span>
      </Button>
      <input {...getInputProps()} />
    </>
  );
};
