export const LAYOUT_OPTIONS = {
  name: 'dagre' as const,
  rankDir: 'TB',
  nodeSep: 60,
  rankSep: 90,
  edgeSep: 20,
  animate: false,
  fit: true,
  padding: 50,
};

export const ZOOM_LIMITS = {
  min: 0.05,
  max: 3,
};

export const LABEL_ZOOM_THRESHOLDS = {
  minor: 0.6,
  notable: 0.2,
  major: 0,
};
