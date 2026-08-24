import { describe, expect, it } from 'vitest'
import type { Resource } from '../domain/resource'
import { getResourcesByIds } from './getResourcesByIds'

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
    name: 'Analytics Warehouse',
    type: 'Data Warehouse',
    provider: 'GCP',
    region: 'europe-west1',
    environment: 'staging',
    severity: 'high',
    owner: 'Data team',
    tags: ['analytics'],
    openIssues: 1,
  },
  {
    id: 'resource-3',
    name: 'Marketing Database',
    type: 'Database',
    provider: 'Azure',
    region: 'westeurope',
    environment: 'development',
    severity: 'medium',
    owner: 'Marketing team',
    tags: ['marketing'],
    openIssues: 0,
  },
]

describe('getResourcesByIds', () => {
  it('should return resources in the requested ID order', () => {
    expect(getResourcesByIds(resources, ['resource-3', 'resource-1'])).toEqual([
      resources[2],
      resources[0],
    ])
  })

  it('should ignore unknown IDs', () => {
    expect(getResourcesByIds(resources, ['unknown-resource', 'resource-2'])).toEqual([
      resources[1],
    ])
  })

  it('should return an empty array when no IDs are requested', () => {
    expect(getResourcesByIds(resources, [])).toEqual([])
  })
})
