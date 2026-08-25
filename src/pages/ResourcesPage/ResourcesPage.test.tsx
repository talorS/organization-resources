import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppLayout } from '../../components/AppLayout/AppLayout'
import { resources } from '../../seed/resources'
import { ResourcesPage } from './ResourcesPage'

function LocationDisplay() {
  const location = useLocation()
  return <output data-testid="location">{location.search}</output>
}

function renderResourcesPage(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<ResourcesPage />} />
        </Route>
      </Routes>
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

  it('should filter resources by provider and update the URL', async () => {
    const user = userEvent.setup()
    renderResourcesPage()

    await user.selectOptions(screen.getByLabelText('Provider'), 'GCP')

    expect(screen.getByRole('cell', { name: 'analytics-bq-prod' })).toBeInTheDocument()
    expect(screen.queryByRole('cell', { name: 'payments-api-prod' })).not.toBeInTheDocument()
    expect(screen.getByText('1-4 of 4')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear Filters' })).toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent('?provider=GCP')
  })

  it('should clear active filters while preserving the search query', async () => {
    const user = userEvent.setup()
    renderResourcesPage('/?search=payments&provider=AWS')

    expect(screen.getByRole('button', { name: 'Clear Filters' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear Filters' }))

    expect(screen.getByLabelText('Provider')).toHaveValue('')
    expect(screen.getByTestId('location')).toHaveTextContent('?search=payments')
    expect(screen.getByRole('cell', { name: 'payments-api-prod' })).toBeInTheDocument()
  })
  
  it('should remove whitespace-only searches from the URL', async () => {
    const user = userEvent.setup()
    renderResourcesPage('/?search=payments')

    const searchInput = screen.getByLabelText('Search')
    await user.clear(searchInput)
    await user.type(searchInput, ' ')

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('')
      expect(screen.getByText('1-5 of 12')).toBeInTheDocument()
    })
  })

  it('should select and deselect a resource when its row is clicked', async () => {
    const user = userEvent.setup()
    renderResourcesPage()

    const resourceRow = screen.getByRole('row', {
      name: /payments-api-prod EC2 Instance AWS production critical 4/,
    })

    await user.click(resourceRow)

    expect(resourceRow).toHaveAttribute('data-selected', 'true')
    expect(screen.getByText('1 resource selected')).toBeInTheDocument()

    await user.click(resourceRow)

    expect(resourceRow).not.toHaveAttribute('data-selected')
    expect(screen.queryByText('0 resources selected')).not.toBeInTheDocument()
  })

  it('should clear the selected resources', async () => {
    const user = userEvent.setup()
    renderResourcesPage()

    const resourceRow = screen.getByRole('row', {
      name: /payments-api-prod EC2 Instance AWS production critical 4/,
    })
    await user.click(resourceRow)
    expect(resourceRow).toHaveAttribute('data-selected', 'true')

    await user.click(screen.getByRole('button', { name: 'Clear' }))

    expect(resourceRow).not.toHaveAttribute('data-selected')
    expect(screen.queryByText('0 resources selected')).not.toBeInTheDocument()
  })

  it('should preserve a selection when search temporarily hides the resource', async () => {
    const user = userEvent.setup()
    renderResourcesPage()

    const resourceRow = screen.getByRole('row', {
      name: /auth-lambda-prod Lambda Function AWS production high 0/,
    })
    await user.click(resourceRow)

    const searchInput = screen.getByLabelText('Search')
    await user.type(searchInput, 'payments')

    await waitFor(() => {
      expect(screen.queryByRole('row', { name: /auth-lambda-prod/ })).not.toBeInTheDocument()
    })

    await user.clear(searchInput)

    await waitFor(() => {
      expect(
        screen.getByRole('row', {
          name: /auth-lambda-prod Lambda Function AWS production high 0/,
        }),
      ).toHaveAttribute('data-selected', 'true')
      expect(screen.getByText('1 resource selected')).toBeInTheDocument()
    })
  })

  it('should open the Application modal from the selection bar', async () => {
    const user = userEvent.setup()
    renderResourcesPage()

    await user.click(
      screen.getByRole('row', {
        name: /payments-api-prod EC2 Instance AWS production critical 4/,
      }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Create Application' }),
    )

    expect(
      screen.getByRole('heading', {
        name: 'Create Application',
        hidden: true,
      }),
    ).toBeInTheDocument()
  })

})
