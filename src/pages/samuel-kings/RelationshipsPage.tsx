import { useState, useMemo } from 'react';
import { allKings, allSKCharacters, allSKRelationships } from '../../data/samuel-kings';
import { buildSKGraph } from '../../utils/buildSKGraph';
import { RelationshipCanvas } from '../../components/samuel-kings/relationships/RelationshipCanvas';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';

const REL_TYPE_COLORS: Record<string, { color: string; label: string }> = {
  ally: { color: '#22c55e', label: 'Ally' },
  enemy: { color: '#ef4444', label: 'Enemy' },
  marriage: { color: '#f472b6', label: 'Marriage' },
  'parent-child': { color: '#78716c', label: 'Parent-Child' },
  succession: { color: '#3b82f6', label: 'Succession' },
  'prophet-to-king': { color: '#a78bfa', label: 'Prophet → King' },
  betrayal: { color: '#f97316', label: 'Betrayal' },
  murder: { color: '#b91c1c', label: 'Murder' },
  counsel: { color: '#60a5fa', label: 'Counsel' },
  judgment: { color: '#7c3aed', label: 'Judgment' },
  anointing: { color: '#eab308', label: 'Anointing' },
  rebellion: { color: '#f97316', label: 'Rebellion' },
  treaty: { color: '#22d3ee', label: 'Treaty' },
};

export default function RelationshipsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const elements = useMemo(
    () => buildSKGraph(allKings, allSKCharacters, allSKRelationships),
    []
  );

  const selectedChar = useMemo(() => {
    if (!selectedId) return null;
    return [...allKings, ...allSKCharacters].find(c => c.id === selectedId) || null;
  }, [selectedId]);

  return (
    <div className="flex h-full bg-stone-900">
      <div className="flex-1 relative">
        <RelationshipCanvas
          elements={elements}
          selectedId={selectedId}
          onSelectCharacter={setSelectedId}
        />
      </div>

      {/* Side panel / legend */}
      <div className="w-64 border-l border-stone-700 bg-stone-900/95 overflow-y-auto hidden md:block shrink-0">
        {selectedChar ? (
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-white font-bold text-lg leading-tight">{selectedChar.name}</h2>
              <button onClick={() => setSelectedId(null)} className="text-stone-500 hover:text-white p-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-700 text-stone-300 capitalize mb-2">
              {selectedChar.role.replace(/-/g, ' ')}
            </span>
            <p className="text-stone-300 text-sm leading-relaxed mb-3">{selectedChar.description}</p>
            <a
              href={toBibleGatewayUrl(selectedChar.primaryRef)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
            >
              {selectedChar.primaryRef}
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        ) : (
          <div className="p-4">
            <h3 className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-3">Relationship Types</h3>
            <div className="space-y-1.5">
              {Object.entries(REL_TYPE_COLORS).map(([key, { color, label }]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-5 h-0.5 rounded" style={{ backgroundColor: color }} />
                  <span className="text-stone-400 text-xs">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-stone-700">
              <p className="text-stone-600 text-xs">Tap a character to see details. Pinch or scroll to zoom.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
