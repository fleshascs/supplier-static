import { FC, HTMLProps, ReactNode, useId } from 'react';
import { Field } from 'formik';
import styles from './radionbutton.module.css';
import clsx from 'clsx';

interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
  label: ReactNode | string;
}
export const RadioButton: FC<CheckboxProps> = ({ label, ...rest }) => {
  const id = useId();
  return (
    <div className='w-full flex items-center'>
      <Field
        className={clsx(
          'form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer',
          styles.radiobutton
        )}
        type='radio'
        id={id}
        {...rest}
      />
      <label
        className='inline-block text-gray-800 flex items-center justify-between flex-1'
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
