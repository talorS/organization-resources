import { NavLink, Outlet } from 'react-router-dom'
import { useApplicationsState } from '../../customHooks/useApplications'
import styles from './AppLayout.module.css'

export function AppLayout() {
  const applicationsContext = useApplicationsState()

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.brand}>@Talor Samara - Gambit's FE Assignment</span>
        <nav className={styles.nav} aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink}${isActive ? ` ${styles.navLinkActive}` : ''}`
            }
          >
            Resources
          </NavLink>
          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `${styles.navLink}${isActive ? ` ${styles.navLinkActive}` : ''}`
            }
          >
            Applications
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet context={applicationsContext} />
      </main>
    </div>
  )
}
