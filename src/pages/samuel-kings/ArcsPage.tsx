import { useState, useMemo, useCallback, useRef } from 'react';
import { characterArcs } from '../../data/samuel-kings';
import { allKings, allSKCharacters } from '../../data/samuel-kings';
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

// ── SVG dimensions ──────────────────────────────────────────────
const CHART_PAD = { top: 30, right: 30, bottom: 50, left: 50 };
const CHART_W = 1000;
const CHART_H = 400;
const INNER_W = CHART_W - CHART_PAD.left - CHART_PAD.right;
const INNER_H = CHART_H - CHART_PAD.top - CHART_PAD.bottom;

// All arcs span from ~1050 BC to ~609 BC
const MIN_YEAR = 1060;
const MAX_YEAR = 600;

// yearToX is now dynamic (vYearToX) — responds to zoom state

function influenceToY(influence: number): number {
  return CHART_PAD.top + INNER_H - (influence / 100) * INNER_H;
}

// buildPath is now a hook (vBuildPath) that responds to zoom state

// Default selection: Saul + David (the most dramatic overlapping narrative)
const DEFAULT_SELECTED = new Set(['saul', 'david']);

// ── Component ───────────────────────────────────────────────────
export default function ArcsPage() {
  const [selected, setSelected] = useState<Set<string>>(DEFAULT_SELECTED);
  const [hoveredPoint, setHoveredPoint] = useState<{ point: ArcPoint; charId: string; color: string; x: number; y: number } | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<{ point: ArcPoint; charId: string; charName: string; color: string } | null>(null);
  const [crosshairX, setCrosshairX] = useState<number | null>(null);
  const [crosshairYear, setCrosshairYear] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Zoom: viewBox range on the X axis (year range visible)
  const [viewMinYear, setViewMinYear] = useState(MIN_YEAR);
  const [viewMaxYear, setViewMaxYear] = useState(MAX_YEAR);

  // Dynamic year-to-X based on current view
  const vYearToX = useCallback((year: number): number => {
    return CHART_PAD.left + ((viewMinYear - year) / (viewMinYear - viewMaxYear)) * INNER_W;
  }, [viewMinYear, viewMaxYear]);

  const vBuildPath = useCallback((points: ArcPoint[]): string => {
    if (points.length === 0) return '';
    const sorted = [...points].sort((a, b) => b.year - a.year);
    return sorted
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${vYearToX(p.year).toFixed(1)} ${influenceToY(p.influence).toFixed(1)}`)
      .join(' ');
  }, [vYearToX]);

  const handleChartMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const svgX = xPct * CHART_W;
    if (svgX < CHART_PAD.left || svgX > CHART_PAD.left + INNER_W) {
      setCrosshairX(null);
      setCrosshairYear(null);
      return;
    }
    const yearPct = (svgX - CHART_PAD.left) / INNER_W;
    const year = Math.round(viewMinYear - yearPct * (viewMinYear - viewMaxYear));
    setCrosshairX(svgX);
    setCrosshairYear(year);
  }, [viewMinYear, viewMaxYear]);

  const handleChartMouseLeave = useCallback(() => {
    setCrosshairX(null);
    setCrosshairYear(null);
  }, []);

  const handleChartWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1; // scroll down = zoom out, up = zoom in
    const totalSpan = viewMinYear - viewMaxYear;
    const center = (viewMinYear + viewMaxYear) / 2;
    const newSpan = Math.max(80, Math.min(MIN_YEAR - MAX_YEAR, totalSpan / factor));
    setViewMinYear(Math.min(MIN_YEAR, center + newSpan / 2));
    setViewMaxYear(Math.max(MAX_YEAR, center - newSpan / 2));
  }, [viewMinYear, viewMaxYear]);

  const handleResetZoom = useCallback(() => {
    setViewMinYear(MIN_YEAR);
    setViewMaxYear(MAX_YEAR);
  }, []);

  const charMap = useMemo(() => {
    const all = [...allKings, ...allSKCharacters];
    return new Map(all.map(c => [c.id, c]));
  }, []);

  const toggleChar = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const presets = useMemo(() => [
    { label: 'Saul & David', ids: ['saul', 'david'] },
    { label: 'United Monarchy', ids: ['saul', 'david', 'solomon'] },
    { label: 'Prophets', ids: ['elijah', 'elisha'] },
    { label: 'Ahab vs Elijah', ids: ['ahab-king', 'elijah'] },
    { label: 'Great Reformers', ids: ['hezekiah', 'josiah'] },
    { label: 'All', ids: ARC_CHARS.map(c => c.id) },
  ], []);

  // Year grid lines (dynamic based on zoom)
  const yearMarks = useMemo(() => {
    const span = viewMinYear - viewMaxYear;
    const step = span > 300 ? 50 : span > 150 ? 25 : 10;
    const marks = [];
    const start = Math.floor(viewMinYear / step) * step;
    for (let y = start; y >= viewMaxYear; y -= step) marks.push(y);
    return marks;
  }, []);

  return (
    <div className="flex flex-col h-full bg-stone-950">
      {/* ── Character selector ──────────────────────────── */}
      <div className="shrink-0 border-b border-stone-800 px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto">
          <button
            onClick={handleResetZoom}
            className="px-2 py-1 rounded text-[10px] font-mono text-stone-500 hover:text-stone-300 bg-stone-800 transition-colors shrink-0"
            title="Reset zoom"
          >
            Reset Zoom
          </button>
          <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider shrink-0">Presets:</span>
          {presets.map(p => (
            <button
              key={p.label}
              onClick={() => setSelected(new Set(p.ids))}
              className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors text-stone-400 hover:text-white hover:bg-white/10 border border-stone-700/40"
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2 overflow-x-auto">
          <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider shrink-0">Characters:</span>
          {ARC_CHARS.map(c => {
            const isOn = selected.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleChar(c.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isOn
                    ? 'border-2 text-white'
                    : 'border border-stone-700/40 text-stone-500 opacity-50 hover:opacity-80'
                }`}
                style={isOn ? { borderColor: c.color, backgroundColor: c.color + '15', color: c.color } : undefined}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color, opacity: isOn ? 1 : 0.4 }} />
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Chart ───────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative p-4">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            className="w-full h-full select-none"
            preserveAspectRatio="xMidYMid meet"
            onMouseMove={handleChartMouseMove}
            onMouseLeave={handleChartMouseLeave}
            onWheel={handleChartWheel}
          >
            {/* Background grid */}
            {yearMarks.map(y => (
              <g key={y}>
                <line
                  x1={vYearToX(y)} y1={CHART_PAD.top}
                  x2={vYearToX(y)} y2={CHART_PAD.top + INNER_H}
                  stroke="#292524" strokeWidth={1}
                />
                <text
                  x={vYearToX(y)} y={CHART_PAD.top + INNER_H + 18}
                  fill="#78716c" fontSize="10" textAnchor="middle" fontFamily="monospace"
                >
                  {y} BC
                </text>
              </g>
            ))}

            {/* Influence grid lines */}
            {[0, 25, 50, 75, 100].map(v => (
              <g key={v}>
                <line
                  x1={CHART_PAD.left} y1={influenceToY(v)}
                  x2={CHART_PAD.left + INNER_W} y2={influenceToY(v)}
                  stroke="#292524" strokeWidth={v === 0 ? 1.5 : 0.5}
                />
                <text
                  x={CHART_PAD.left - 8} y={influenceToY(v) + 3}
                  fill="#57534e" fontSize="9" textAnchor="end" fontFamily="monospace"
                >
                  {v}
                </text>
              </g>
            ))}

            {/* Y-axis label */}
            <text
              x={12} y={CHART_PAD.top + INNER_H / 2}
              fill="#57534e" fontSize="9" textAnchor="middle"
              transform={`rotate(-90, 12, ${CHART_PAD.top + INNER_H / 2})`}
            >
              Influence / Power
            </text>

            {/* Crosshair vertical line */}
            {crosshairX !== null && crosshairYear !== null && (
              <g style={{ pointerEvents: 'none' }}>
                <line
                  x1={crosshairX} y1={CHART_PAD.top}
                  x2={crosshairX} y2={CHART_PAD.top + INNER_H}
                  stroke="#f59e0b" strokeWidth={0.8} opacity={0.5}
                />
                <rect
                  x={crosshairX - 28} y={CHART_PAD.top - 16}
                  width={56} height={14} rx={4}
                  fill="#f59e0b" opacity={0.9}
                />
                <text
                  x={crosshairX} y={CHART_PAD.top - 6}
                  fill="#0c0a09" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="monospace"
                >
                  {crosshairYear} BC
                </text>
              </g>
            )}

            {/* Character arcs */}
            {ARC_CHARS.filter(c => selected.has(c.id)).map(c => {
              const points = characterArcs[c.id];
              if (!points || points.length === 0) return null;
              const path = vBuildPath(points);
              const sorted = [...points].sort((a, b) => b.year - a.year);

              return (
                <g key={c.id}>
                  {/* Gradient fill under the line */}
                  <path
                    d={path + ` L ${vYearToX(sorted[sorted.length - 1].year)} ${influenceToY(0)} L ${vYearToX(sorted[0].year)} ${influenceToY(0)} Z`}
                    fill={c.color}
                    opacity={0.06}
                  />
                  {/* Line */}
                  <path
                    d={path}
                    fill="none"
                    stroke={c.color}
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity={0.85}
                  />
                  {/* Data points */}
                  {sorted.map((p, i) => {
                    const px = vYearToX(p.year);
                    const py = influenceToY(p.influence);
                    const isHovered = hoveredPoint?.point === p;
                    const isSel = selectedPoint?.point === p;
                    return (
                      <g key={i}>
                        <circle
                          cx={px} cy={py} r={12}
                          fill="transparent"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredPoint({ point: p, charId: c.id, color: c.color, x: px, y: py })}
                          onMouseLeave={() => setHoveredPoint(null)}
                          onClick={() => setSelectedPoint(isSel ? null : { point: p, charId: c.id, charName: c.name, color: c.color })}
                        />
                        <circle
                          cx={px} cy={py}
                          r={isHovered || isSel ? 5 : 3.5}
                          fill={c.color}
                          stroke="#0c0a09"
                          strokeWidth={2}
                          style={{ pointerEvents: 'none' }}
                        />
                      </g>
                    );
                  })}
                  {/* Character name at the first point */}
                  <text
                    x={vYearToX(sorted[0].year) + 6}
                    y={influenceToY(sorted[0].influence) - 8}
                    fill={c.color}
                    fontSize="11"
                    fontWeight="700"
                  >
                    {c.name}
                  </text>
                </g>
              );
            })}

            {/* Tooltip */}
            {hoveredPoint && (
              <g style={{ pointerEvents: 'none' }}>
                <rect
                  x={hoveredPoint.x - 90}
                  y={hoveredPoint.y - 42}
                  width={180}
                  height={32}
                  rx={6}
                  fill="#1c1917"
                  stroke={hoveredPoint.color}
                  strokeWidth={1}
                  opacity={0.95}
                />
                <text
                  x={hoveredPoint.x}
                  y={hoveredPoint.y - 28}
                  fill="#fff"
                  fontSize="8"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {hoveredPoint.point.label.length > 35
                    ? hoveredPoint.point.label.slice(0, 33) + '…'
                    : hoveredPoint.point.label}
                </text>
                <text
                  x={hoveredPoint.x}
                  y={hoveredPoint.y - 17}
                  fill="#a8a29e"
                  fontSize="7"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  ~{hoveredPoint.point.year} BC · {hoveredPoint.point.ref}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* ── Side panel ─────────────────────────────────── */}
        <div className="w-72 border-l border-stone-800 bg-stone-950/95 overflow-y-auto hidden md:block shrink-0">
          {selectedPoint ? (
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-white font-bold text-base leading-tight">{selectedPoint.point.label}</h2>
                  <p className="text-xs mt-1" style={{ color: selectedPoint.color }}>{selectedPoint.charName} · ~{selectedPoint.point.year} BC</p>
                </div>
                <button onClick={() => setSelectedPoint(null)} className="text-stone-500 hover:text-white p-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 bg-stone-800 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${selectedPoint.point.influence}%`, backgroundColor: selectedPoint.color }} />
                </div>
                <span className="text-stone-400 text-xs font-mono">{selectedPoint.point.influence}/100</span>
              </div>
              {/* Character description */}
              {charMap.get(selectedPoint.charId) && (
                <p className="text-stone-400 text-xs leading-relaxed mb-3">
                  {charMap.get(selectedPoint.charId)!.description}
                </p>
              )}
              <a
                href={toBibleGatewayUrl(selectedPoint.point.ref)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
              >
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
                Each dot is a turning point. Hover to preview, click for details and a link to the scripture.
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
    </div>
  );
}
