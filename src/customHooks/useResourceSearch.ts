import { useEffect, useState } from 'react'
import { useDebouncedValue } from './useDebouncedValue'

type UseResourceSearchOptions = {
  search: string
  onDebouncedSearch: (search: string) => void
}

export function useResourceSearch({
  search,
  onDebouncedSearch,
}: UseResourceSearchOptions) {
  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebouncedValue(searchInput)

  useEffect(() => {
    if (debouncedSearch !== search) {
      onDebouncedSearch(debouncedSearch)
    }
  }, [debouncedSearch, onDebouncedSearch, search])

  return {
    searchInput,
    setSearchInput,
  }
}
