import { useState, useMemo, useCallback } from 'react';
import { allProphecies } from '../../data/easter';
import type { Prophecy } from '../../data/easter';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';

const CATEGORIES: { key: string; label: string; color: string }[] = [
  { key: 'all', label: 'All', color: '#d4d4d8' },
  { key: 'birth', label: 'Birth', color: '#facc15' },
  { key: 'ministry', label: 'Ministry', color: '#3b82f6' },
  { key: 'passion', label: 'Passion', color: '#f97316' },
  { key: 'death', label: 'Death', color: '#ef4444' },
  { key: 'resurrection', label: 'Resurrection', color: '#22c55e' },
  { key: 'nature', label: 'Nature of Christ', color: '#a78bfa' },
];

export default function ProphecyPage() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return allProphecies;
    return allProphecies.filter(p => p.category === filter);
  }, [filter]);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    return allProphecies.find(p => p.id === selectedId) || null;
  }, [selectedId]);

  const handleClick = useCallback((p: Prophecy) => {
    setSelectedId(prev => prev === p.id ? null : p.id);
  }, []);

  const getCatColor = (cat: string) => CATEGORIES.find(c => c.key === cat)?.color || '#666';

  return (
    <div className="flex flex-col h-full bg-stone-950">
      {/* Filter bar */}
      <div className="shrink-0 border-b border-stone-800 px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider shrink-0">Filter:</span>
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filter === c.key
                  ? 'text-white border-2'
                  : 'text-stone-400 hover:text-white hover:bg-white/10 border border-stone-700/40'
              }`}
              style={filter === c.key ? { borderColor: c.color, backgroundColor: c.color + '15', color: c.color } : undefined}
            >
              {c.label}
            </button>
          ))}
          <span className="text-stone-600 text-xs ml-2 shrink-0">{filtered.length} prophecies</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Prophecy list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-1">Prophecy Fulfilled</h1>
            <p className="text-stone-500 text-sm mb-6">Old Testament promises, New Testament fulfillment — centuries of prophecy converging on one person.</p>

            <div className="space-y-3">
              {filtered.map(p => {
                const isSel = selectedId === p.id;
                const catColor = getCatColor(p.category);
                return (
                  <button
                    key={p.id}
                    onClick={() => handleClick(p)}
                    className={`w-full text-left rounded-xl border transition-all ${
                      isSel ? 'border-stone-600 bg-stone-800/80 ring-1 ring-stone-600' : 'border-stone-800 bg-stone-900/50 hover:bg-stone-800/50 hover:border-stone-700'
                    }`}
                  >
                    <div className="px-4 py-2.5 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: catColor }} />
                      <span className="text-white font-semibold text-sm flex-1">{p.title}</span>
                      <span className="text-stone-600 text-[10px] uppercase tracking-wider">{p.category}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-stone-800">
                      <div className="px-4 py-3 md:border-r border-stone-800">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-stone-600 font-semibold">Old Testament</span>
                          <span className="text-xs font-mono text-amber-500/80">{p.otRef}</span>
                        </div>
                        <p className="text-stone-300 text-sm italic leading-relaxed">&ldquo;{p.otText}&rdquo;</p>
                        <p className="text-stone-600 text-[10px] mt-1">{p.otBook}</p>
                      </div>
                      <div className="px-4 py-3 border-t md:border-t-0 border-stone-800">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-stone-600 font-semibold">New Testament</span>
                          <span className="text-xs font-mono text-blue-400/80">{p.ntRef}</span>
                        </div>
                        <p className="text-stone-300 text-sm italic leading-relaxed">&ldquo;{p.ntText}&rdquo;</p>
                      </div>
                    </div>

                    {isSel && (
                      <div className="px-4 py-3 border-t border-stone-700 bg-stone-800/40">
                        <p className="text-stone-300 text-sm leading-relaxed mb-3">{p.description}</p>
                        <div className="flex gap-2">
                          <a href={toBibleGatewayUrl(p.otRef)} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-colors">
                            {p.otRef}
                            <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                          <a href={toBibleGatewayUrl(p.ntRef)} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors">
                            {p.ntRef}
                            <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 border-l border-stone-800 bg-stone-950/95 overflow-y-auto hidden md:block shrink-0">
          {selected ? (
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-white font-bold text-base leading-tight">{selected.title}</h2>
                <button onClick={() => setSelectedId(null)} className="text-stone-500 hover:text-white p-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3"
                style={{ backgroundColor: getCatColor(selected.category) + '22', color: getCatColor(selected.category) }}>
                {selected.category}
              </span>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">{selected.description}</p>
              <div className="space-y-3">
                <div>
                  <h3 className="text-stone-500 text-[10px] uppercase tracking-wider mb-1">Old Testament</h3>
                  <p className="text-amber-400/80 text-xs font-mono mb-1">{selected.otRef}</p>
                  <p className="text-stone-400 text-xs italic">&ldquo;{selected.otText}&rdquo;</p>
                </div>
                <div>
                  <h3 className="text-stone-500 text-[10px] uppercase tracking-wider mb-1">New Testament</h3>
                  <p className="text-blue-400/80 text-xs font-mono mb-1">{selected.ntRef}</p>
                  <p className="text-stone-400 text-xs italic">&ldquo;{selected.ntText}&rdquo;</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <a href={toBibleGatewayUrl(selected.otRef)} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-colors">
                  Read OT
                </a>
                <a href={toBibleGatewayUrl(selected.ntRef)} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors">
                  Read NT
                </a>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-white text-sm font-semibold mb-2">Prophecy Fulfilled</h3>
              <p className="text-stone-500 text-xs leading-relaxed mb-4">
                Centuries before Jesus was born, the Old Testament painted a detailed portrait of the Messiah. Every prophecy here was written hundreds of years before its fulfillment.
              </p>
              <p className="text-stone-500 text-xs leading-relaxed mb-4">
                Click any prophecy to see the OT promise alongside its NT fulfillment, with links to read the full passages.
              </p>
              <div className="mt-4 pt-4 border-t border-stone-800">
                <h4 className="text-stone-600 text-[10px] uppercase tracking-wider mb-2">By category</h4>
                {CATEGORIES.filter(c => c.key !== 'all').map(c => {
                  const count = allProphecies.filter(p => p.category === c.key).length;
                  return (
                    <div key={c.key} className="flex items-center justify-between py-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                        <span className="text-stone-400 text-xs">{c.label}</span>
                      </div>
                      <span className="text-stone-600 text-xs font-mono">{count}</span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-stone-800">
                  <span className="text-stone-300 text-xs font-semibold">Total</span>
                  <span className="text-stone-300 text-xs font-mono font-semibold">{allProphecies.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
