import type { Resource } from '../../domain/resource'

type ResourceTableRowProps = {
  resource: Resource
}

export function ResourceTableRow({ resource }: ResourceTableRowProps) {
  return (
    <tr>
      <td>{resource.name}</td>
      <td>{resource.type}</td>
      <td>{resource.provider}</td>
      <td>{resource.environment}</td>
      <td>{resource.severity}</td>
      <td>{resource.openIssues}</td>
    </tr>
  )
}
