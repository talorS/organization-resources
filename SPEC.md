# App Specification

## Goal

Build a responsive frontend for browsing cloud resources, grouping selected resources into Applications, and visualizing each Application with its resources.

## Requirements

1. Display a local dataset of 12 cloud resources in a table with name, type, provider, environment, severity, and open issues.
2. Support search by resource name.
3. Support filtering by provider, environment, and severity.
4. Store search and filter values in the URL.
5. Allow selecting multiple resources.
6. Preserve selection when filters or search temporarily hide a resource.
7. Show a selection bar with selected count, Clear, and Create Application actions.
8. Open `ApplicationModal` to create an Application from selected resources.
9. Require an Application name and allow an optional description.
10. Store created Applications in shared in-memory client state.
11. Navigate to an Applications page after creation.
12. Display an empty state when no Applications exist.
13. Allow selecting an Application and display its static radial resource graph.
14. Support desktop and mobile layouts.
15. Use basic accessibility: semantic HTML, accessible labels, and keyboard-usable controls.

## Out of Scope

- Backend or API integration.
- Authentication and persistence after refresh.
- Editing or deleting Resources or Applications.
- Pagination, sorting, and column configuration.
- state mutation and interactive graph nodes.

## Acceptance Criteria

- [ ] The table displays name, type, provider, environment, severity, and open issues for 12 local resources.
- [ ] Search and filters work together and update the URL.
- [ ] Clear filters preserves the search query.
- [ ] Users can select, deselect, and clear multiple resources.
- [ ] Selection survives search and filter changes.
- [ ] An Application cannot be created with an empty trimmed name.
- [ ] Creating an Application stores selected resource IDs and navigates to Applications.
- [ ] Applications page has an empty state.
- [ ] Selecting an Application displays its resource graph.
- [ ] Main flows work on mobile and with keyboard controls.
- [ ] Refresh clears in-memory Applications.

## Technical Decisions

- React and TypeScript.
- Static local mock data.
- Client-side search and filtering.
- URL state for search, provider, environment, and severity.
- Local state for selection and modal visibility.
- App-level shared client state for Applications.
- Applications store `resourceIds`, not copied Resource objects.
- The final README documents the fresh-clone command, what was built, next steps, and AI usage.

## Decisions

- Components are domain-specific.
- Each component has its own folder and CSS module when needed.
- Tests are colocated with the code they verify.
