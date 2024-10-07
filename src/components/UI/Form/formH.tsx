import React, { ReactNode } from "react";
import styles from "./CustomForm.module.scss";

interface CustomFormProps {
  children: ReactNode;
  className?: string;
  title?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({ children, className, title, onSubmit }) => {
  return (
    <form className={`${styles.customForm} ${className}`} onSubmit={onSubmit}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </form>
  );
};

export default CustomForm;
