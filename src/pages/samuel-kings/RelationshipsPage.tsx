import { useState, useMemo, useCallback } from 'react';
import { allKings, allSKCharacters, allSKRelationships } from '../../data/samuel-kings';
import type { King } from '../../types/samuel-kings';
import { buildSKGraph } from '../../utils/buildSKGraph';
import { RelationshipCanvas } from '../../components/samuel-kings/relationships/RelationshipCanvas';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';
import type { SKRelationship } from '../../types/samuel-kings';

// ── Relationship type metadata ──────────────────────────────────
const REL_TYPES: { key: string; color: string; label: string; style?: string }[] = [
  { key: 'succession',      color: '#3b82f6', label: 'Succession' },
  { key: 'parent-child',    color: '#78716c', label: 'Parent-Child' },
  { key: 'anointing',       color: '#eab308', label: 'Anointing' },
  { key: 'prophet-to-king', color: '#a78bfa', label: 'Prophet \u2192 King', style: 'dotted' },
  { key: 'judgment',        color: '#7c3aed', label: 'Judgment' },
  { key: 'counsel',         color: '#60a5fa', label: 'Counsel', style: 'dotted' },
  { key: 'ally',            color: '#22c55e', label: 'Ally' },
  { key: 'treaty',          color: '#22d3ee', label: 'Treaty', style: 'dashed' },
  { key: 'enemy',           color: '#ef4444', label: 'Enemy', style: 'dashed' },
  { key: 'rebellion',       color: '#f97316', label: 'Rebellion', style: 'dashed' },
  { key: 'betrayal',        color: '#f97316', label: 'Betrayal', style: 'dashed' },
  { key: 'murder',          color: '#b91c1c', label: 'Murder', style: 'dotted' },
  { key: 'marriage',        color: '#f472b6', label: 'Marriage' },
];

// ── Presets: each maps to the set of types to HIDE ──────────────
const PRESETS: { key: string; label: string; description: string; hidden: Set<string> }[] = [
  { key: 'all', label: 'Show All', description: 'All relationships', hidden: new Set() },
  { key: 'political', label: 'Political Web', description: 'Alliances, enemies, treaties, rebellions',
    hidden: new Set(['parent-child', 'succession', 'prophet-to-king', 'anointing', 'judgment', 'counsel', 'marriage']) },
  { key: 'prophetic', label: 'Prophetic Ministry', description: 'Prophet interactions with kings',
    hidden: new Set(['parent-child', 'succession', 'ally', 'enemy', 'treaty', 'rebellion', 'murder', 'betrayal', 'marriage']) },
  { key: 'succession', label: 'Royal Succession', description: 'How power transferred between kings',
    hidden: new Set(['ally', 'enemy', 'treaty', 'prophet-to-king', 'anointing', 'judgment', 'counsel', 'rebellion', 'betrayal', 'marriage']) },
];

// ── Helpers ─────────────────────────────────────────────────────
const allChars = [...allKings, ...allSKCharacters];
const charMap = new Map(allChars.map(c => [c.id, c]));

// Build king lookup for date estimation
const kingMap = new Map<string, King>(allKings.map(k => [k.id, k]));

function estimateRelDate(rel: SKRelationship): number | null {
  // Use the later king's reign start as a rough date (when the interaction happened)
  const srcKing = kingMap.get(rel.source);
  const tgtKing = kingMap.get(rel.target);
  if (srcKing && tgtKing) {
    // Both are kings — use the later one's start (the one who came to power more recently)
    return Math.min(srcKing.reignStart, tgtKing.reignStart);
  }
  if (srcKing) return Math.round((srcKing.reignStart + srcKing.reignEnd) / 2);
  if (tgtKing) return Math.round((tgtKing.reignStart + tgtKing.reignEnd) / 2);
  return null;
}

type EnrichedRel = SKRelationship & { otherName: string; otherId: string; approxYear: number | null };

function getCharRelationships(charId: string): EnrichedRel[] {
  return allSKRelationships
    .filter(r => r.source === charId || r.target === charId)
    .map(r => {
      const otherId = r.source === charId ? r.target : r.source;
      return {
        ...r,
        otherId,
        otherName: charMap.get(otherId)?.name || otherId,
        approxYear: estimateRelDate(r),
      };
    })
    .sort((a, b) => {
      // Sort by date descending (higher BC number = earlier = first)
      if (a.approxYear && b.approxYear) return b.approxYear - a.approxYear;
      if (a.approxYear) return -1;
      if (b.approxYear) return 1;
      return 0;
    });
}

function getRelColor(type: string): string {
  return REL_TYPES.find(r => r.key === type)?.color || '#57534e';
}

function getRelLabel(type: string): string {
  return REL_TYPES.find(r => r.key === type)?.label || type;
}

// ── Component ───────────────────────────────────────────────────
export default function RelationshipsPage() {
  const [selectedId, setSelectedIdRaw] = useState<string | null>(null);
  const setSelectedId = useCallback((id: string | null) => {
    setSelectedIdRaw(prev => id !== null && prev === id ? null : id);
  }, []);
  const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(new Set());
  const [legendOpen, setLegendOpen] = useState(false);

  const elements = useMemo(
    () => buildSKGraph(allKings, allSKCharacters, allSKRelationships),
    []
  );

  const selectedChar = useMemo(() => {
    if (!selectedId) return null;
    return charMap.get(selectedId) || null;
  }, [selectedId]);

  const selectedRels = useMemo(() => {
    if (!selectedId) return [];
    return getCharRelationships(selectedId);
  }, [selectedId]);

  const toggleType = useCallback((type: string) => {
    setHiddenTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }, []);

  const applyPreset = useCallback((hidden: Set<string>) => {
    setHiddenTypes(new Set(hidden));
  }, []);

  return (
    <div className="flex flex-col h-full bg-stone-900">
      {/* ── Preset toolbar ─────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-stone-700/60 overflow-x-auto shrink-0">
        <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider shrink-0">View:</span>
        {PRESETS.map(p => (
          <button
            key={p.key}
            onClick={() => applyPreset(p.hidden)}
            title={p.description}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              // "active" when current hidden matches this preset
              hiddenTypes.size === p.hidden.size && [...p.hidden].every(t => hiddenTypes.has(t))
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                : 'text-stone-400 hover:text-white hover:bg-white/10 border border-stone-700/40'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* ── Canvas ──────────────────────────────────────── */}
        <div className="flex-1 relative">
          <RelationshipCanvas
            elements={elements}
            selectedId={selectedId}
            onSelectCharacter={setSelectedId}
            hiddenTypes={hiddenTypes}
          />

          {/* ── Floating legend toggle ─────────────────────── */}
          <div className="absolute bottom-4 left-4 z-10">
            <button
              onClick={() => setLegendOpen(o => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800/90 backdrop-blur border border-stone-700 rounded-lg text-stone-400 hover:text-white transition-colors text-xs font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
              Legend
            </button>

            {legendOpen && (
              <div className="absolute bottom-10 left-0 bg-stone-800/95 backdrop-blur-xl border border-stone-700 rounded-xl shadow-2xl p-3 w-56">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-stone-500 text-[10px] font-semibold uppercase tracking-wider">Edge Types</h4>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setHiddenTypes(new Set(REL_TYPES.map(r => r.key)))}
                      className="text-[10px] text-stone-500 hover:text-stone-300 transition-colors"
                    >
                      None
                    </button>
                    <span className="text-stone-700 text-[10px]">|</span>
                    <button
                      onClick={() => setHiddenTypes(new Set())}
                      className="text-[10px] text-stone-500 hover:text-stone-300 transition-colors"
                    >
                      All
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  {REL_TYPES.map(rt => {
                    const isHidden = hiddenTypes.has(rt.key);
                    return (
                      <button
                        key={rt.key}
                        onClick={() => toggleType(rt.key)}
                        className={`flex items-center gap-2 w-full px-1.5 py-1 rounded text-xs transition-colors ${
                          isHidden ? 'opacity-30 hover:opacity-60' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="w-5 flex items-center">
                          <div
                            className="w-full h-0.5 rounded"
                            style={{
                              backgroundColor: rt.color,
                              borderTop: rt.style === 'dashed' ? `2px dashed ${rt.color}` : rt.style === 'dotted' ? `2px dotted ${rt.color}` : undefined,
                              height: rt.style ? 0 : 2,
                            }}
                          />
                        </div>
                        <span className="text-stone-300">{rt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Side panel (desktop) ────────────────────────── */}
        <div className="w-72 border-l border-stone-700 bg-stone-900/95 overflow-y-auto hidden md:block shrink-0">
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
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-700 text-stone-300 capitalize mb-3">
                {selectedChar.role.replace(/-/g, ' ')}
              </span>
              <p className="text-stone-300 text-sm leading-relaxed mb-3">{selectedChar.description}</p>
              <a
                href={toBibleGatewayUrl(selectedChar.primaryRef)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors mb-4"
              >
                {selectedChar.primaryRef}
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>

              {/* Chronological story */}
              {selectedRels.length > 0 && (
                <div>
                  <h3 className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-2">Story</h3>
                  <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[5px] top-2 bottom-2 w-px bg-stone-700" />
                    <div className="space-y-0.5">
                      {selectedRels.map((rel, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedId(rel.otherId)}
                          className="w-full text-left flex items-start gap-3 pl-0 pr-1 py-1.5 rounded hover:bg-stone-700/50 transition-colors relative"
                        >
                          {/* Timeline dot */}
                          <span
                            className="mt-1.5 w-[11px] h-[11px] rounded-full shrink-0 border-2 border-stone-800 z-[1]"
                            style={{ backgroundColor: getRelColor(rel.type) }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              {rel.approxYear && (
                                <span className="text-stone-600 text-[10px] font-mono w-10 shrink-0">~{rel.approxYear}</span>
                              )}
                              <span
                                className="text-[10px] px-1 py-px rounded font-medium"
                                style={{ backgroundColor: getRelColor(rel.type) + '22', color: getRelColor(rel.type) }}
                              >
                                {getRelLabel(rel.type)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-white text-xs font-medium">{rel.otherName}</span>
                            </div>
                            {rel.description && (
                              <p className="text-stone-500 text-[11px] leading-snug">{rel.description}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-stone-400 text-sm font-semibold mb-2">Character Relationship Web</h3>
              <p className="text-stone-500 text-xs leading-relaxed mb-4">
                Explore the political, prophetic, and personal connections between characters in Samuel &amp; Kings.
                Use the presets above to focus on specific relationship types.
              </p>
              <h4 className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-2">What to explore</h4>
              <ul className="space-y-2 text-stone-400 text-xs">
                <li><span className="text-blue-400 font-semibold">Royal Succession</span> — Trace how power transferred, often through violence</li>
                <li><span className="text-violet-400 font-semibold">Prophetic Ministry</span> — See which prophets confronted which kings</li>
                <li><span className="text-green-400 font-semibold">Political Web</span> — Alliances, enemies, and the betrayals between</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-stone-700">
                <p className="text-stone-600 text-xs">Tap a character for details. Scroll to zoom. Use presets to filter.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile detail panel (bottom) ─────────────────── */}
      {selectedChar && (
        <div className="md:hidden bg-stone-800 border-t border-stone-600 p-4 max-h-[40vh] overflow-y-auto shrink-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-white font-bold text-lg">{selectedChar.name}</h2>
              <span className="text-xs text-stone-400 capitalize">{selectedChar.role.replace(/-/g, ' ')}</span>
            </div>
            <button onClick={() => setSelectedId(null)} className="text-stone-500 hover:text-white p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-stone-300 text-sm mb-2">{selectedChar.description}</p>
          {selectedRels.length > 0 && (
            <div className="space-y-1">
              {selectedRels.slice(0, 8).map((rel, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedId(rel.otherId)}
                  className="flex items-center gap-2 w-full text-left px-1 py-0.5 rounded hover:bg-stone-700/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: getRelColor(rel.type) }} />
                  {rel.approxYear && <span className="text-stone-600 text-[10px] font-mono">~{rel.approxYear}</span>}
                  <span className="text-white text-[11px]">{rel.otherName}</span>
                  <span className="text-stone-600 text-[10px]">{getRelLabel(rel.type)}</span>
                </button>
              ))}
              {selectedRels.length > 8 && <span className="text-stone-500 text-[10px]">+{selectedRels.length - 8} more</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
