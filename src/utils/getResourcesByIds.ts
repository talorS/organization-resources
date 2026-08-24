import type { Resource } from '../domain/resource'

export function getResourcesByIds(
  resources: readonly Resource[],
  resourceIds: readonly string[],
): Resource[] {
  return resourceIds.flatMap((resourceId) => {
    const resource = resources.find(({ id }) => id === resourceId);
    return resource ? [resource] : []
  })
}
