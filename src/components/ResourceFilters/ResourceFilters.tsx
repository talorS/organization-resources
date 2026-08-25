import type { ResourceFilters as ResourceFiltersValue } from '../../domain/resource'
import { Button } from '../Button/Button'
import { FieldSelect } from '../FieldSelect/FieldSelect'
import {
    ENVIRONMENT_FILTER_OPTIONS,
    PROVIDER_FILTER_OPTIONS,
    SEVERITY_FILTER_OPTIONS,
} from './ResourceFilters.constants'
import styles from './ResourceFilters.module.css'

type ResourceFiltersProps = {
    filters: ResourceFiltersValue
    hasActiveFilters: boolean
    onChange: (filters: ResourceFiltersValue) => void
    onClear: () => void
}

export function ResourceFilters({
    filters,
    hasActiveFilters,
    onChange,
    onClear,
}: ResourceFiltersProps) {
    return (
        <fieldset className={styles.filters}>
            <legend className={styles.legend}>Filters</legend>
            <FieldSelect
                label="Provider"
                value={filters.provider}
                options={PROVIDER_FILTER_OPTIONS}
                onChange={(provider) => onChange({ provider })}
                placeholder="Provider"
            />
            <FieldSelect
                label="Environment"
                value={filters.environment}
                options={ENVIRONMENT_FILTER_OPTIONS}
                onChange={(environment) => onChange({ environment })}
                placeholder="Environment"
            />
            <FieldSelect
                label="Severity"
                value={filters.severity}
                options={SEVERITY_FILTER_OPTIONS}
                onChange={(severity) => onChange({ severity })}
                placeholder="Severity"
            />
            <Button
                variant="primary"
                size="small"
                disabled={!hasActiveFilters}
                onClick={onClear}>
                Clear Filters
            </Button>
        </fieldset>
    )
}
