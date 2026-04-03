import { useState, useMemo } from 'react';
import { allKings } from '../../data/samuel-kings';
import type { King } from '../../types/samuel-kings';
import { assessmentColors, kingdomColors, kingdomLabel } from '../../utils/kingdomColors';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';

const TIMELINE_START = 1055;
const TIMELINE_END = 555;
const PX_PER_YEAR = 8;
const TOTAL_WIDTH = (TIMELINE_START - TIMELINE_END) * PX_PER_YEAR;
const LANE_H = 72;

function yearToX(year: number) { return (TIMELINE_START - year) * PX_PER_YEAR; }

const ASSESSMENT_LABELS: Record<string, string> = { good: 'Faithful', evil: 'Unfaithful', mixed: 'Mixed' };

export default function TimelinePage() {
  const [selected, setSelected] = useState<King | null>(null);

  const lanes = useMemo(() => ([
    { key: 'united' as const, kings: allKings.filter(k => k.kingdom === 'united') },
    { key: 'israel' as const, kings: allKings.filter(k => k.kingdom === 'israel') },
    { key: 'judah' as const, kings: allKings.filter(k => k.kingdom === 'judah') },
  ]), []);

  const yearMarkers = useMemo(() => {
    const marks = [];
    for (let y = 1050; y >= 560; y -= 50) marks.push(y);
    return marks;
  }, []);

  return (
    <div className="flex flex-col h-full bg-stone-900">
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <div style={{ width: TOTAL_WIDTH + 120 }} className="relative px-14 pt-6 pb-12 min-h-full">
          {/* Year grid lines */}
          {yearMarkers.map(y => (
            <div key={y} className="absolute top-0 bottom-0 border-l border-stone-700/30" style={{ left: yearToX(y) + 56 }}>
              <span className="absolute -bottom-6 -translate-x-1/2 text-[10px] text-stone-500 font-mono">{y} BC</span>
            </div>
          ))}

          {/* Swim lanes */}
          {lanes.map(lane => {
            const kc = kingdomColors[lane.key];
            return (
              <div key={lane.key} className="mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: kc.border }} />
                  <span className="text-xs font-semibold text-stone-300">{kingdomLabel[lane.key]}</span>
                  <span className="text-[10px] text-stone-600">{lane.kings.length} kings</span>
                </div>
                <div
                  className="relative rounded-lg border"
                  style={{ height: LANE_H, backgroundColor: kc.bg + '0a', borderColor: kc.border + '20' }}
                >
                  {lane.kings.map(king => {
                    const left = yearToX(king.reignStart);
                    const width = Math.max(king.reignYears * PX_PER_YEAR, 18);
                    const ac = assessmentColors[king.assessment];
                    const isSel = selected?.id === king.id;

                    return (
                      <div
                        key={king.id}
                        onClick={() => setSelected(king)}
                        title={`${king.name} (${king.reignStart}–${king.reignEnd} BC) · ${ASSESSMENT_LABELS[king.assessment]}`}
                        className={`absolute top-1.5 cursor-pointer rounded transition-all border ${
                          isSel ? 'ring-2 ring-white/80 z-10 brightness-125' : 'hover:brightness-125 hover:z-10'
                        }`}
                        style={{
                          left,
                          width,
                          height: LANE_H - 12,
                          backgroundColor: ac.bg + '99',
                          borderColor: ac.border + '80',
                        }}
                      >
                        <span
                          className="absolute inset-0 flex items-center px-1 text-[10px] font-semibold truncate"
                          style={{ color: ac.text || ac.border }}
                        >
                          {width > 50 ? king.name : width > 25 ? king.name.slice(0, 3) : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="flex gap-4 mt-4">
            {Object.entries(assessmentColors).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className="w-3.5 h-3 rounded" style={{ backgroundColor: val.bg, border: `1px solid ${val.border}` }} />
                <span className="text-[10px] text-stone-400">{ASSESSMENT_LABELS[key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="bg-stone-800 border-t border-stone-600 p-4 max-h-[45vh] overflow-y-auto shrink-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">{selected.name}</h2>
              {selected.alternateNames && selected.alternateNames.length > 0 && (
                <p className="text-stone-400 text-xs">Also: {selected.alternateNames.join(', ')}</p>
              )}
            </div>
            <button onClick={() => setSelected(null)} className="text-stone-500 hover:text-white p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: kingdomColors[selected.kingdom].bg + '66', color: kingdomColors[selected.kingdom].border }}>
              {kingdomLabel[selected.kingdom]}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: assessmentColors[selected.assessment].bg + '66', color: assessmentColors[selected.assessment].border }}>
              {ASSESSMENT_LABELS[selected.assessment]}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs text-stone-400 bg-stone-700">
              {selected.reignStart}–{selected.reignEnd} BC ({selected.reignYears} yr{selected.reignYears !== 1 ? 's' : ''})
            </span>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed mb-3">{selected.description}</p>
          <p className="text-stone-500 text-xs mb-3">Reign ended: {selected.endOfReign}</p>
          {selected.contemporaryProphets && selected.contemporaryProphets.length > 0 && (
            <p className="text-stone-400 text-xs mb-3">Prophets: {selected.contemporaryProphets.join(', ')}</p>
          )}
          <a
            href={toBibleGatewayUrl(selected.primaryRef)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
          >
            {selected.primaryRef}
            <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
