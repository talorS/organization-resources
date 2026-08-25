import type { ReactNode } from 'react'
import type { Resource } from '../../domain/resource'
import { ResourceTableHeader } from '../ResourceTableHeader/ResourceTableHeader'
import { resourceTableColumns } from '../ResourceTableHeader/resourceTableColumns'
import { ResourceTableRow } from '../ResourceTableRow/ResourceTableRow'
import styles from './ResourceTable.module.css'

type ResourceTableProps = {
  resources: readonly Resource[]
  footer?: ReactNode
}

export function ResourceTable({ resources, footer }: ResourceTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <ResourceTableHeader />
        <tbody>
          {resources.length === 0 ? (
            <tr>
              <td colSpan={resourceTableColumns.length}>No resources found.</td>
            </tr>
          ) : (
            resources.map((resource) => (
              <ResourceTableRow key={resource.id} resource={resource} />
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
