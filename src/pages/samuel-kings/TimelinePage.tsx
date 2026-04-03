import { useState, useMemo, useCallback } from 'react';
import { allKings } from '../../data/samuel-kings';
import type { King } from '../../types/samuel-kings';
import { assessmentColors, kingdomColors, kingdomLabel } from '../../utils/kingdomColors';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';

// ── Timeline constants ──────────────────────────────────────────
const TIMELINE_START = 1075;
const TIMELINE_END = 555;
const PX_PER_YEAR = 8;
const TOTAL_WIDTH = (TIMELINE_START - TIMELINE_END) * PX_PER_YEAR;
const BAR_H = 28;          // height of each king bar
const ROW_GAP = 4;         // gap between stacked rows within a lane
const LANE_PAD_Y = 8;      // top/bottom padding inside a lane

function yearToX(year: number) { return (TIMELINE_START - year) * PX_PER_YEAR; }

const ASSESSMENT_LABELS: Record<string, string> = { good: 'Faithful', evil: 'Unfaithful', mixed: 'Mixed' };

// ── Prophet data ────────────────────────────────────────────────
interface Prophet {
  id: string;
  name: string;
  start: number;
  end: number;
  message: string;
  ref: string;
}

const PROPHETS: Prophet[] = [
  { id: 'samuel',   name: 'Samuel',   start: 1070, end: 1020, message: 'Obedience is better than sacrifice',                           ref: '1 Sam 15:22' },
  { id: 'nathan',   name: 'Nathan',   start: 1010, end: 970,  message: 'Confronted David, promised eternal dynasty',                    ref: '2 Sam 7:12-16' },
  { id: 'elijah',   name: 'Elijah',   start: 870,  end: 850,  message: '"The LORD, He is God!" — confronted Baal worship',              ref: '1 Kgs 18:39' },
  { id: 'elisha',   name: 'Elisha',   start: 850,  end: 800,  message: 'Miracles demonstrating God\'s power and compassion',            ref: '2 Kgs 2-8' },
  { id: 'amos',     name: 'Amos',     start: 760,  end: 750,  message: 'Social justice, judgment on Israel\'s oppression',              ref: 'Amos 5:24' },
  { id: 'hosea',    name: 'Hosea',    start: 750,  end: 715,  message: 'God\'s faithful love despite Israel\'s unfaithfulness',         ref: 'Hosea 2:19-20' },
  { id: 'isaiah',   name: 'Isaiah',   start: 740,  end: 680,  message: 'Messianic prophecies, trust in God alone',                     ref: 'Isa 7:14; 9:6-7' },
  { id: 'micah',    name: 'Micah',    start: 735,  end: 700,  message: 'Justice, mercy, walk humbly with God',                         ref: 'Micah 6:8' },
  { id: 'huldah',   name: 'Huldah',   start: 622,  end: 622,  message: 'Confirmed the Book of the Law for Josiah',                     ref: '2 Kgs 22:14-20' },
  { id: 'jeremiah', name: 'Jeremiah', start: 627,  end: 586,  message: 'New covenant coming, judgment on unfaithful Judah',             ref: 'Jer 31:31-34' },
];

// ── Overlap detection: pack items into stacked rows ─────────────
function packIntoRows<T extends { reignStart: number; reignEnd: number }>(items: T[]): T[][] {
  const sorted = [...items].sort((a, b) => b.reignStart - a.reignStart); // earliest first in BC
  const rows: T[][] = [];
  for (const item of sorted) {
    let placed = false;
    for (const row of rows) {
      const overlaps = row.some(existing => {
        const aStart = existing.reignStart;
        const aEnd = existing.reignEnd;
        const bStart = item.reignStart;
        const bEnd = item.reignEnd;
        // Overlap: ranges intersect (touching endpoints don't count)
        return bStart > aEnd && bEnd < aStart;
      });
      if (!overlaps) {
        row.push(item);
        placed = true;
        break;
      }
    }
    if (!placed) {
      rows.push([item]);
    }
  }
  return rows;
}

function packProphetsIntoRows(items: Prophet[]): Prophet[][] {
  const sorted = [...items].sort((a, b) => b.start - a.start);
  const rows: Prophet[][] = [];
  for (const item of sorted) {
    let placed = false;
    for (const row of rows) {
      const overlaps = row.some(existing => {
        return item.start > existing.end && item.end < existing.start;
      });
      if (!overlaps) {
        row.push(item);
        placed = true;
        break;
      }
    }
    if (!placed) {
      rows.push([item]);
    }
  }
  return rows;
}

// ── Component ───────────────────────────────────────────────────
export default function TimelinePage() {
  const [selected, setSelected] = useState<King | null>(null);
  const [selectedProphet, setSelectedProphet] = useState<Prophet | null>(null);

  const lanes = useMemo(() => {
    const raw = [
      { key: 'united' as const, kings: allKings.filter(k => k.kingdom === 'united') },
      { key: 'israel' as const, kings: allKings.filter(k => k.kingdom === 'israel') },
      { key: 'judah' as const, kings: allKings.filter(k => k.kingdom === 'judah') },
    ];
    return raw.map(lane => ({
      ...lane,
      rows: packIntoRows(lane.kings),
    }));
  }, []);

  const prophetRows = useMemo(() => packProphetsIntoRows(PROPHETS), []);
  const prophetLaneH = prophetRows.length * (BAR_H + ROW_GAP) + LANE_PAD_Y * 2;

  const yearMarkers = useMemo(() => {
    const marks = [];
    for (let y = 1050; y >= 560; y -= 50) marks.push(y);
    return marks;
  }, []);

  const handleKingClick = useCallback((king: King) => {
    setSelected(king);
    setSelectedProphet(null);
  }, []);

  const handleProphetClick = useCallback((prophet: Prophet) => {
    setSelectedProphet(prophet);
    setSelected(null);
  }, []);

  return (
    <div className="flex flex-col h-full bg-stone-900">
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <div style={{ width: TOTAL_WIDTH + 120 }} className="relative px-14 pt-6 pb-20 min-h-full">

          {/* ── Year grid lines ─────────────────────────────── */}
          {yearMarkers.map(y => (
            <div
              key={y}
              className="absolute top-0 border-l border-stone-700/30"
              style={{ left: yearToX(y) + 56, bottom: 0 }}
            />
          ))}

          {/* ── Swim lanes (kings) ─────────────────────────── */}
          {lanes.map(lane => {
            const kc = kingdomColors[lane.key];
            const laneH = lane.rows.length * (BAR_H + ROW_GAP) + LANE_PAD_Y * 2;
            return (
              <div key={lane.key} className="mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: kc.border }} />
                  <span className="text-xs font-semibold text-stone-300">{kingdomLabel[lane.key]}</span>
                  <span className="text-[10px] text-stone-600">{lane.kings.length} kings</span>
                </div>
                <div
                  className="relative rounded-lg border"
                  style={{ height: laneH, backgroundColor: kc.bg + '0a', borderColor: kc.border + '20' }}
                >
                  {lane.rows.map((row, rowIdx) =>
                    row.map(king => {
                      const left = yearToX(king.reignStart);
                      const width = Math.max(king.reignYears * PX_PER_YEAR, 18);
                      const top = LANE_PAD_Y + rowIdx * (BAR_H + ROW_GAP);
                      const ac = assessmentColors[king.assessment];
                      const isSel = selected?.id === king.id;

                      return (
                        <div
                          key={king.id}
                          onClick={() => handleKingClick(king)}
                          title={`${king.name} (${king.reignStart}\u2013${king.reignEnd} BC) \u00B7 ${ASSESSMENT_LABELS[king.assessment]}`}
                          className={`absolute cursor-pointer rounded transition-all border ${
                            isSel ? 'ring-2 ring-white/80 z-10 brightness-125' : 'hover:brightness-125 hover:z-10'
                          }`}
                          style={{
                            left,
                            top,
                            width,
                            height: BAR_H,
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
                    })
                  )}
                </div>
              </div>
            );
          })}

          {/* ── Prophets lane ──────────────────────────────── */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-3 h-3 rounded-full shrink-0 bg-violet-500" />
              <span className="text-xs font-semibold text-stone-300">Prophets</span>
              <span className="text-[10px] text-stone-600">{PROPHETS.length} prophets</span>
            </div>
            <div
              className="relative rounded-lg border"
              style={{ height: prophetLaneH, backgroundColor: '#6d28d90a', borderColor: '#8b5cf620' }}
            >
              {prophetRows.map((row, rowIdx) =>
                row.map(prophet => {
                  const left = yearToX(prophet.start);
                  const span = Math.max(prophet.start - prophet.end, 1);
                  const width = Math.max(span * PX_PER_YEAR, 18);
                  const top = LANE_PAD_Y + rowIdx * (BAR_H + ROW_GAP);
                  const isSel = selectedProphet?.id === prophet.id;

                  return (
                    <div
                      key={prophet.id}
                      onClick={() => handleProphetClick(prophet)}
                      title={`${prophet.name} (~${prophet.start}\u2013${prophet.end} BC)`}
                      className={`absolute cursor-pointer rounded transition-all border flex items-center gap-1 px-1.5 ${
                        isSel ? 'ring-2 ring-white/80 z-10 brightness-125' : 'hover:brightness-125 hover:z-10'
                      }`}
                      style={{
                        left,
                        top,
                        width,
                        height: BAR_H,
                        backgroundColor: '#7c3aed44',
                        borderColor: '#8b5cf680',
                      }}
                    >
                      {/* Diamond marker */}
                      <span
                        className="w-2.5 h-2.5 shrink-0 rotate-45"
                        style={{ backgroundColor: '#a78bfa', border: '1px solid #c4b5fd' }}
                      />
                      <span className="text-[10px] font-semibold text-violet-300 truncate">
                        {width > 40 ? prophet.name : width > 22 ? prophet.name.slice(0, 3) : ''}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ── Year axis (bottom) ─────────────────────────── */}
          <div className="relative h-8 mt-2 border-t border-stone-600">
            {yearMarkers.map(y => (
              <div
                key={y}
                className="absolute top-0 flex flex-col items-center"
                style={{ left: yearToX(y) }}
              >
                <div className="w-px h-3 bg-stone-500" />
                <span className="text-xs font-mono text-stone-300 mt-0.5 -translate-x-1/2 whitespace-nowrap">
                  {y} BC
                </span>
              </div>
            ))}
          </div>

          {/* ── Legend ──────────────────────────────────────── */}
          <div className="flex flex-wrap gap-4 mt-6">
            {Object.entries(assessmentColors).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className="w-3.5 h-3 rounded" style={{ backgroundColor: val.bg, border: `1px solid ${val.border}` }} />
                <span className="text-[10px] text-stone-400">{ASSESSMENT_LABELS[key]}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rotate-45" style={{ backgroundColor: '#a78bfa', border: '1px solid #c4b5fd' }} />
              <span className="text-[10px] text-stone-400">Prophet</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── King detail panel ────────────────────────────── */}
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
              {selected.reignStart}\u2013{selected.reignEnd} BC ({selected.reignYears} yr{selected.reignYears !== 1 ? 's' : ''})
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

      {/* ── Prophet detail panel ─────────────────────────── */}
      {selectedProphet && (
        <div className="bg-stone-800 border-t border-stone-600 p-4 max-h-[45vh] overflow-y-auto shrink-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rotate-45 shrink-0" style={{ backgroundColor: '#a78bfa', border: '1px solid #c4b5fd' }} />
              <h2 className="text-white font-bold text-lg leading-tight">{selectedProphet.name}</h2>
            </div>
            <button onClick={() => setSelectedProphet(null)} className="text-stone-500 hover:text-white p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400">
              Prophet
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs text-stone-400 bg-stone-700">
              ~{selectedProphet.start}\u2013{selectedProphet.end} BC
            </span>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed mb-3">{selectedProphet.message}</p>
          <a
            href={toBibleGatewayUrl(selectedProphet.ref)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20 transition-colors"
          >
            {selectedProphet.ref}
            <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
