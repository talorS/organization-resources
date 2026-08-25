import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { resources } from '../../seed/resources'
import { ResourcesPage } from './ResourcesPage'

function LocationDisplay() {
  const location = useLocation()
  return <output data-testid="location">{location.search}</output>
}

function renderResourcesPage(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ResourcesPage />
      <LocationDisplay />
    </MemoryRouter>,
  )
}

describe('ResourcesPage', () => {
  it('should show five resources on the first page by default', () => {
    renderResourcesPage()

    expect(screen.getByRole('heading', { level: 1, name: 'Resources' })).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('1-5 of 12')).toBeInTheDocument()
    expect(screen.getByLabelText('Rows per page:')).toHaveValue('5')

    resources.slice(0, 5).forEach((resource) => {
      expect(screen.getByRole('cell', { name: resource.name })).toBeInTheDocument()
    })

    expect(
      screen.queryByRole('cell', { name: resources[5].name }),
    ).not.toBeInTheDocument()
  })

  it('should show the next five resources after navigating to the next page', async () => {
    const user = userEvent.setup()
    renderResourcesPage()

    await user.click(screen.getByRole('button', { name: 'Go to next page' }))

    expect(screen.getByText('6-10 of 12')).toBeInTheDocument()

    resources.slice(5, 10).forEach((resource) => {
      expect(screen.getByRole('cell', { name: resource.name })).toBeInTheDocument()
    })
  })

  it('should show all resources when All is selected', async () => {
    const user = userEvent.setup()
    renderResourcesPage()

    await user.selectOptions(screen.getByLabelText('Rows per page:'), '-1')

    expect(screen.getByText('1-12 of 12')).toBeInTheDocument()

    resources.forEach((resource) => {
      expect(screen.getByRole('cell', { name: resource.name })).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: 'Go to next page' })).toBeDisabled()
  })

  it('should filter resources after the search debounce and update the URL', async () => {
    const user = userEvent.setup()
    renderResourcesPage()

    await user.type(screen.getByLabelText('Search'), 'payments')

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: 'payments-api-prod' })).toBeInTheDocument()
      expect(screen.queryByRole('cell', { name: 'auth-lambda-prod' })).not.toBeInTheDocument()
      expect(screen.getByText('1-4 of 4')).toBeInTheDocument()
      expect(screen.getByTestId('location')).toHaveTextContent('?search=payments')
    })
  })

  it('should initialize the search input from the URL', () => {
    renderResourcesPage('/?search=payments')

    expect(screen.getByLabelText('Search')).toHaveValue('payments')
    expect(screen.getByRole('cell', { name: 'payments-api-prod' })).toBeInTheDocument()
    expect(screen.queryByRole('cell', { name: 'auth-lambda-prod' })).not.toBeInTheDocument()
  })
})
