import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { characterArcs } from '../../data/samuel-kings';
// allKings, allSKCharacters available via data/samuel-kings if needed
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
const CHART_PAD = { top: 25, right: 20, bottom: 45, left: 55 };

// All arcs span from ~1050 BC to ~609 BC
const MIN_YEAR = 1060;
const MAX_YEAR = 600;

// yearToX is now dynamic (vYearToX) — responds to zoom state

// influenceToY is now inside the component (depends on dynamic INNER_H)

// buildPath is now a hook (vBuildPath) that responds to zoom state

// Default selection: Saul + David (the most dramatic overlapping narrative)
const DEFAULT_SELECTED = new Set(['saul', 'david']);

// ── Component ───────────────────────────────────────────────────
export default function ArcsPage() {
  const [selected, setSelected] = useState<Set<string>>(DEFAULT_SELECTED);
  const [hoveredPoint, setHoveredPoint] = useState<{ point: ArcPoint; charId: string; color: string; x: number; y: number } | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<{ point: ArcPoint; charId: string; charName: string; color: string } | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [crosshairX, setCrosshairX] = useState<number | null>(null);
  const [crosshairYear, setCrosshairYear] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 1200, h: 500 });

  // Track container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setContainerSize({ w: width, h: height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Dynamic chart dimensions matching container
  const CHART_W = containerSize.w;
  const CHART_H = containerSize.h;
  const INNER_W = CHART_W - CHART_PAD.left - CHART_PAD.right;
  const INNER_H = CHART_H - CHART_PAD.top - CHART_PAD.bottom;

  const influenceToY = useCallback((influence: number): number => {
    return CHART_PAD.top + INNER_H - (influence / 100) * INNER_H;
  }, [INNER_H]);

  // Auto-fit view to selected characters' date range
  const autoFitRange = useMemo(() => {
    let earliest = MAX_YEAR;
    let latest = MIN_YEAR;
    for (const c of ARC_CHARS) {
      if (!selected.has(c.id)) continue;
      const pts = characterArcs[c.id];
      if (!pts || pts.length === 0) continue;
      for (const p of pts) {
        if (p.year > latest) latest = p.year;
        if (p.year < earliest) earliest = p.year;
      }
    }
    // Add padding (10% on each side)
    const span = latest - earliest || 100;
    const pad = Math.max(20, span * 0.12);
    return { min: Math.min(MIN_YEAR, latest + pad), max: Math.max(MAX_YEAR, earliest - pad) };
  }, [selected]);

  // Zoom: viewBox range on the X axis (year range visible)
  const [viewMinYear, setViewMinYear] = useState(() => {
    // Initialize to Saul+David range
    let latest = 0, earliest = 9999;
    for (const id of DEFAULT_SELECTED) {
      const pts = characterArcs[id];
      if (!pts) continue;
      for (const p of pts) { if (p.year > latest) latest = p.year; if (p.year < earliest) earliest = p.year; }
    }
    return latest + 15;
  });
  const [viewMaxYear, setViewMaxYear] = useState(() => {
    let earliest = 9999;
    for (const id of DEFAULT_SELECTED) {
      const pts = characterArcs[id];
      if (!pts) continue;
      for (const p of pts) { if (p.year < earliest) earliest = p.year; }
    }
    return earliest - 15;
  });

  // Auto-fit when selection changes
  useEffect(() => {
    setViewMinYear(autoFitRange.min);
    setViewMaxYear(autoFitRange.max);
  }, [autoFitRange]);

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
  }, [vYearToX, influenceToY]);

  // Mouse move + drag handled by handleMouseMoveDrag

  const handleChartMouseLeave = useCallback(() => {
    setCrosshairX(null);
    setCrosshairYear(null);
    dragRef.current = null;
  }, []);

  // Drag to pan
  const dragRef = useRef<{ startX: number; startMin: number; startMax: number } | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragRef.current = { startX: e.clientX, startMin: viewMinYear, startMax: viewMaxYear };
  }, [viewMinYear, viewMaxYear]);

  const handleMouseMoveDrag = useCallback((e: React.MouseEvent) => {
    // Always update crosshair
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const svgX = xPct * CHART_W;
    if (svgX >= CHART_PAD.left && svgX <= CHART_PAD.left + INNER_W) {
      const yearPct = (svgX - CHART_PAD.left) / INNER_W;
      const year = Math.round(viewMinYear - yearPct * (viewMinYear - viewMaxYear));
      setCrosshairX(svgX);
      setCrosshairYear(year);
    } else {
      setCrosshairX(null);
      setCrosshairYear(null);
    }

    // Handle drag pan
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const yearPerPx = (dragRef.current.startMin - dragRef.current.startMax) / rect.width;
    const yearShift = dx * yearPerPx;
    const newMin = dragRef.current.startMin + yearShift;
    const newMax = dragRef.current.startMax + yearShift;
    // Clamp to valid range
    if (newMin <= MIN_YEAR && newMax >= MAX_YEAR) {
      setViewMinYear(newMin);
      setViewMaxYear(newMax);
    }
  }, [CHART_W, INNER_W, viewMinYear, viewMaxYear]);

  const handleMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const handleChartWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;

    // Find what year the mouse is pointing at
    const rect = svg.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const svgX = xPct * CHART_W;
    const yearPct = Math.max(0, Math.min(1, (svgX - CHART_PAD.left) / INNER_W));
    const mouseYear = viewMinYear - yearPct * (viewMinYear - viewMaxYear);

    // Zoom toward the mouse position
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    const totalSpan = viewMinYear - viewMaxYear;
    const newSpan = Math.max(50, Math.min(MIN_YEAR - MAX_YEAR, totalSpan / factor));

    // Keep the mouse year at the same screen position
    const newMin = mouseYear + yearPct * newSpan;
    const newMax = mouseYear - (1 - yearPct) * newSpan;

    setViewMinYear(Math.min(MIN_YEAR, Math.max(newMin, newSpan + MAX_YEAR)));
    setViewMaxYear(Math.max(MAX_YEAR, Math.min(newMax, MIN_YEAR - newSpan)));
  }, [viewMinYear, viewMaxYear]);

  const handleResetZoom = useCallback(() => {
    setViewMinYear(MIN_YEAR);
    setViewMaxYear(MAX_YEAR);
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
    const step = span > 300 ? 50 : span > 80 ? 25 : span > 40 ? 10 : 5;
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

      {/* ── Chart (full width) ─────────────────────────── */}
      <div ref={containerRef} className="flex-1 overflow-hidden relative">
          {/* Intro overlay */}
          {showIntro && !selectedPoint && (
            <div className="absolute top-4 right-4 z-20 w-72 bg-stone-900/95 backdrop-blur-xl border border-stone-700/80 rounded-xl shadow-2xl p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white text-sm font-semibold">Rise &amp; Fall</h3>
                <button onClick={() => setShowIntro(false)} className="text-stone-500 hover:text-white p-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed mb-3">
                Each dot is a turning point. Hover to preview, click for details and a link to the scripture. Scroll to zoom, drag to pan.
              </p>
              <h4 className="text-stone-500 text-[10px] uppercase tracking-wider mb-1.5">What to look for</h4>
              <ul className="space-y-1.5 text-xs">
                <li><span className="text-amber-400 font-semibold">Saul &amp; David</span> <span className="text-stone-500">— Watch Saul's decline cross David's rise</span></li>
                <li><span className="text-violet-400 font-semibold">Elijah</span> <span className="text-stone-500">— Carmel's peak to Horeb's despair in days</span></li>
                <li><span className="text-blue-400 font-semibold">Solomon</span> <span className="text-stone-500">— Wisdom, glory, then tragic decline</span></li>
              </ul>
            </div>
          )}

          <svg
            ref={svgRef}
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            className="w-full h-full select-none"
            preserveAspectRatio="xMidYMid meet"
            onMouseMove={handleMouseMoveDrag}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleChartMouseLeave}
            onWheel={handleChartWheel}
            style={{ cursor: dragRef.current ? 'grabbing' : 'crosshair' }}
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
                  fill="#78716c" fontSize="11" textAnchor="middle" fontFamily="monospace"
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
                  fill="#57534e" fontSize="11" textAnchor="end" fontFamily="monospace"
                >
                  {v}
                </text>
              </g>
            ))}

            {/* Y-axis label */}
            <text
              x={12} y={CHART_PAD.top + INNER_H / 2}
              fill="#57534e" fontSize="11" textAnchor="middle"
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
                  fill="#0c0a09" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace"
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
                    x={vYearToX(sorted[0].year) + 8}
                    y={influenceToY(sorted[0].influence) - 10}
                    fill={c.color}
                    fontSize="14"
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
                  x={hoveredPoint.x - 110}
                  y={hoveredPoint.y - 48}
                  width={220}
                  height={38}
                  rx={6}
                  fill="#1c1917"
                  stroke={hoveredPoint.color}
                  strokeWidth={1}
                  opacity={0.95}
                />
                <text
                  x={hoveredPoint.x}
                  y={hoveredPoint.y - 32}
                  fill="#fff"
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {hoveredPoint.point.label.length > 35
                    ? hoveredPoint.point.label.slice(0, 33) + '…'
                    : hoveredPoint.point.label}
                </text>
                <text
                  x={hoveredPoint.x}
                  y={hoveredPoint.y - 18}
                  fill="#a8a29e"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  ~{hoveredPoint.point.year} BC · {hoveredPoint.point.ref}
                </text>
              </g>
            )}
          </svg>
      </div>

      {/* ── Bottom detail panel (shows when point selected) ── */}
      {selectedPoint && (
        <div className="bg-stone-800 border-t border-stone-600 px-4 py-3 shrink-0">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: selectedPoint.color }} />
                <h2 className="text-white font-bold text-base leading-tight truncate">{selectedPoint.point.label}</h2>
                <button onClick={() => setSelectedPoint(null)} className="text-stone-500 hover:text-white p-0.5 ml-auto shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono" style={{ color: selectedPoint.color }}>{selectedPoint.charName} · ~{selectedPoint.point.year} BC</span>
                <div className="flex items-center gap-1.5 flex-1 max-w-48">
                  <div className="flex-1 bg-stone-700 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${selectedPoint.point.influence}%`, backgroundColor: selectedPoint.color }} />
                  </div>
                  <span className="text-stone-500 text-[10px] font-mono">{selectedPoint.point.influence}</span>
                </div>
                <a
                  href={toBibleGatewayUrl(selectedPoint.point.ref)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors shrink-0"
                >
                  {selectedPoint.point.ref}
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
