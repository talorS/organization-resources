import { ApplicationList } from '../../components/ApplicationList/ApplicationList'
import { EmptyState } from '../../components/EmptyState/EmptyState'
import { Pagination } from '../../components/Pagination/Pagination'
import { useApplications } from '../../customHooks/useApplications'
import { usePagination } from '../../customHooks/usePagination'
import styles from './ApplicationsPage.module.css'

export function ApplicationsPage() {
  const { applications } = useApplications()
  const pagination = usePagination(applications)

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Applications</h1>
      </header>

      {!applications.length ? (
        <EmptyState className={styles.emptyState}>
          <p>No applications yet. Create on Resources page.</p>
        </EmptyState>
      ) : (
        <section className={styles.listSection} aria-label="Applications">
          <ApplicationList
            applications={pagination.paginatedItems}
            selectedApplicationId={null}
            onSelectApplication={() => {}}
          />
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            rowsPerPage={pagination.rowsPerPage}
            firstItem={pagination.firstItem}
            lastItem={pagination.lastItem}
            totalItems={pagination.totalItems}
            itemsPerPageLabel="Applications per page:"
            onPageChange={pagination.goToPage}
            onRowsPerPageChange={pagination.changeRowsPerPage}
          />
        </section>
      )}
    </div>
  )
}
