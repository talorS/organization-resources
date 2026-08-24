import { ResourceTable } from '../../components/ResourceTable/ResourceTable'
import { resources } from '../../seed/resources'

export function ResourcesPage() {
  return (
    <>
      <h1>Resources</h1>
      <ResourceTable resources={resources} />
    </>
  )
}
