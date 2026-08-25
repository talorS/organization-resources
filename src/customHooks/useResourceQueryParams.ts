import { useSearchParams } from 'react-router-dom'
import {
  resourceFilterKeys,
  type Environment,
  type Provider,
  type ResourceFilters,
  type Severity,
} from '../domain/resource'

function getQueryParam<T extends string>(
  searchParams: URLSearchParams,
  key: string,
): T | undefined {
  return (searchParams.get(key) ?? undefined) as T | undefined
}

export function useResourceQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = getQueryParam(searchParams, 'search') ?? '';

  const filters: ResourceFilters = {
    provider: getQueryParam<Provider>(searchParams, 'provider'),
    environment: getQueryParam<Environment>(searchParams, 'environment'),
    severity: getQueryParam<Severity>(searchParams, 'severity'),
  };

  function updateSearch(nextSearch: string) {
    const updatedSearchParams = new URLSearchParams(searchParams);

    if (nextSearch === '') {
      updatedSearchParams.delete('search');
    } else {
      updatedSearchParams.set('search', nextSearch);
    }

    setSearchParams(updatedSearchParams);
  }

  function updateFilters(updates: ResourceFilters) {
    const updatedSearchParams = new URLSearchParams(searchParams);

    resourceFilterKeys.forEach((key) => {
      const value = updates[key];

      if (value !== undefined) {
        updatedSearchParams.set(key, value);
      }
    })

    setSearchParams(updatedSearchParams);
  }

  return { search, filters, updateSearch, updateFilters };
}
