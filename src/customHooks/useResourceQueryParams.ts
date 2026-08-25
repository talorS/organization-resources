import { useSearchParams } from 'react-router-dom';
import type {
  Environment,
  Provider,
  ResourceFilters,
  Severity,
} from '../domain/resource';
import { resourceFilterKeys } from '../domain/resource';

function getQueryParam<T extends string>(
  searchParams: URLSearchParams,
  key: string,
): T | undefined {
  return searchParams.get(key) as T | undefined
}

export function useResourceQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: ResourceFilters = {
    search: searchParams.get('search') ?? '',
    provider: getQueryParam<Provider>(searchParams, 'provider'),
    environment: getQueryParam<Environment>(searchParams, 'environment'),
    severity: getQueryParam<Severity>(searchParams, 'severity'),
  }

  function updateFilters(updates: ResourceFilters) {
    const updatedSearchParams = new URLSearchParams(searchParams);

    updates.search && (updatedSearchParams.set('search', updates.search));
    resourceFilterKeys.forEach((key) => {
    const value = updates[key];
     value && (updatedSearchParams.set(key, value));
  })

    setSearchParams(updatedSearchParams);
  }

  return { filters, updateFilters };
}