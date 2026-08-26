import type { ReactNode } from "react";
import styles from "./Field.module.css";

type FieldProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
};

export function Field({ label, required = false, children }: FieldProps) {
  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true">*</span>}
      </legend>
      {children}
    </fieldset>
  );
}
