import { useState, useMemo, useCallback, useRef } from 'react';
import { characterArcs } from '../../data/samuel-kings';
import type { ArcPoint } from '../../types/samuel-kings';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';

// ── Character metadata ──────────────────────────────────────────
const ARC_CHARS: { id: string; name: string; color: string }[] = [
  { id: 'saul',       name: 'Saul',      color: '#f59e0b' },
  { id: 'david',      name: 'David',     color: '#22c55e' },
  { id: 'solomon',    name: 'Solomon',   color: '#3b82f6' },
  { id: 'elijah',     name: 'Elijah',    color: '#a78bfa' },
  { id: 'elisha',     name: 'Elisha',    color: '#38bdf8' },
  { id: 'ahab-king',  name: 'Ahab',      color: '#ef4444' },
  { id: 'hezekiah',   name: 'Hezekiah',  color: '#14b8a6' },
  { id: 'josiah',     name: 'Josiah',    color: '#f472b6' },
];

const PRESETS: { label: string; ids: string[] }[] = [
  { label: 'Saul & David', ids: ['saul', 'david'] },
  { label: 'United Monarchy', ids: ['saul', 'david', 'solomon'] },
  { label: 'Prophets', ids: ['elijah', 'elisha'] },
  { label: 'Ahab vs Elijah', ids: ['ahab-king', 'elijah'] },
  { label: 'Great Reformers', ids: ['hezekiah', 'josiah'] },
  { label: 'All', ids: ARC_CHARS.map(c => c.id) },
];

// ── Chart constants ─────────────────────────────────────────────
const PAD = { left: 55, right: 30, top: 25, bottom: 45 };
const CHART_H = 450;
const MIN_YEAR = 1060;
const MAX_YEAR = 600;
const TOTAL_YEARS = MIN_YEAR - MAX_YEAR; // 460
const DEFAULT_PPY = 3;
const MIN_PPY = 2;
const MAX_PPY = 12;

function yearToX(year: number, ppy: number): number {
  return PAD.left + (MIN_YEAR - year) * ppy;
}

function influenceToY(influence: number): number {
  const innerH = CHART_H - PAD.top - PAD.bottom;
  return PAD.top + innerH - (influence / 100) * innerH;
}

function buildPath(points: ArcPoint[], ppy: number): string {
  const sorted = [...points].sort((a, b) => b.year - a.year);
  return sorted.map((p, i) => `${i === 0 ? 'M' : 'L'} ${yearToX(p.year, ppy)} ${influenceToY(p.influence)}`).join(' ');
}

// ── Component ───────────────────────────────────────────────────
export default function ArcsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['saul', 'david']));
  const [ppy, setPpy] = useState(DEFAULT_PPY);
  const [selectedPoint, setSelectedPoint] = useState<{ point: ArcPoint; charId: string; charName: string; color: string } | null>(null);
  const [crosshairX, setCrosshairX] = useState<number | null>(null);
  const [crosshairYear, setCrosshairYear] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const svgWidth = PAD.left + TOTAL_YEARS * ppy + PAD.right;

  // Year grid marks
  const yearMarks = useMemo(() => {
    const span = TOTAL_YEARS;
    const step = span * ppy > 2000 ? 25 : 50;
    const marks = [];
    const start = Math.floor(MIN_YEAR / step) * step;
    for (let y = start; y >= MAX_YEAR; y -= step) marks.push(y);
    return marks;
  }, [ppy]);

  const toggleChar = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const svg = e.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    if (svgX < PAD.left || svgX > svgWidth - PAD.right) {
      setCrosshairX(null); setCrosshairYear(null); return;
    }
    const year = Math.round(MIN_YEAR - (svgX - PAD.left) / ppy);
    setCrosshairX(svgX);
    setCrosshairYear(year);
  }, [svgWidth, ppy]);

  const handleMouseLeave = useCallback(() => { setCrosshairX(null); setCrosshairYear(null); }, []);

  return (
    <div className="flex flex-col h-full bg-stone-950">
      {/* ── Controls ─────────────────────────────────────── */}
      <div className="shrink-0 border-b border-stone-800 px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto mb-2">
          <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider shrink-0">Presets:</span>
          {PRESETS.map(p => (
            <button key={p.label}
              onClick={() => setSelected(new Set(p.ids))}
              className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors text-stone-400 hover:text-white hover:bg-white/10 border border-stone-700/40">
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider shrink-0">Characters:</span>
          {ARC_CHARS.map(c => {
            const isOn = selected.has(c.id);
            return (
              <button key={c.id} onClick={() => toggleChar(c.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isOn ? 'border-2 text-white' : 'border border-stone-700/40 text-stone-500 opacity-50 hover:opacity-80'
                }`}
                style={isOn ? { borderColor: c.color, backgroundColor: c.color + '15', color: c.color } : undefined}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color, opacity: isOn ? 1 : 0.4 }} />
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main area ────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Chart scroll container */}
        <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-auto">
          <svg
            width={svgWidth}
            height={CHART_H}
            viewBox={`0 0 ${svgWidth} ${CHART_H}`}
            className="select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'crosshair' }}
          >
            {/* Year grid */}
            {yearMarks.map(y => {
              const x = yearToX(y, ppy);
              return (
                <g key={y}>
                  <line x1={x} y1={PAD.top} x2={x} y2={CHART_H - PAD.bottom} stroke="#292524" strokeWidth={1} />
                  <text x={x} y={CHART_H - PAD.bottom + 20} fill="#a8a29e" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="500">
                    {y} BC
                  </text>
                </g>
              );
            })}

            {/* Influence grid */}
            {[0, 25, 50, 75, 100].map(v => (
              <g key={v}>
                <line x1={PAD.left} y1={influenceToY(v)} x2={svgWidth - PAD.right} y2={influenceToY(v)} stroke="#292524" strokeWidth={v === 0 ? 1.5 : 0.5} />
                <text x={PAD.left - 8} y={influenceToY(v) + 4} fill="#57534e" fontSize="10" textAnchor="end" fontFamily="monospace">{v}</text>
              </g>
            ))}

            {/* Y-axis label */}
            <text x={14} y={(PAD.top + CHART_H - PAD.bottom) / 2} fill="#57534e" fontSize="10" textAnchor="middle" transform={`rotate(-90, 14, ${(PAD.top + CHART_H - PAD.bottom) / 2})`}>
              Influence / Power
            </text>

            {/* Crosshair */}
            {crosshairX !== null && crosshairYear !== null && (
              <g style={{ pointerEvents: 'none' }}>
                <line x1={crosshairX} y1={PAD.top} x2={crosshairX} y2={CHART_H - PAD.bottom} stroke="#f59e0b" strokeWidth={0.8} opacity={0.5} />
                <rect x={crosshairX - 30} y={PAD.top - 18} width={60} height={16} rx={4} fill="#f59e0b" opacity={0.9} />
                <text x={crosshairX} y={PAD.top - 7} fill="#0c0a09" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="monospace">
                  {crosshairYear} BC
                </text>
              </g>
            )}

            {/* Character arcs */}
            {ARC_CHARS.filter(c => selected.has(c.id)).map(c => {
              const points = characterArcs[c.id];
              if (!points || points.length === 0) return null;
              const path = buildPath(points, ppy);
              const sorted = [...points].sort((a, b) => b.year - a.year);

              return (
                <g key={c.id}>
                  {/* Fill under line */}
                  <path
                    d={path + ` L ${yearToX(sorted[sorted.length - 1].year, ppy)} ${influenceToY(0)} L ${yearToX(sorted[0].year, ppy)} ${influenceToY(0)} Z`}
                    fill={c.color} opacity={0.06}
                  />
                  {/* Line */}
                  <path d={path} fill="none" stroke={c.color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />
                  {/* Dots */}
                  {sorted.map((p, i) => {
                    const px = yearToX(p.year, ppy);
                    const py = influenceToY(p.influence);
                    const isSel = selectedPoint?.point === p;
                    return (
                      <g key={i}>
                        <circle cx={px} cy={py} r={14} fill="transparent" style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedPoint(isSel ? null : { point: p, charId: c.id, charName: c.name, color: c.color })} />
                        <circle cx={px} cy={py} r={isSel ? 5 : 3.5} fill={c.color} stroke="#0c0a09" strokeWidth={2} style={{ pointerEvents: 'none' }} />
                      </g>
                    );
                  })}
                  {/* Character name at start */}
                  <text x={yearToX(sorted[0].year, ppy) + 8} y={influenceToY(sorted[0].influence) - 10} fill={c.color} fontSize="13" fontWeight="700">
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── Sidebar ────────────────────────────────────── */}
        <div className="w-72 border-l border-stone-800 bg-stone-950/95 overflow-y-auto hidden md:block shrink-0">
          {selectedPoint ? (
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-white font-bold text-base leading-tight">{selectedPoint.point.label}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedPoint.color }} />
                    <span className="text-xs" style={{ color: selectedPoint.color }}>{selectedPoint.charName}</span>
                    <span className="text-stone-500 text-xs font-mono">~{selectedPoint.point.year} BC</span>
                  </div>
                </div>
                <button onClick={() => setSelectedPoint(null)} className="text-stone-500 hover:text-white p-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-stone-800 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${selectedPoint.point.influence}%`, backgroundColor: selectedPoint.color }} />
                </div>
                <span className="text-stone-400 text-xs font-mono">{selectedPoint.point.influence}/100</span>
              </div>
              <a href={toBibleGatewayUrl(selectedPoint.point.ref)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors">
                {selectedPoint.point.ref}
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-white text-sm font-semibold mb-2">Rise &amp; Fall</h3>
              <p className="text-stone-500 text-xs leading-relaxed mb-4">
                Watch the trajectories of biblical characters — their rise to power, moments of faith and failure, and how their stories ended.
              </p>
              <p className="text-stone-500 text-xs leading-relaxed mb-4">
                Each dot is a turning point. Hover to preview, click for details and a link to the scripture. Scroll to see more of the timeline.
              </p>
              <h4 className="text-stone-600 text-[10px] uppercase tracking-wider mb-2">What to look for</h4>
              <ul className="space-y-2 text-stone-400 text-xs">
                <li><span className="text-amber-400 font-semibold">Saul &amp; David</span> — Watch Saul's decline cross David's rise. The moment the Spirit departs Saul is the moment David is anointed.</li>
                <li><span className="text-violet-400 font-semibold">Elijah</span> — The dramatic drop from Carmel's peak to Horeb's despair happens in days. Then God speaks in a still small voice.</li>
                <li><span className="text-blue-400 font-semibold">Solomon</span> — A perfect parabola of wisdom, glory, and tragic decline into idolatry.</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-stone-800">
                <p className="text-stone-600 text-xs">Use presets or toggle characters above. Hover dots for events.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Zoom controls ────────────────────────────────── */}
      <div className="shrink-0 bg-stone-950 border-t border-stone-800 px-4 py-2 flex items-center gap-3">
        <button onClick={() => setPpy(p => Math.max(MIN_PPY, p - 1))} className="p-1.5 bg-stone-800 rounded-lg text-stone-400 hover:text-white transition-colors" title="Zoom out">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35M8 11h6" />
          </svg>
        </button>
        <span className="text-stone-500 text-xs font-mono w-6 text-center">{ppy}x</span>
        <button onClick={() => setPpy(p => Math.min(MAX_PPY, p + 1))} className="p-1.5 bg-stone-800 rounded-lg text-stone-400 hover:text-white transition-colors" title="Zoom in">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35M8 11h6M11 8v6" />
          </svg>
        </button>
        <span className="text-stone-600 text-[10px] ml-2">Scroll to explore the timeline</span>
      </div>
    </div>
  );
}
