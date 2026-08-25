import type { ReactNode } from 'react'
import type { Resource } from '../../domain/resource'
import { ResourceTableHeader } from '../ResourceTableHeader/ResourceTableHeader'
import { resourceTableColumns } from '../ResourceTableHeader/resourceTableColumns'
import { ResourceTableRow } from '../ResourceTableRow/ResourceTableRow'
import styles from './ResourceTable.module.css'
import { EmptyState } from '../EmptyState/EmptyState'

type ResourceTableProps = {
  resources: readonly Resource[]
  selectedIds: readonly string[]
  onToggle: (resourceId: string) => void
  footer?: ReactNode
}

export function ResourceTable({
  resources,
  selectedIds,
  onToggle,
  footer,
}: ResourceTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <ResourceTableHeader />
        <tbody>
          {resources.length === 0 ? (
            <tr>
              <td colSpan={resourceTableColumns.length}>
                <EmptyState className={styles.emptyState}>
                  <p>No resources found.</p>
                </EmptyState>
              </td>
            </tr>
          ) : (
            resources.map((resource) => (
              <ResourceTableRow
                key={resource.id}
                resource={resource}
                isSelected={selectedIds.includes(resource.id)}
                onSelect={() => onToggle(resource.id)}
              />
            ))
          )}
        </tbody>
        {footer && (
          <tfoot>
            <tr>
              <td colSpan={resourceTableColumns.length}>{footer}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
