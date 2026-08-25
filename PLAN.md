# Implementation Plan

## Project structure

```text
src/
├── components/
│   ├── AppLayout/
│   ├── ResourceToolbar/
│   ├── ResourceSearch/
│   ├── ResourceFilters/
│   ├── ResourceTable/
│   ├── SelectionBar/
│   ├── ApplicationModal/
│   ├── ApplicationList/
│   └── ApplicationGraph/
├── customHooks/
│   ├── useApplications.ts
│   ├── useDebouncedValue.ts
│   ├── useResourceQueryParams.ts
│   └── useResourceSelection.ts
├── domain/
│   ├── application.ts
│   └── resource.ts
├── pages/
│   ├── ResourcesPage/
│   └── ApplicationsPage/
├── seed/
│   └── resources.ts
├── utils/
│   ├── filterResources.ts
│   └── getRadialLayout.ts
├── router.tsx
└── main.tsx
```

## Chunk 1 — Foundation

- Inspect the starter project.
- Add missing test tooling: Vitest, React Testing Library, jsdom, and setup file.
- Create the agreed folder structure.
- Add routes for `/` and `/applications`.
- Add `AppLayout` and navigation.

**TDD:** Add a route-rendering smoke test. Full TDD is not needed for configuration.

**Validation:** Run tests, type-check, and production build.

**Commit:** `chore: set up app structure and test environment`

## Chunk 2 — Domain and mock data

- Define `Resource`, `Provider`, `Environment`, `Severity`, and `Application`.
- Add 12 fixed Resources under `seed/resources.ts`, varied across providers, environments, and severity values.
- Add a small helper to resolve Resources by IDs.

**TDD:** RED → GREEN → REFACTOR for data invariants, unique IDs, and resource lookup.

**Validation:** Run domain tests, full suite, type-check, and build.

**Commit:** `feat: add resource domain model and mock data`

## Chunk 3 — Resources table

- Add `ResourcesPage`.
- Implement a domain-specific `ResourceTable`.
- Add table header, rows, and no-results state.
- Show the assignment's six required columns: name, type, provider, environment, severity, and open issues.
- Use semantic table markup and accessible checkbox labels.

**TDD:** RED → GREEN → REFACTOR for displayed rows, columns, and empty state.

**Validation:** Run table tests, full suite, type-check, and build.

**Commit:** `feat: display resources table`

## Chunk 4 — Search and URL filters

- Implement `useResourceQueryParams`.
- Store search, provider, environment, and severity in the URL.
- Add debounced search URL updates.
- Implement pure `filterResources`.
- Add Clear filters without clearing search.

**TDD:**

1. RED → GREEN → REFACTOR for pure search/filter logic.
2. RED → GREEN → REFACTOR for URL behavior and toolbar interaction.

**Validation:** Test combined filters, URL restoration, clear filters, full suite, type-check, and build.

**Commit:** `feat: add resource search and URL filters`

## Chunk 5 — Resource selection

- Add checkbox selection to table rows.
- Implement `useResourceSelection`.
- Add `SelectionBar`.
- Preserve selected IDs across search and filter changes.

**TDD:** RED → GREEN → REFACTOR for selection, deselection, clear action, count, and preserved selection.

**Validation:** Run selection tests, full suite, type-check, and build.

**Commit:** `feat: add resource selection`

## Chunk 6 — Application creation

- Add shared in-memory Application state at the app/router-layout level.
- Implement `ApplicationModal`.
- Display selected Resources in the modal.
- Require a trimmed name; description is optional.
- Create the Application with selected `resourceIds`.
- Navigate to `/applications`.
- Ensure the modal can be operated with a keyboard.

**TDD:** RED → GREEN → REFACTOR for opening the modal, validation, creation, and navigation.

**Validation:** Run creation-flow tests, full suite, type-check, and build.

**Commit:** `feat: create applications from selected resources`

## Chunk 7 — Applications and graph

- Implement Applications empty state.
- Implement `ApplicationList`.
- Implement pure radial layout in `getRadialLayout`.
- Implement static `ApplicationGraph`.

**TDD:**

1. RED → GREEN → REFACTOR for zero, one, and multiple Resource layout cases.
2. RED → GREEN → REFACTOR for empty state, Application selection, and graph rendering.

**Validation:** Run graph and page tests, full suite, type-check, and build.

**Commit:** `feat: display applications and resource graph`

## Chunk 8 — Final quality review

- Review mobile layout and the overall visual polish.
- Verify semantic markup, labels, keyboard controls, and modal behavior.
- Replace the Vite README with project instructions (`npm install && npm run dev`), a summary of what was built, next steps, and AI usage.
- Remove duplication only where it makes the code simpler.

**TDD:** Add tests only for changed behavior; verify responsive and keyboard flows manually.

**Validation:** Run full suite, type-check, production build, and the complete user flow.

**Commit:** `chore: polish responsive and accessible behavior`
