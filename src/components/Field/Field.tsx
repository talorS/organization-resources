import type { ReactNode } from "react";
import styles from "./Field.module.css";

type FieldProps = {
  label: string;
  children: ReactNode;
};

export function Field({ label, children }: FieldProps) {
  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>
        {label}
      </legend>
      {children}
    </fieldset>
  );
}