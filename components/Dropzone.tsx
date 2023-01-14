import React, { FC, useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Button } from './Button';
import { DocumentIcon } from '@heroicons/react/outline';
import { first, fromEvent, map, tap } from 'rxjs';

interface DropzoneProps {
  onUpload: (file: File) => void;
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

// function loadFile(item: Blob) {
//   const fileReader = new FileReader();
//   const fileReader$ = fromEvent(fileReader, 'load').pipe(
//     map(() => fileReader.result),
//     first()
//   );
//   fileReader.readAsDataURL(item);
//   return fileReader$;
// }

export const Dropzone: FC<DropzoneProps> = ({ onUpload }) => {
  const [loader, setLoader] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const item = acceptedFiles[acceptedFiles.length - 1];
    if (item instanceof Blob) {
      // setLoader(true);
      console.log('item', item);

      onUpload(item);
      setLoader(false);
      // loadFile(item)
      //   // .pipe(tap((a) => console.log('a', a)))
      //   .subscribe((fileString) => {
      //     // console.log('fileString', fileString);
      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     // @ts-ignore
      //     onUpload(fileString);
      //     setLoader(false);
      //   });
    } else {
      toast.error('Unsupported format.');
    }
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
