import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Resource } from '../../domain/resource'
import { ResourceTable } from './ResourceTable'

const resource: Resource = {
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
}

const columnHeaders = [
  'Name',
  'Type',
  'Provider',
  'Environment',
  'Severity',
  'Open Issues',
]

describe('ResourceTable', () => {
  it('should render resource data in a semantic table', () => {
    render(<ResourceTable resources={[resource]} selectedIds={[]} onToggle={() => {}} />)

    expect(screen.getByRole('table')).toBeInTheDocument()

    columnHeaders.forEach((header) => {
      expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument()
    });

    [
      resource.name,
      resource.type,
      resource.provider,
      resource.environment,
      resource.severity,
      String(resource.openIssues),
    ].forEach((value) => {
      expect(screen.getByRole('cell', { name: value })).toBeInTheDocument()
    })
  })

  it('should render an empty state when there are no resources', () => {
    render(<ResourceTable resources={[]} selectedIds={[]} onToggle={() => {}} />)

    expect(screen.getByText('No resources found.')).toBeInTheDocument()
  })
})
