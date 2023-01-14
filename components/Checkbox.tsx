import clsx from 'clsx';
import { Field } from 'formik';
import { FC, HTMLProps, ReactNode, useId } from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
  label: ReactNode | string;
  helperText?: string;
}
export const Checkbox: FC<CheckboxProps> = ({ label, helperText, ...rest }) => {
  const id = useId();
  return (
    <div className='mb-4'>
      <Field
        className={clsx(
          'form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer',
          styles.checkbox
        )}
        type='checkbox'
        aria-describedby={id + '-desc'}
        id={id}
        {...rest}
      />
      <label className='form-check-label inline-block text-gray-800' htmlFor={id}>
        {label}
      </label>
      <div id={id + '-desc'} className='text-red-500 text-sm'>
        {helperText}
      </div>
    </div>
  );
};
