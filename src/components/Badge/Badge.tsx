import type { ReactNode } from "react";
import { clsx } from 'clsx';
import styles from "./Badge.module.css";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return <span className={clsx(styles.badge, className)}>{children}</span>;
}