import type { Resource } from '../../domain/resource'
import { resourceTableColumns } from './resourceTableColumns'

type ResourceTableRowProps = {
  resource: Resource
}

export function ResourceTableRow({ resource }: ResourceTableRowProps) {
  return (
    <tr>
      {resourceTableColumns.map((column) => (
        <td key={column.key}>{resource[column.key]}</td>
      ))}
    </tr>
  )
}
