import firstPageIcon from '../../assets/icons/first-page.svg'
import previousPageIcon from '../../assets/icons/previous-page.svg'
import nextPageIcon from '../../assets/icons/next-page.svg'
import lastPageIcon from '../../assets/icons/last-page.svg'
import styles from './Pagination.module.css'

type PaginationProps = {
  currentPage: number
  totalPages: number
  rowsPerPage: number
  firstItem: number
  lastItem: number
  totalItems: number
  itemsPerPageLabel?: string
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
}

const rowsPerPageOptions = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: 'All', value: -1 },
]

export function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  firstItem,
  lastItem,
  totalItems,
  itemsPerPageLabel = 'Rows per page:',
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <label className={styles.rowsPerPageLabel}>
        {itemsPerPageLabel}
        <select
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <span className={styles.displayedRows} aria-live="polite">
        {firstItem}-{lastItem} of {totalItems}
      </span>
      <div className={styles.actions}>
        <button type="button" onClick={() => onPageChange(1)} disabled={currentPage === 1} aria-label="Go to first page" title="Go to first page">
          <img src={firstPageIcon} alt="" />
        </button>
        <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Go to previous page" title="Go to previous page">
          <img src={previousPageIcon} alt="" />
        </button>
        <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Go to next page" title="Go to next page">
          <img src={nextPageIcon} alt="" />
        </button>
        <button type="button" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} aria-label="Go to last page" title="Go to last page">
          <img src={lastPageIcon} alt="" />
        </button>
      </div>
    </nav>
  )
}
