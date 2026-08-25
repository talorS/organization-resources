import { useState } from 'react'

export function useResourceSelection() {
  const [selectedResourceIds, setSelectedResourceIds] = useState<
    readonly string[]
  >([])

  function toggleResource(resourceId: string) {
    setSelectedResourceIds((currentIds) =>
      currentIds.includes(resourceId)
        ? currentIds.filter((id) => id !== resourceId)
        : [...currentIds, resourceId],
    )
  }

  function clearSelection() {
    setSelectedResourceIds([])
  }

  return {
    selectedResourceIds,
    selectedCount: selectedResourceIds.length,
    toggleResource,
    clearSelection,
  }
}
