import type { TribeId } from '../types';

export const tribeColorMap: Record<TribeId, { bg: string; border: string }> = {
  'pre-tribal': { bg: '#94a3b8', border: '#64748b' },
  judah:        { bg: '#facc15', border: '#ca8a04' },  // gold - royal
  levi:         { bg: '#a78bfa', border: '#7c3aed' },  // purple - priestly
  benjamin:     { bg: '#f97316', border: '#c2410c' },  // orange
  reuben:       { bg: '#ef4444', border: '#b91c1c' },  // red
  simeon:       { bg: '#f472b6', border: '#db2777' },  // pink
  gad:          { bg: '#34d399', border: '#059669' },  // emerald
  issachar:     { bg: '#2dd4bf', border: '#0d9488' },  // teal
  naphtali:     { bg: '#60a5fa', border: '#2563eb' },  // blue
  manasseh:     { bg: '#fb923c', border: '#ea580c' },  // amber
  ephraim:      { bg: '#a3e635', border: '#65a30d' },  // lime
  asher:        { bg: '#c084fc', border: '#9333ea' },  // violet
  dan:          { bg: '#38bdf8', border: '#0284c7' },  // sky
  zebulun:      { bg: '#4ade80', border: '#16a34a' },  // green
  edom:         { bg: '#d4a373', border: '#a3764f' },  // brown
  ishmael:      { bg: '#e9d5ff', border: '#c084fc' },  // lavender
};
