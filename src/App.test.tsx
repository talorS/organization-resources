import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

function renderAt(path: string) {
  window.history.pushState({}, '', path)
  return render(<App />)
}

describe('app routes', () => {
  it('renders the Resources route with app navigation', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Resources' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Resources' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Applications' })).toBeInTheDocument()
  })

  it('renders the Applications route with app navigation', () => {
    renderAt('/applications')

    expect(screen.getByRole('heading', { level: 1, name: 'Applications' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Resources' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Applications' })).toBeInTheDocument()
  })
})
