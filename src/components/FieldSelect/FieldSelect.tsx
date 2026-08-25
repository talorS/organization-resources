import styles from "./FieldSelect.module.css";

export type FilterOption<T extends string> = { label: string; value: T };

type FilterSelectProps<T extends string> = {
  label: string;
  value?: T;
  options: readonly FilterOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
};

export function FieldSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  placeholder,
}: FilterSelectProps<T>) {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <select
        name={label}
        className={styles.select}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value as T)}
        aria-label={label}
      >
        <option value="" disabled hidden>
          {placeholder ?? label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}