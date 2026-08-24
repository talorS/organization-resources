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
