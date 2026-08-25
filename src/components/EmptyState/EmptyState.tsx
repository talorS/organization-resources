import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./EmptyState.module.css";

type EmptyStateProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export function EmptyState({
  children,
  className = '',
  ...props
}: EmptyStateProps) {
  return (
    <div className={clsx(styles.emptyState, className)} {...props}>
      {children}
    </div>
  );
}