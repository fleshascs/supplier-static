import { FC, ReactNode, useId } from 'react';
import { Field, FieldAttributes, FieldConfig } from 'formik';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TextFieldProps = FieldAttributes<any> &
  Pick<FieldConfig, 'validate'> & {
    helperText: string | ReactNode;
  };

export const TextField: FC<TextFieldProps> = ({ helperText, ...rest }) => {
  const id = useId();
  return (
    <div className='mb-3 w-full sm:w-96 '>
      <label
        htmlFor={id}
        className='form-label inline-block mb-1 text-gray-700 pt-2 text-md font-medium'
      >
        Enter Server IP:PORT
      </label>
      <Field
        type='text'
        aria-describedby={id + '-desc'}
        id={id}
        className='
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      '
        {...rest}
      />
      <div id={id + '-desc'} className={'text-red-500 text-sm'}>
        {helperText}
      </div>
    </div>
  );
};
