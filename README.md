# BibleXplorer

Interactive visual explorations of biblical history — from Adam to Jesus.

**Live site:** [biblexplorer.tomgorup.com](https://biblexplorer.tomgorup.com) · [genealogy.tomgorup.com](https://genealogy.tomgorup.com)

## What's inside

### 📜 Genealogy — From Adam to Jesus (`/genealogy`)

An interactive family tree of **486 people** compiled from 1 Chronicles 1–9, Matthew 1, and Luke 3.

- Zoomable tree rendered with Cytoscape, color-coded by tribe, sized by significance
- Filter by source book (1 Chronicles / Matthew / Luke), tribe, or level of detail
- One-tap trace of the complete lineage of Jesus, with the five women Matthew names highlighted
- Every person links to the verses that mention them (opens BibleGateway)
- Relationships are **typed** so the tree never overstates what Scripture says:
  - `parent` — literal parent → child
  - `spouse` — marriage/union (drawn dashed, never as a blood line)
  - `succession` — rulers who followed one another (Edom's kings were not a dynasty, Gen 36:31–39)
  - `descendant` — generations compressed or omitted by Scripture (marked "⋯" in ancestry paths)
  - `associated` — connected by land or nation only (e.g., Seir the Horite under Edom)

### 👑 Samuel & Kings (`/samuel-kings`)

The united monarchy and the divided kingdoms, from Saul to the exile.

- **Timeline** — all 42 rulers of the united kingdom, Israel, and Judah on parallel tracks, with reign dates following Thiele's chronology, faithfulness assessments, and the prophets who ministered alongside each king
- **Events** — 55 key events on a real-coordinate map of the ancient Near East with a scrubbing timeline
- **Relationships** — a graph of 175+ documented relationships (succession, marriage, alliance, betrayal, prophet-to-king), each with its scripture reference
- **Arcs** — influence arcs tracing the rise and fall of Saul, David, Solomon, Elijah, Elisha, Ahab, Hezekiah, and Josiah

### ✝️ Easter (`/easter`)

- **Passion Week** — the final week day by day, Palm Sunday through Resurrection Sunday, following the synoptic chronology with cross-references to all four Gospels
- **Prophecy Fulfilled** — 60+ Old Testament promises paired with their New Testament fulfillment, side by side with links to the full passages
- **Seven Last Words** — the sayings from the cross in canonical order, with context and meditations

## Data accuracy

Accuracy is a core goal of this project. The data files in `src/data/` are the heart of the app, and they are maintained under these rules:

- **Everything is verse-anchored.** Every person, event, and relationship carries the reference(s) it is drawn from, linked for independent verification.
- **Claims are typed honestly.** Marriages, royal succession, and compressed genealogies are modeled and displayed distinctly from literal parent–child descent.
- **Audited against the text.** The datasets have been checked entry-by-entry against Scripture, including an independent adversarial verification pass of every reference.
- **Interpretive choices are conventional and named.** Reign dates follow Thiele's chronology; the Passion Week ordering follows the standard synoptic harmonization; genealogical variants (Luke's Cainan, Arni/Admin, Shealtiel's two attested fathers, Zerubbabel via Shealtiel and Pedaiah) are all represented rather than flattened.
- **Verse texts are brief excerpts.** Quotations are abridged for display; the built-in links open the full passages.

Found an error? Please open an issue **with the scripture reference** — corrections are very welcome.

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev)
- [Cytoscape.js](https://js.cytoscape.org/) (with dagre/fcose layouts) for the genealogy tree and relationship graphs
- [Tailwind CSS 4](https://tailwindcss.com) for styling
- [React Router 7](https://reactrouter.com) for navigation
- [Fuse.js](https://www.fusejs.io/) for fuzzy person search

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run lint      # run eslint
npm run preview   # preview the production build
```

## Project structure

```
src/
├── data/                  # All biblical data (the heart of the app)
│   ├── genealogy.ts       # 486 people: 1 Chr 1–9, Matt 1, Luke 3
│   ├── relationships.ts   # Typed parent/spouse/succession/descendant edges
│   ├── tribes.ts          # Tribe metadata and chapter ranges
│   ├── samuel-kings/      # Kings, prophets, events, locations, arcs
│   └── easter/            # Passion week, prophecies, seven last words
├── pages/                 # Route-level pages (genealogy, samuel-kings, easter)
├── components/            # Tree canvas, timelines, maps, detail panels
├── utils/                 # Graph builders, BibleGateway link helpers
└── types/                 # Data model type definitions
```

## Deployment

The site deploys to Vercel as a static SPA (`vercel.json` rewrites all routes to `index.html` for client-side routing).
