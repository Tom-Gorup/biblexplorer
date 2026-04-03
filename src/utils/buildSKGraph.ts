import type { King, SKCharacter, SKRelationship } from '../types/samuel-kings';
import { kingdomColors } from './kingdomColors';

const roleColors: Record<string, { bg: string; border: string }> = {
  king:          { bg: '#facc15', border: '#ca8a04' },
  prophet:       { bg: '#a78bfa', border: '#7c3aed' },
  priest:        { bg: '#60a5fa', border: '#2563eb' },
  military:      { bg: '#f87171', border: '#dc2626' },
  queen:         { bg: '#f472b6', border: '#db2777' },
  official:      { bg: '#34d399', border: '#059669' },
  'foreign-king': { bg: '#94a3b8', border: '#64748b' },
};

const roleShapes: Record<string, string> = {
  king: 'roundrectangle',
  prophet: 'diamond',
  priest: 'ellipse',
  military: 'hexagon',
  queen: 'diamond',
  official: 'ellipse',
  'foreign-king': 'rectangle',
};

export function buildSKGraph(kings: King[], characters: SKCharacter[], relationships: SKRelationship[]) {
  const allChars = [...kings, ...characters];
  const idSet = new Set(allChars.map(c => c.id));

  const nodes = allChars.map(c => {
    const isKing = 'reignStart' in c;
    const colors = isKing && c.kingdom ? kingdomColors[c.kingdom] : roleColors[c.role] || roleColors.official;
    return {
      data: {
        id: c.id,
        label: c.name,
        role: c.role,
        kingdom: c.kingdom || '',
        significance: c.significance,
        description: c.description,
        primaryRef: c.primaryRef,
        shape: roleShapes[c.role] || 'ellipse',
        bgColor: colors.bg,
        borderColor: colors.border,
      },
    };
  });

  const edges = relationships
    .filter(r => idSet.has(r.source) && idSet.has(r.target))
    .map((r, i) => ({
      data: {
        id: `sk-e${i}`,
        source: r.source,
        target: r.target,
        relType: r.type,
        description: r.description || '',
      },
    }));

  return [...nodes, ...edges];
}
