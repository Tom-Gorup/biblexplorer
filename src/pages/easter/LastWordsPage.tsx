import { useState, useCallback } from 'react';
import { sevenLastWords } from '../../data/easter';
import type { LastWord } from '../../data/easter';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';

export default function LastWordsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = useCallback((w: LastWord) => {
    setSelectedId(prev => prev === w.id ? null : w.id);
  }, []);

  const selected = selectedId ? sevenLastWords.find(w => w.id === selectedId) || null : null;

  return (
    <div className="flex flex-col h-full bg-stone-950">
      <div className="flex flex-1 overflow-hidden">
        {/* ── Cards ──────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-white mb-1">The Final Words</h1>
            <p className="text-stone-500 text-sm mb-8">The seven final statements of Jesus from the cross — windows into the heart of God in humanity's darkest hour.</p>

            <div className="space-y-4">
              {sevenLastWords.map(w => {
                const isSel = selectedId === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => handleClick(w)}
                    className={`w-full text-left rounded-xl border transition-all ${
                      isSel ? 'border-stone-600 bg-stone-800/60 ring-1' : 'border-stone-800/60 bg-stone-900/40 hover:bg-stone-800/40 hover:border-stone-700'
                    }`}
                    style={isSel ? { boxShadow: `0 0 0 1px ${w.color}40` } : undefined}
                  >
                    {/* Number + Quote */}
                    <div className="px-5 py-5">
                      <div className="flex items-start gap-4">
                        {/* Number circle */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg font-bold border-2"
                          style={{ borderColor: w.color, color: w.color, backgroundColor: w.color + '10' }}
                        >
                          {w.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-lg md:text-xl font-serif italic leading-relaxed mb-2">
                            &ldquo;{w.word}&rdquo;
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono" style={{ color: w.color }}>{w.ref}</span>
                            <span className="text-stone-700">|</span>
                            <span className="text-stone-500 text-xs">{w.theme}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded content */}
                    {isSel && (
                      <div className="px-5 pb-5 border-t border-stone-700/50 pt-4">
                        <div className="ml-14">
                          {/* Context */}
                          <div className="mb-4">
                            <h3 className="text-stone-500 text-[10px] uppercase tracking-wider font-semibold mb-1.5">Context</h3>
                            <p className="text-stone-300 text-sm leading-relaxed">{w.context}</p>
                          </div>

                          {/* Meditation */}
                          <div className="mb-4">
                            <h3 className="text-stone-500 text-[10px] uppercase tracking-wider font-semibold mb-1.5">Meditation</h3>
                            <p className="text-stone-300 text-sm leading-relaxed">{w.meditation}</p>
                          </div>

                          {/* Scripture links */}
                          <div>
                            <h3 className="text-stone-500 text-[10px] uppercase tracking-wider font-semibold mb-1.5">Read in Scripture</h3>
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={toBibleGatewayUrl(w.ref)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
                              >
                                {w.ref}
                                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                              </a>
                              {w.crossRefs.map(ref => (
                                <a
                                  key={ref}
                                  href={toBibleGatewayUrl(ref)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className="text-xs font-mono px-2 py-0.5 bg-stone-800 text-stone-400 hover:text-white rounded transition-colors"
                                >
                                  {ref}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Closing reflection */}
            <div className="mt-8 mb-4 text-center">
              <p className="text-stone-600 text-xs italic">
                "When Jesus had received the sour wine, he said, 'It is finished,' and he bowed his head and gave up his spirit." — John 19:30
              </p>
            </div>
          </div>
        </div>

        {/* ── Sidebar ────────────────────────────────────── */}
        <div className="w-72 border-l border-stone-800 bg-stone-950/95 overflow-y-auto hidden md:block shrink-0">
          {selected ? (
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2"
                    style={{ borderColor: selected.color, color: selected.color, backgroundColor: selected.color + '10' }}>
                    {selected.number}
                  </span>
                  <span className="text-white font-semibold text-sm">{selected.theme}</span>
                </div>
                <button onClick={() => setSelectedId(null)} className="text-stone-500 hover:text-white p-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white text-sm font-serif italic leading-relaxed mb-3">
                &ldquo;{selected.word}&rdquo;
              </p>
              <p className="text-xs font-mono mb-4" style={{ color: selected.color }}>{selected.ref}</p>
              <p className="text-stone-400 text-xs leading-relaxed mb-4">{selected.meditation}</p>
              <div className="flex flex-wrap gap-1.5">
                {[selected.ref, ...selected.crossRefs].map(ref => (
                  <a key={ref} href={toBibleGatewayUrl(ref)} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-800 text-stone-400 hover:text-white rounded transition-colors">
                    {ref}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-white text-sm font-semibold mb-2">The Final Words</h3>
              <p className="text-stone-500 text-xs leading-relaxed mb-4">
                From the cross, Jesus spoke seven times. These final words reveal his heart for forgiveness, salvation, love, suffering, and ultimate triumph.
              </p>
              <p className="text-stone-500 text-xs leading-relaxed mb-4">
                Click each statement to read the context, a brief meditation, and cross-references to explore further.
              </p>
              <div className="mt-4 pt-4 border-t border-stone-800">
                <h4 className="text-stone-600 text-[10px] uppercase tracking-wider mb-2">The Seven Words</h4>
                <div className="space-y-2">
                  {sevenLastWords.map(w => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedId(w.id)}
                      className="flex items-center gap-2 w-full text-left hover:bg-stone-800/50 rounded px-1 py-0.5 transition-colors"
                    >
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold border shrink-0"
                        style={{ borderColor: w.color, color: w.color }}>
                        {w.number}
                      </span>
                      <span className="text-stone-400 text-[11px]">{w.theme}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
