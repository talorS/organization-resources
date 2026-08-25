//import { Button } from "../../../components/ui";
import {
  ENVIRONMENT_FILTER_OPTIONS,
  PROVIDER_FILTER_OPTIONS,
  SEVERITY_FILTER_OPTIONS,
} from "./ResourceFilters.constants";
import { FieldSelect } from "../FieldSelect/FieldSelect";
import styles from "./ResourceFilters.module.css";

export function ResourceFilters() {
  //   const { filters, setFilter, clearFilters, hasActiveFilters } =
  //     useFilterParams();

  return (
    <fieldset className={styles.filters}>
      <legend className={styles.legend}>Filters</legend>
      <FieldSelect
        label="Provider"
        //value={filters.provider}
        options={PROVIDER_FILTER_OPTIONS}
        onChange={() => {}}
        placeholder="Provider"
      />
      <FieldSelect
        label="Environment"
        //value={filters.environment}
        options={ENVIRONMENT_FILTER_OPTIONS}
        onChange={() => {}}
        placeholder="Environment"
      />
      <FieldSelect
        label="Severity"
        //value={filters.criticality}
        options={SEVERITY_FILTER_OPTIONS}
        onChange={() => {}}
        placeholder="Severity"
      />
      {/* {hasActiveFilters && (
        <Button variant="secondary" onClick={clearFilters}>
          Clear filters
        </Button>
      )} */}
    </fieldset>
  );
}
