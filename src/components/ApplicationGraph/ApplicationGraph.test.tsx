import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Application } from '../../domain/application'
import type { Resource } from '../../domain/resource'
import { ApplicationGraph } from './ApplicationGraph'

const application: Application = {
  id: 'application-1',
  name: 'Payments API',
  resourceIds: ['resource-1', 'resource-2'],
}

const resources: Resource[] = [
  {
    id: 'resource-1',
    name: 'payments-api-prod',
    type: 'EC2 Instance',
    provider: 'AWS',
    region: 'us-east-1',
    environment: 'production',
    severity: 'critical',
    owner: 'payments',
    tags: [],
    openIssues: 0,
  },
  {
    id: 'resource-2',
    name: 'payments-db-prod',
    type: 'RDS Database',
    provider: 'AWS',
    region: 'us-east-1',
    environment: 'production',
    severity: 'critical',
    owner: 'payments',
    tags: [],
    openIssues: 0,
  },
]

describe('ApplicationGraph', () => {
  it('should render the Application and its member resources in an SVG graph', () => {
    render(<ApplicationGraph application={application} resources={resources} />)

    expect(screen.getByRole('heading', { name: 'Application graph' })).toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: 'Payments API connected to 2 resources',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Payments API')).toBeInTheDocument()
    expect(screen.getByText('payments-api-prod')).toBeInTheDocument()
    expect(screen.getByText('payments-db-prod')).toBeInTheDocument()
  })
})
