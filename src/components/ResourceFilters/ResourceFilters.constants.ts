import type { Environment, Provider, Severity } from "../../domain/resource";

export type FilterOption<T extends string = string> = {
  label: string;
  value: T;
};

export const PROVIDER_FILTER_OPTIONS = [
  { label: "AWS", value: "AWS" },
  { label: "GCP", value: "GCP" },
  { label: "Azure", value: "Azure" },
] as const satisfies ReadonlyArray<FilterOption<Provider>>;

export const ENVIRONMENT_FILTER_OPTIONS = [
  { label: "Production", value: "production" },
  { label: "Staging", value: "staging" },
  { label: "Development", value: "development" },
] as const satisfies ReadonlyArray<FilterOption<Environment>>;

export const SEVERITY_FILTER_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
] as const satisfies ReadonlyArray<FilterOption<Severity>>;