import React from 'react';
import styles from './CustomLabel.module.scss';

interface CustomLabelProps {
  text: string;
  htmlFor?: string;
  className?: string;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ text, htmlFor, className }) => {
  return (
    <label htmlFor={htmlFor} className={`${styles.customLabel} ${className}`}>
      {text}
    </label>
  );
};

export default CustomLabel;
