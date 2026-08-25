import { useState } from 'react'
import type { Resource } from '../domain/resource'

const defaultRowsPerPage = 5

export function useResourcePagination(resources: readonly Resource[]) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)
  const totalItems = resources.length
  const isAllRowsSelected = rowsPerPage === -1
  const totalPages = isAllRowsSelected
    ? 1
    : Math.max(1, Math.ceil(totalItems / rowsPerPage))
  const firstResourceIndex = (currentPage - 1) * rowsPerPage
  const paginatedResources = isAllRowsSelected
    ? resources
    : resources.slice(firstResourceIndex, firstResourceIndex + rowsPerPage)
  const firstItem = totalItems === 0 ? 0 : firstResourceIndex + 1
  const lastItem = isAllRowsSelected
    ? totalItems
    : Math.min(currentPage * rowsPerPage, totalItems)

  function goToPage(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages))
  }

  function changeRowsPerPage(nextRowsPerPage: number) {
    setRowsPerPage(nextRowsPerPage)
    setCurrentPage(1)
  }

  function resetPage() {
    setCurrentPage(1)
  }

  return {
    currentPage,
    rowsPerPage,
    totalItems,
    totalPages,
    firstItem,
    lastItem,
    paginatedResources,
    goToPage,
    changeRowsPerPage,
    resetPage,
  }
}
