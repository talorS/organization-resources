import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { resources } from '../../seed/resources'
import { ResourcesPage } from './ResourcesPage'

describe('ResourcesPage', () => {
  it('should show five resources on the first page by default', () => {
    render(<ResourcesPage />)

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

  it('shows the next five resources after navigating to the next page', async () => {
    const user = userEvent.setup()
    render(<ResourcesPage />)

    await user.click(screen.getByRole('button', { name: 'Go to next page' }))

    expect(screen.getByText('6-10 of 12')).toBeInTheDocument()

    resources.slice(5, 10).forEach((resource) => {
      expect(screen.getByRole('cell', { name: resource.name })).toBeInTheDocument()
    })
  })

  it('should show all resources when All is selected', async () => {
    const user = userEvent.setup()
    render(<ResourcesPage />)

    await user.selectOptions(screen.getByLabelText('Rows per page:'), '-1')

    expect(screen.getByText('1-12 of 12')).toBeInTheDocument()

    resources.forEach((resource) => {
      expect(screen.getByRole('cell', { name: resource.name })).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: 'Go to next page' })).toBeDisabled()
  })
})
