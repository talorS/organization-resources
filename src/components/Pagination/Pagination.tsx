import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded'
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import styles from './Pagination.module.css'

type PaginationProps = {
  currentPage: number
  totalPages: number
  rowsPerPage: number
  firstItem: number
  lastItem: number
  totalItems: number
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
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <label className={styles.rowsPerPageLabel}>
        Rows per page:
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
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
          title="Go to first page"
        >
          <FirstPageRoundedIcon />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          title="Go to previous page"
        >
          <ChevronLeftRoundedIcon />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          title="Go to next page"
        >
          <ChevronRightRoundedIcon />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
          title="Go to last page"
        >
          <LastPageRoundedIcon />
        </button>
      </div>
    </nav>
  )
}
