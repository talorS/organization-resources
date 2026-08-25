import { Button } from "../Button/Button";
import styles from "./Selection.module.css";

type SelectionProps = {
  count: number;
  onClear: () => void;
  onCreate: () => void;
};

export function Selection({ count, onClear, onCreate }: SelectionProps) {
  return (
    <div className={styles.bar}>
      <span className={styles.count}>
        {count} resource{count === 1 ? '' : 's'} selected
      </span>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onClear}>
          Clear
        </Button>
        <Button variant="primary" onClick={onCreate}>
          Create Application
        </Button>
      </div>
    </div>
  );
}