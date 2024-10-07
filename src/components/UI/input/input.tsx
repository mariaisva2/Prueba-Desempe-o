import React from 'react';
import styles from './CustomInput.module.scss';

interface CustomInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  className?: string;
  id?: string;
  name?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ value, onChange, placeholder, type = 'text', className, id, name }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.customInput} ${className}`}
      id={id}
      name={name}
    />
  );
};

export default CustomInput;
