import { useState } from 'react'

const defaultRowsPerPage = 5

export function usePagination<T>(items: readonly T[]) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)
  const totalItems = items.length
  const isAllRowsSelected = rowsPerPage === -1
  const totalPages = isAllRowsSelected
    ? 1
    : Math.max(1, Math.ceil(totalItems / rowsPerPage))
  const firstItemIndex = (currentPage - 1) * rowsPerPage
  const paginatedItems = isAllRowsSelected
    ? items
    : items.slice(firstItemIndex, firstItemIndex + rowsPerPage)
  const firstItem = totalItems === 0 ? 0 : firstItemIndex + 1
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
    paginatedItems,
    goToPage,
    changeRowsPerPage,
    resetPage,
  }
}
