import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import type { Application } from '../../domain/application'
import { ApplicationsPage } from './ApplicationsPage'

const applications: Application[] = [
  {
    id: 'application-1',
    name: 'Payments API',
    resourceIds: ['r-001', 'r-002'],
  },
]

function renderApplicationsPage() {
  return render(
    <MemoryRouter initialEntries={['/applications']}>
      <Routes>
        <Route
          element={
            <Outlet
              context={{
                applications,
                createApplication: vi.fn(),
              }}
            />
          }
        >
          <Route path="/applications" element={<ApplicationsPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('ApplicationsPage', () => {
  it('should open a graph modal when Visualize is clicked', async () => {
    const user = userEvent.setup()
    renderApplicationsPage()

    await user.click(screen.getByRole('button', { name: 'Visualize' }))

    expect(
      screen.getByRole('heading', {
        name: 'Application: Payments API',
        hidden: true,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: 'Payments API connected to 2 resources',
        hidden: true,
      }),
    ).toBeInTheDocument()
  })
})
