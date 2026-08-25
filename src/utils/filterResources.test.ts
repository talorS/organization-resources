import { describe, expect, it } from 'vitest'
import type { Resource } from '../domain/resource'
import { filterResources } from './filterResources'

const resources: Resource[] = [
  {
    id: 'resource-1',
    name: 'Payments API',
    type: 'API Gateway',
    provider: 'AWS',
    region: 'eu-west-1',
    environment: 'production',
    severity: 'critical',
    owner: 'Payments team',
    tags: ['payments'],
    openIssues: 3,
  },
  {
    id: 'resource-2',
    name: 'Billing Worker',
    type: 'Worker',
    provider: 'GCP',
    region: 'europe-west1',
    environment: 'staging',
    severity: 'high',
    owner: 'Billing team',
    tags: ['billing'],
    openIssues: 1,
  },
  {
    id: 'resource-3',
    name: 'Payments Database',
    type: 'PostgreSQL',
    provider: 'AWS',
    region: 'us-east-1',
    environment: 'production',
    severity: 'high',
    owner: 'Payments team',
    tags: ['payments', 'database'],
    openIssues: 0,
  },
]

describe('filterResources', () => {
  it('should return all resources when search and filters are empty', () => {
    expect(
      filterResources(resources),
    ).toEqual(resources)
  })

  it('should match a partial resource name case-insensitively', () => {
    expect(
      filterResources(resources, {
        search: 'PAY',
      }),
    ).toEqual([resources[0], resources[2]])
  })

  it('should filter by provider', () => {
    expect(
      filterResources(resources, {
        search: '',
        provider: 'GCP',
      }),
    ).toEqual([resources[1]])
  })

  it('should filter by environment and severity together', () => {
    expect(
      filterResources(resources, {
        search: '',
        environment: 'production',
        severity: 'high',
      }),
    ).toEqual([resources[2]])
  })

  it('should apply search and all selected filters together', () => {
    expect(
      filterResources(resources, {
        search: 'database',
        provider: 'AWS',
        environment: 'production',
        severity: 'high',
      }),
    ).toEqual([resources[2]])
  })

  it('should return an empty array when nothing matches', () => {
    expect(
      filterResources(resources, {
        search: 'missing'
      }),
    ).toEqual([])
  })
})
