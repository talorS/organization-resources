Live Link: https://organization-resources.vercel.app/

# Gambit Security Frontend Assignment

A responsive React application for browsing cloud resources, creating logical
Applications from selected resources, and visualizing each Application as a
resource graph.

## Getting started

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## What was built

- A Resources page with a local cloud-resource dataset.
- Search and provider, environment, and severity filters stored in the URL.
- A responsive, paginated resources table with multi-resource selection.
- Application creation with client-side validation and a success notification.
- Shared in-memory Application state for the current browser session.
- An Applications page with cards, pagination, and a static SVG graph of each
  Application's member resources.
- Semantic HTML, labelled controls, keyboard-usable buttons and selects, and
  native dialog-based modals.

## Technical choices

- React, TypeScript, React Router, and Vite.
- Static local data: no backend, authentication, or persistence is included.
- Resource IDs are stored on an Application instead of copying Resource data.
- Search and filters live in the URL so the Resources view can be refreshed or
  shared without losing them.

## Next steps

- Replace local mock data and in-memory state with a backend API.
- Persist Applications and support editing or deletion.
- Add server-side filtering and pagination for large datasets.

## AI usage

AI was used as a pair-programming assistant to discuss requirements and
architecture, propose implementation steps, review and implement the code in the PLAN.md file (in chunks). 
I did all technical decisions and product judgment and defind the SPEC.md file.
