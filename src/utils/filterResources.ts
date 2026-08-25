import { resourceFilterKeys, type Resource, type ResourceFilters } from '../domain/resource'

export function filterResources(
  resources: readonly Resource[],
  filters: ResourceFilters = {},
): Resource[] {
  const { search = '', ...restFilters } = filters;
  const normalizedSearch = search.toLowerCase();

  return resources.filter((resource) => {
    const matchesSearch = resource.name
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesFilters = resourceFilterKeys.every(
      (key) => !restFilters[key] || resource[key] === restFilters[key],
    )

    return matchesSearch && matchesFilters;
  });
}