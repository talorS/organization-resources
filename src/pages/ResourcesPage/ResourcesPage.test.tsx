import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { resources } from '../../seed/resources'
import { ResourcesPage } from './ResourcesPage'

describe('ResourcesPage', () => {
  it('should render the resource table with all resources', () => {
    render(<ResourcesPage />)

    expect(screen.getByRole('heading', { level: 1, name: 'Resources' })).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()

    resources.forEach((resource) => {
      expect(screen.getByRole('cell', { name: resource.name })).toBeInTheDocument()
    })
  })
})
