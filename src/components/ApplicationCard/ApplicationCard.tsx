import clsx from "clsx";
import type { Application } from "../../domain/application";
import { Button } from "../Button/Button";
import styles from "./ApplicationCard.module.css";

type ApplicationCardProps = {
  application: Application;
  isSelected: boolean;
  onVisualize: () => void;
};

export function ApplicationCard({
  application,
  isSelected,
  onVisualize,
}: ApplicationCardProps) {
  const resourceCount = application.resourceIds.length;

  return (
    <article
      className={clsx(styles.card, { [styles.cardSelected]: isSelected })}
    >
      <h2 className={styles.cardTitle}>{application.name}</h2>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Description:</span>
        <span className={styles.fieldValue}>
          {application.description || "No description"}
        </span>
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Resources count:</span>
        <span className={styles.fieldValue}>
          {resourceCount} resource{resourceCount === 1 ? "" : "s"}
        </span>
      </div>

      <div className={styles.cardAction}>
        <Button variant="primary" size="small" onClick={onVisualize}>
          Visualize
        </Button>
      </div>
    </article>
  );
}