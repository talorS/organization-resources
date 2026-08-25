import { Pagination } from '../../components/Pagination/Pagination'
import { ResourceFilters } from '../../components/ResourceFilters/ResourceFilters'
import { ResourceSearch } from '../../components/ResourceSearch/ResourceSearch'
import { ResourceTable } from '../../components/ResourceTable/ResourceTable'
import { useResourcePagination } from '../../customHooks/useResourcePagination'
import { useResourceQueryParams } from '../../customHooks/useResourceQueryParams'
import { useResourceSearch } from '../../customHooks/useResourceSearch'
import { resources } from '../../seed/resources'
import { filterResources } from '../../utils/filterResources'
import styles from './ResourcesPage.module.css'

export function ResourcesPage() {
  const { search, filters, updateSearch } = useResourceQueryParams();
  const filteredResources = filterResources(resources, { search, filters });
  const pagination = useResourcePagination(filteredResources);

  function handleDebouncedSearch(nextSearch: string) {
    pagination.resetPage()
    updateSearch(nextSearch)
  }

  const { searchInput, setSearchInput } = useResourceSearch({
    search,
    onDebouncedSearch: handleDebouncedSearch,
  })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Resources</h1>
        <p className={styles.subtitle}>
          Search, filter or select resources to group into an Application
        </p>
      </header>

      <div className={styles.toolbar}>
        <ResourceSearch value={searchInput} onChange={setSearchInput} />
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
