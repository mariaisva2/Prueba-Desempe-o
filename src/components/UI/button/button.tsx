import React from 'react';
import styles from './CustomButton.module.scss';

interface CustomButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children, type = 'button', className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button type={type} className={`${styles.customButton} ${className}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default CustomButton;
