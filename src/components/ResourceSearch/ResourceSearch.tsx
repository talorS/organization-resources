import { Field } from "../Field/Field";
import styles from "./ResourceSearch.module.css";

type ResourceSearchProps = {
  onDebounceSearch: (value: string) => void;
};

export function ResourceSearch({ onDebounceSearch }: ResourceSearchProps) {

  return (
    <Field label="Search">
      <input
        id='resource-search'
        type="search"
        className={styles.input}
        // value={searchInput}
        // onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search by name"
      />
    </Field>
  );
}