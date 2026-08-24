import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout/AppLayout'
import { ApplicationsPage } from './pages/ApplicationsPage/ApplicationsPage'
import { ResourcesPage } from './pages/ResourcesPage/ResourcesPage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ResourcesPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
      </Route>
    </Routes>
  )
}
