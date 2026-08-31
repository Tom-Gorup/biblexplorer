## What does this PR change?

<!-- Brief description. If it fixes an issue, reference it: "Fixes #12" -->

## Scripture verification

<!-- Required for any change to files in src/data/ -->

- **Passage(s) supporting this change:**
- **What the data said before, and why it was wrong or incomplete:**

## Checklist

- [ ] Every changed or added claim carries a scripture reference (`primaryRef` / `crossReferences` / `ref`)
- [ ] Relationship edges use the correct `type` — marriages, royal succession, and compressed genealogies are **not** modeled as literal parent → child (see CONTRIBUTING.md)
- [ ] Verse references were checked against the actual text (not from memory)
- [ ] `npm run build` passes (type-check + build)
- [ ] For genealogy/samuel-kings data: no broken IDs (every edge endpoint, participant, and location resolves to a defined entry)
