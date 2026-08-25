import { Field } from '../Field/Field'
import styles from './ResourceSearch.module.css'

type ResourceSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function ResourceSearch({ value, onChange }: ResourceSearchProps) {
  return (
    <Field label="Search">
      <input
        id="resource-search"
        aria-label="Search"
        type="search"
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name"
      />
    </Field>
  )
}
