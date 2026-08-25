import { useState } from 'react'
import { ApplicationModal } from '../../components/ApplicationModal/ApplicationModal'
import { Pagination } from '../../components/Pagination/Pagination'
import { Selection } from '../../components/Selection/Selection'
import { ResourceFilters } from '../../components/ResourceFilters/ResourceFilters'
import { ResourceSearch } from '../../components/ResourceSearch/ResourceSearch'
import { ResourceTable } from '../../components/ResourceTable/ResourceTable'
import { usePagination } from '../../customHooks/usePagination'
import { useResourceQueryParams } from '../../customHooks/useResourceQueryParams'
import { useResourceSearch } from '../../customHooks/useResourceSearch'
import { useResourceSelection } from '../../customHooks/useResourceSelection'
import type { ResourceFilters as ResourceFiltersValue } from '../../domain/resource'
import { resources } from '../../seed/resources'
import { filterResources } from '../../utils/filterResources'
import styles from './ResourcesPage.module.css'
import { useApplications } from '../../customHooks/useApplications'
import { toast } from 'react-toastify'

export function ResourcesPage() {
  const {
    search,
    filters,
    hasActiveFilters,
    updateSearch,
    updateFilters,
    clearFilters,
  } = useResourceQueryParams()
  const filteredResources = filterResources(resources, { search, filters })
  const pagination = usePagination(filteredResources)
  const selection = useResourceSelection()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { createApplication } = useApplications();

  function handleDebouncedSearch(nextSearch: string) {
    pagination.resetPage()
    updateSearch(nextSearch)
  }

  function handleFilterChange(nextFilters: ResourceFiltersValue) {
    pagination.resetPage()
    updateFilters(nextFilters)
  }

  function handleClearFilters() {
    pagination.resetPage()
    clearFilters()
  }

  const { searchInput, setSearchInput } = useResourceSearch({
    search,
    onDebouncedSearch: handleDebouncedSearch,
  })

  function handleCreateApplication({ name }: { name: string }) {
    createApplication({
      name,
      resourceIds: selection.selectedResourceIds,
    })
    selection.clearSelection()
    setIsModalOpen(false)
    toast.success('Application created successfully', {
      position: 'top-center',
      autoClose: 500,
    })
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Resources</h1>
        <p className={styles.subtitle}>
          Search, filter or select multiple resources and create a named Application
        </p>
      </header>

      <div className={styles.toolbar}>
        <ResourceSearch value={searchInput} onChange={setSearchInput} />
        <ResourceFilters
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />
      </div>

      <ResourceTable
        resources={pagination.paginatedItems}
        selectedIds={selection.selectedResourceIds}
        onToggle={selection.toggleResource}
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
      {selection.selectedCount > 0 && (
        <Selection
          count={selection.selectedCount}
          onClear={selection.clearSelection}
          onCreate={() => setIsModalOpen(true)}
        />
      )}

      {isModalOpen && (
        <ApplicationModal
          onCreate={handleCreateApplication}
          onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
