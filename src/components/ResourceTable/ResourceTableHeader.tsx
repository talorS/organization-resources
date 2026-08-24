const columnHeaders = [
  'Name',
  'Type',
  'Provider',
  'Environment',
  'Severity',
  'Open Issues',
] as const;

export function ResourceTableHeader() {
  return (
    <thead>
      <tr>
        {columnHeaders.map((columnHeader) => (
          <th key={columnHeader} scope="col">
            {columnHeader}
          </th>
        ))}
      </tr>
    </thead>
  )
}
