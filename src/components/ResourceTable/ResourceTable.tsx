import type { Resource } from '../../domain/resource'
import { ResourceTableHeader } from './ResourceTableHeader'
import { ResourceTableRow } from './ResourceTableRow'

type ResourceTableProps = {
  resources: readonly Resource[]
}

export function ResourceTable({ resources }: ResourceTableProps) {
  return (
    <table>
      <ResourceTableHeader />
      <tbody>
        {resources.length === 0 ? (
          <tr>
            <td colSpan={6}>No resources found.</td>
          </tr>
        ) : (
          resources.map((resource) => (
            <ResourceTableRow key={resource.id} resource={resource} />
          ))
        )}
      </tbody>
    </table>
  )
}
