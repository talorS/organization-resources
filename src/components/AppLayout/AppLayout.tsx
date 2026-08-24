import { Link, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <Link to="/">Resources</Link>
          <Link to="/applications">Applications</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
