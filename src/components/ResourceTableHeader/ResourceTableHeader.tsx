import { resourceTableColumns } from './resourceTableColumns'

export function ResourceTableHeader() {
  return (
    <thead>
      <tr>
        {resourceTableColumns.map((column) => (
          <th key={column.key} scope="col">
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}
