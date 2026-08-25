import {
  resourceFilterKeys,
  type Resource,
  type ResourceQuery,
} from '../domain/resource'

export function filterResources(
  resources: readonly Resource[],
  query: ResourceQuery = {},
): Resource[] {
  const { search = '', filters = {} } = query;
  const normalizedSearch = search.trim().toLowerCase();

  return resources.filter((resource) => {
    const matchesSearch = resource.name
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesFilters = resourceFilterKeys.every(
      (key) =>
        filters[key] === undefined ||
        resource[key] === filters[key],
    );

    return matchesSearch && matchesFilters
  })
}
