// Cytoscape's TS types are notoriously mismatched; using any[] here.
// Each entry uses `as any` on the style object for the same reason.
export const cytoscapeStyles: any[] = [
  // Base node style
  {
    selector: 'node',
    style: {
      'label': 'data(label)',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 8,
      'font-size': 11,
      'font-family': 'system-ui, -apple-system, sans-serif',
      'color': '#e2e8f0',
      'text-background-color': '#1c1c22',
      'text-background-opacity': 0.85,
      'text-background-padding': '2px',
      'text-background-shape': 'roundrectangle',
      'background-color': 'data(bgColor)',
      'border-color': 'data(borderColor)',
      'border-width': 2,
      'width': 30,
      'height': 30,
      'shape': 'ellipse',
      'overlay-padding': 6,
      'transition-property': 'background-color, border-color, width, height, opacity',
      'transition-duration': 200,
    } as any,
  },
  // Major figures — larger
  {
    selector: 'node[significance="major"]',
    style: {
      'width': 55,
      'height': 55,
      'font-size': 14,
      'font-weight': 700,
      'border-width': 3,
    } as any,
  },
  // Notable figures — medium
  {
    selector: 'node[significance="notable"]',
    style: {
      'width': 40,
      'height': 40,
      'font-size': 12,
      'font-weight': 600,
      'border-width': 2.5,
    } as any,
  },
  // Minor figures — small
  {
    selector: 'node[significance="minor"]',
    style: {
      'width': 24,
      'height': 24,
      'font-size': 9,
      'border-width': 1.5,
    } as any,
  },
  // Female nodes — diamond shape
  {
    selector: 'node[gender="female"]',
    style: {
      'shape': 'diamond',
    } as any,
  },
  // Edge style
  {
    selector: 'edge',
    style: {
      'width': 1.5,
      'line-color': '#94a3b8',
      'target-arrow-color': '#94a3b8',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'arrow-scale': 0.8,
      'opacity': 0.6,
      'transition-property': 'opacity, line-color',
      'transition-duration': 200,
    } as any,
  },
  // Marriage — dashed pink, no arrow (not a descent line)
  {
    selector: 'edge[type="spouse"]',
    style: {
      'line-style': 'dashed',
      'line-color': '#ec4899',
      'target-arrow-shape': 'none',
      'opacity': 0.45,
    } as any,
  },
  // Royal succession (Edom's kings) — dotted amber, not father-son
  {
    selector: 'edge[type="succession"]',
    style: {
      'line-style': 'dotted',
      'line-color': '#f59e0b',
      'target-arrow-color': '#f59e0b',
      'opacity': 0.5,
    } as any,
  },
  // Compressed descent — dashed (generations omitted between the two)
  {
    selector: 'edge[type="descendant"]',
    style: {
      'line-style': 'dashed',
      'opacity': 0.45,
    } as any,
  },
  // Association by land/nation only (no blood line)
  {
    selector: 'edge[type="associated"]',
    style: {
      'line-style': 'dotted',
      'target-arrow-shape': 'none',
      'opacity': 0.3,
    } as any,
  },
  // Selected node
  {
    selector: 'node:selected',
    style: {
      'border-color': '#3b82f6',
      'border-width': 4,
      'overlay-color': '#3b82f6',
      'overlay-opacity': 0.15,
    } as any,
  },
  // Highlighted (search result)
  {
    selector: 'node.highlighted',
    style: {
      'border-color': '#3b82f6',
      'border-width': 4,
      'overlay-color': '#3b82f6',
      'overlay-opacity': 0.2,
      'z-index': 999,
    } as any,
  },
  // Hidden by source filter
  {
    selector: 'node.source-hidden',
    style: {
      'display': 'none',
    } as any,
  },
  {
    selector: 'edge.source-hidden',
    style: {
      'display': 'none',
    } as any,
  },
  // Hidden by significance filter
  {
    selector: 'node.sig-hidden',
    style: {
      'display': 'none',
    } as any,
  },
  {
    selector: 'edge.sig-hidden',
    style: {
      'display': 'none',
    } as any,
  },
  // Dimmed (when filtering by tribe)
  {
    selector: 'node.dimmed',
    style: {
      'opacity': 0.15,
    } as any,
  },
  {
    selector: 'edge.dimmed',
    style: {
      'opacity': 0.05,
    } as any,
  },
  // Active tribe highlight
  {
    selector: 'node.tribe-active',
    style: {
      'opacity': 1,
      'z-index': 10,
    } as any,
  },
  {
    selector: 'edge.tribe-active',
    style: {
      'opacity': 0.8,
      'z-index': 10,
    } as any,
  },
  // Notable women of Christ's lineage highlight
  {
    selector: 'node.women-lineage',
    style: {
      'border-color': '#ec4899',
      'border-width': 4,
      'overlay-color': '#ec4899',
      'overlay-opacity': 0.15,
      'z-index': 999,
    } as any,
  },
];
