export type Provider = 'AWS' | 'GCP' | 'Azure'

export type Environment = 'production' | 'staging' | 'development'

export type Severity = 'low' | 'medium' | 'high' | 'critical'

export type Resource = {
  id: string
  name: string
  type: string
  provider: Provider
  region: string
  environment: Environment
  severity: Severity
  owner: string
  tags: string[]
  openIssues: number
}

export const resourceFilterKeys = [
  'provider',
  'environment',
  'severity',
] as const

export type ResourceFilterKey = (typeof resourceFilterKeys)[number]

export type ResourceFilters = Partial<
  Pick<Resource, ResourceFilterKey>
>

export type ResourceQuery = Partial<{
  search: string
  filters: ResourceFilters
}>
