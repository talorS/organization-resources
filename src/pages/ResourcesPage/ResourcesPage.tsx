import { Pagination } from '../../components/Pagination/Pagination'
import { ResourceFilters } from '../../components/ResourceFilters/ResourceFilters'
import { ResourceSearch } from '../../components/ResourceSearch/ResourceSearch'
import { ResourceTable } from '../../components/ResourceTable/ResourceTable'
import { useResourcePagination } from '../../customHooks/useResourcePagination'
import { resources } from '../../seed/resources'
import styles from './ResourcesPage.module.css'

export function ResourcesPage() {
  const pagination = useResourcePagination(resources)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Resources</h1>
        <p className={styles.subtitle}>
          Select resources to group into an Application
        </p>
      </header>

      <div className={styles.toolbar}>
        <ResourceSearch onDebounceSearch={() => {}} />
        <ResourceFilters />
      </div>

      <ResourceTable
        resources={pagination.paginatedResources}
        footer={
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            rowsPerPage={pagination.rowsPerPage}
            firstItem={pagination.firstItem}
            lastItem={pagination.lastItem}
            totalItems={pagination.totalItems}
            onPageChange={pagination.goToPage}
            onRowsPerPageChange={pagination.changeRowsPerPage}
          />
        }
      />
    </div>
  )
}
