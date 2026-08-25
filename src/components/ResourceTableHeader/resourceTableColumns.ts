import type { Resource } from '../../domain/resource'

type ResourceTableColumn = {
  key: keyof Resource
  label: string
}

export const resourceTableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' },
  { key: 'provider', label: 'Provider' },
  { key: 'environment', label: 'Environment' },
  { key: 'severity', label: 'Severity' },
  { key: 'openIssues', label: 'Open Issues' },
] as const satisfies readonly ResourceTableColumn[]


export type ResourceTableColumnKey =
  (typeof resourceTableColumns)[number]["key"];