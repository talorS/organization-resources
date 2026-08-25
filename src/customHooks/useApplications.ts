import { useCallback, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import type { Application, CreateApplication } from '../domain/application'

export type ApplicationsOutletContext = {
  applications: readonly Application[]
  createApplication: (application: CreateApplication) => void
}

export function useApplicationsState(): ApplicationsOutletContext {
  const [applications, setApplications] = useState<Application[]>([])

  const createApplication = useCallback((application: CreateApplication) => {
    setApplications((currentApplications) => [
      ...currentApplications,
      {
        ...application,
        id: crypto.randomUUID(),
        resourceIds: [...application.resourceIds],
      },
    ])
  }, [])

  return useMemo(
    () => ({ applications, createApplication }),
    [applications, createApplication],
  )
}

export function useApplications() {
  return useOutletContext<ApplicationsOutletContext>()
}
