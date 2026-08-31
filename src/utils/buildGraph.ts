import type { Person, Relationship } from '../types';
import { tribeColorMap } from './tribeColors';

export interface CytoscapeNode {
  data: {
    id: string;
    label: string;
    tribe: string;
    significance: string;
    description: string;
    chroniclesRef: string;
    crossReferences: string[];
    roles: string[];
    alternateNames: string[];
    gender: string;
    sources: string[];
    bgColor: string;
    borderColor: string;
  };
}

export interface CytoscapeEdge {
  data: {
    source: string;
    target: string;
    id: string;
    type: string;
  };
}

export type CytoscapeElement = CytoscapeNode | CytoscapeEdge;

export function buildGraph(persons: Person[], relationships: Relationship[]): CytoscapeElement[] {
  const personMap = new Map(persons.map(p => [p.id, p]));

  const nodes: CytoscapeNode[] = persons.map(p => {
    const tribe = p.tribe || 'pre-tribal';
    const colors = tribeColorMap[tribe] || tribeColorMap['pre-tribal'];
    return {
      data: {
        id: p.id,
        label: p.name,
        tribe,
        significance: p.significance,
        description: p.description || '',
        chroniclesRef: p.chroniclesRef,
        crossReferences: p.crossReferences || [],
        roles: p.roles || [],
        alternateNames: p.alternateNames || [],
        gender: p.gender || 'male',
        sources: p.sources || ['1chr'],
        bgColor: colors.bg,
        borderColor: colors.border,
      },
    };
  });

  const edges: CytoscapeEdge[] = relationships
    .filter(r => personMap.has(r.source) && personMap.has(r.target))
    .map((r, i) => ({
      data: {
        source: r.source,
        target: r.target,
        id: `e${i}`,
        type: r.type || 'parent',
      },
    }));

  return [...nodes, ...edges];
}
