export type Application = {
  id: string
  name: string
  description?: string
  resourceIds: string[]
}

export type CreateApplication = Omit<Application, 'id'>