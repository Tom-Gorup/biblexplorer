# Contributing to BibleXplorer

Thank you for helping make this tool more accurate and more useful. Accuracy is the core value of this project: **we would rather show less than show something Scripture doesn't say.** Every contribution — a one-line issue or a full pull request — is welcome.

## Reporting an inaccuracy

The fastest way to help: [open an inaccuracy report](https://github.com/Tom-Gorup/biblexplorer/issues/new?template=inaccuracy-report.yml).

A great report has three parts:

1. **What the app says** — the name, date, relationship, or description you believe is wrong.
2. **What Scripture says** — the correct fact.
3. **The reference** — book, chapter, and verse(s) that establish it.

Reports without a reference are still welcome, but verse-anchored reports can be verified and fixed much faster.

## Fixing it yourself (pull requests)

All of the app's content lives in plain TypeScript data files — no database, no CMS. Fixing an error is usually a one-line edit:

```
src/data/
├── genealogy.ts        # 486 people (1 Chr 1–9, Matt 1, Luke 3)
├── relationships.ts    # typed edges between people
├── tribes.ts
├── samuel-kings/       # kings.ts, characters.ts, events.ts,
│                       # relationships.ts, locations.ts, arcs.ts
└── easter/             # passion-week.ts, prophecies.ts, last-words.ts
```

**Workflow:**

1. Fork the repo and create a branch.
2. Make your change in `src/data/`.
3. Verify every claim against the actual biblical text — please don't rely on memory. The app links to BibleGateway; check the exact verses you cite.
4. Run `npm run build` (this type-checks and builds).
5. Open a PR using the template — it asks for the passage(s) supporting your change.

### Data conventions (please read before editing)

These rules exist so the visualizations never claim more than the text does:

- **Everything is verse-anchored.** Every person, event, and relationship carries the reference(s) it is drawn from (`primaryRef`, `crossReferences`, `chroniclesRef`, or `ref` depending on the file). If you add a claim, add its reference.
- **Genealogy relationships are typed** (`src/data/relationships.ts`):
  - `parent` (default) — literal parent → child only
  - `spouse` — marriage/union; never used as a blood line
  - `succession` — rulers who followed one another without being father and son (e.g., Edom's kings, Gen 36:31–39)
  - `descendant` — an ancestor → descendant link where Scripture omits or compresses the generations between (e.g., Kohath → Heman)
  - `associated` — connection by land or nation only, no blood tie (e.g., Esau → Seir the Horite)

  If you're adding a link and the text doesn't explicitly say "X fathered Y," it should probably not be a `parent` edge.
- **Chronology follows Thiele.** Reign dates in `samuel-kings/kings.ts` use Thiele's chronology (co-regencies included). If you propose different dates, make the case in the PR rather than silently mixing systems.
- **Harmonizations are named, not silent.** Where the Gospels or Chronicles/Kings differ (Passion Week ordering, Zerubbabel's father, Luke's Cainan), we represent the variants or note the choice in the description — we don't flatten them.
- **Interpretive claims are hedged.** Typology and traditional identifications are described as such ("Matthew connects…", "traditionally identified with…"), not stated as bare fact.
- **IDs must resolve.** Every relationship endpoint, event participant, contemporary-king/prophet ID, and event location must match a defined entry. `npm run build` catches type errors, but ID typos are strings — double-check them (or run a quick script over the data; PRs adding a proper validation test are very welcome!).

### What makes a change easy to merge

- One logical fix per PR
- The supporting passage quoted or cited in the PR description
- References checked against the text itself
- No claim added without a reference

## Beyond data fixes

Code contributions (UI, performance, accessibility, a data-validation test suite) and new content areas (more books, more visualizations) are welcome too — open an issue first for anything large so we can align on approach.

## Licensing of contributions

The project is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE.md) — free for any noncommercial use. By submitting a pull request, you agree that your contribution is licensed under the same terms (the standard "inbound = outbound" model).

## Tone of the project

This is a study tool meant to serve anyone exploring Scripture. Descriptions aim to be faithful to the text, charitable across traditions, and clear about the difference between what the text says and how it has been interpreted.
