import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import type { Resource } from '../../domain/resource'
import {
  resourceTableColumns,
  type ResourceTableColumnKey,
} from '../ResourceTableHeader/resourceTableColumns'
import { Badge } from '../Badge/Badge'
import styles from './ResourceTableRow.module.css'

type ResourceTableRowProps = {
  resource: Resource
  isSelected: boolean
  onSelect: () => void
}

function renderResourceCell(
  key: ResourceTableColumnKey,
  resource: Resource,
): ReactNode {
  const value = resource[key]

  switch (key) {
    case 'severity':
      return (
        <Badge className={clsx(styles.severity, styles[value])}>{value}</Badge>
      )
    case 'openIssues':
      return <Badge>{value}</Badge>
    default:
      return <span>{value}</span>
  }
}

export function ResourceTableRow({
  resource,
  isSelected,
  onSelect,
}: ResourceTableRowProps) {
  return (
    <tr
      className={styles.row}
      data-selected={isSelected ? 'true' : undefined}
      onClick={onSelect}
    >
      {resourceTableColumns.map((column) => (
        <td key={column.key}>{renderResourceCell(column.key, resource)}</td>
      ))}
    </tr>
  )
}
