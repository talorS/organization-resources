import type { Application } from "../../domain/application";
import { ApplicationCard } from "../ApplicationCard/ApplicationCard";
import styles from "./ApplicationList.module.css";

type ApplicationListProps = {
  applications: readonly Application[];
  selectedApplicationId: string | null;
  onSelectApplication: (id: string) => void;
};

export function ApplicationList({
  applications,
  selectedApplicationId,
  onSelectApplication,
}: ApplicationListProps) {
  return (
    <div className={styles.cardList}>
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          isSelected={selectedApplicationId === application.id}
          onVisualize={() => onSelectApplication(application.id)}
        />
      ))}
    </div>
  );
}