import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { allEvents, allLocations } from '../../data/samuel-kings';
import type { SKEvent, SKLocation } from '../../types/samuel-kings';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';

// ── Map image bounds (from Stamen terrain tiles z=7, tiles 75-77 x 50-53) ──
// ESRI World Shaded Relief export bounds
const MAP_NW = { lat: 35.0, lng: 33.5 };
const MAP_SE = { lat: 28.5, lng: 37.5 };
const IMG_W = 900;
const IMG_H = 1200;

// Convert lat/lng to pixel position on the terrain image
function toPixel(lat: number, lng: number) {
  const x = ((lng - MAP_NW.lng) / (MAP_SE.lng - MAP_NW.lng)) * IMG_W;
  const y = ((MAP_NW.lat - lat) / (MAP_NW.lat - MAP_SE.lat)) * IMG_H;
  return { x, y };
}

// ── Constants ───────────────────────────────────────────────────
const MIN_YEAR = 1100;
const MAX_YEAR = 560;
const EVENT_WINDOW = 15;
const PLAY_SPEEDS = [80, 40, 20];

const CATEGORY_META: Record<string, { color: string; label: string }> = {
  battle:       { color: '#ef4444', label: 'Battle' },
  prophecy:     { color: '#c084fc', label: 'Prophecy' },
  coronation:   { color: '#facc15', label: 'Coronation' },
  death:        { color: '#a8a29e', label: 'Death' },
  treaty:       { color: '#22d3ee', label: 'Treaty' },
  construction: { color: '#fb923c', label: 'Construction' },
  idolatry:     { color: '#f97316', label: 'Idolatry' },
  reform:       { color: '#4ade80', label: 'Reform' },
  siege:        { color: '#f87171', label: 'Siege' },
  exile:        { color: '#818cf8', label: 'Exile' },
  miracle:      { color: '#38bdf8', label: 'Miracle' },
  journey:      { color: '#34d399', label: 'Journey' },
};

// Location lookup by name
const locationByName = new Map<string, SKLocation>();
for (const loc of allLocations) {
  locationByName.set(loc.name, loc);
}
function findLocation(eventLoc?: string): SKLocation | null {
  if (!eventLoc) return null;
  if (locationByName.has(eventLoc)) return locationByName.get(eventLoc)!;
  for (const loc of allLocations) {
    if (loc.name.includes(eventLoc) || eventLoc.includes(loc.name)) return loc;
  }
  return null;
}

const KEY_CITIES = new Set(['jerusalem', 'samaria', 'dan', 'beersheba', 'hebron', 'damascus', 'tyre', 'megiddo', 'shechem', 'mount-carmel']);

export default function EventsPage() {
  const [currentYear, setCurrentYear] = useState(MIN_YEAR);
  const [selectedEvent, setSelectedEvent] = useState<SKEvent | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0);
  const playRef = useRef<number | null>(null);

  const visibleEvents = useMemo(() => {
    return allEvents.filter(e => {
      const eventEnd = e.yearEnd || e.year;
      return e.year >= currentYear - EVENT_WINDOW && eventEnd <= currentYear + EVENT_WINDOW;
    });
  }, [currentYear]);

  const mappedEvents = useMemo(() => {
    return visibleEvents
      .map(e => ({ event: e, location: findLocation(e.location) }))
      .filter(m => m.location !== null) as { event: SKEvent; location: SKLocation }[];
  }, [visibleEvents]);

  const activeCityIds = useMemo(() => {
    const ids = new Set<string>();
    for (const { location } of mappedEvents) ids.add(location.id);
    return ids;
  }, [mappedEvents]);

  // Play
  useEffect(() => {
    if (playing) {
      playRef.current = window.setInterval(() => {
        setCurrentYear(y => {
          if (y <= MAX_YEAR) { setPlaying(false); return MAX_YEAR; }
          return y - 1;
        });
      }, PLAY_SPEEDS[speedIdx]);
    }
    return () => { if (playRef.current) clearInterval(playRef.current); };
  }, [playing, speedIdx]);

  const sliderValue = MIN_YEAR - currentYear;
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentYear(MIN_YEAR - Number(e.target.value));
    setPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (currentYear <= MAX_YEAR) setCurrentYear(MIN_YEAR);
    setPlaying(p => !p);
  }, [currentYear]);

  const cycleSpeed = useCallback(() => {
    setSpeedIdx(i => (i + 1) % PLAY_SPEEDS.length);
  }, []);

  const handleEventClick = useCallback((event: SKEvent) => {
    setSelectedEvent(prev => prev?.id === event.id ? null : event);
  }, []);

  // ── Viewbox (zoom/pan state) ──────────────────────────────────
  // Default: zoom into the core Israel region (Dan to Beersheba)
  const danPx = toPixel(33.25, 34.5);
  const beerPx = toPixel(31.0, 36.2);
  const defaultVB = {
    x: danPx.x - 30,
    y: danPx.y - 30,
    w: (beerPx.x - danPx.x) + 60,
    h: (beerPx.y - danPx.y) + 60,
  };

  const [viewBox, setViewBox] = useState(defaultVB);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; vb: typeof defaultVB } | null>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.15 : 0.87; // zoom out / zoom in
    setViewBox(vb => {
      const newW = Math.max(100, Math.min(IMG_W, vb.w * factor));
      const newH = Math.max(133, Math.min(IMG_H, vb.h * factor));
      // Zoom toward center
      const cx = vb.x + vb.w / 2;
      const cy = vb.y + vb.h / 2;
      return {
        x: Math.max(0, Math.min(IMG_W - newW, cx - newW / 2)),
        y: Math.max(0, Math.min(IMG_H - newH, cy - newH / 2)),
        w: newW,
        h: newH,
      };
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, vb: viewBox };
  }, [viewBox]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current || !svgRef.current) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const scaleX = viewBox.w / rect.width;
    const scaleY = viewBox.h / rect.height;
    const dx = (e.clientX - dragRef.current.startX) * scaleX;
    const dy = (e.clientY - dragRef.current.startY) * scaleY;
    setViewBox({
      x: Math.max(0, Math.min(IMG_W - dragRef.current.vb.w, dragRef.current.vb.x - dx)),
      y: Math.max(0, Math.min(IMG_H - dragRef.current.vb.h, dragRef.current.vb.y - dy)),
      w: dragRef.current.vb.w,
      h: dragRef.current.vb.h,
    });
  }, [viewBox]);

  const handleMouseUp = useCallback(() => { dragRef.current = null; }, []);

  const handleResetView = useCallback(() => setViewBox(defaultVB), [defaultVB]);

  const handleZoomIn = useCallback(() => {
    setViewBox(vb => {
      const newW = Math.max(100, vb.w * 0.7);
      const newH = Math.max(133, vb.h * 0.7);
      const cx = vb.x + vb.w / 2;
      const cy = vb.y + vb.h / 2;
      return { x: Math.max(0, cx - newW / 2), y: Math.max(0, cy - newH / 2), w: newW, h: newH };
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setViewBox(vb => {
      const newW = Math.min(IMG_W, vb.w * 1.4);
      const newH = Math.min(IMG_H, vb.h * 1.4);
      const cx = vb.x + vb.w / 2;
      const cy = vb.y + vb.h / 2;
      return {
        x: Math.max(0, Math.min(IMG_W - newW, cx - newW / 2)),
        y: Math.max(0, Math.min(IMG_H - newH, cy - newH / 2)),
        w: newW, h: newH,
      };
    });
  }, []);

  return (
    <div className="flex flex-col h-full bg-stone-950 relative">
      <div className="flex flex-1 overflow-hidden">
        {/* ── Map area ────────────────────────────────────── */}
        <div className="flex-1 relative overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
            className="w-full h-full select-none"
            preserveAspectRatio="xMidYMid meet"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: dragRef.current ? 'grabbing' : 'grab' }}
          >
            {/* Terrain background image */}
            <image
              href="/terrain-levant.jpg"
              x={0}
              y={0}
              width={IMG_W}
              height={IMG_H}
            />

            {/* Slight dark overlay for readability */}
            <rect x={viewBox.x} y={viewBox.y} width={viewBox.w} height={viewBox.h} fill="black" opacity="0.25" />

            {/* City dots */}
            {allLocations.map(loc => {
              // Skip far-off locations outside the main view
              if (loc.id === 'nineveh' || loc.id === 'babylon' || loc.id === 'mount-horeb') return null;
              const pos = toPixel(loc.y, loc.x); // y=lat, x=lng in our data
              const isActive = activeCityIds.has(loc.id);
              const isKey = KEY_CITIES.has(loc.id);

              return (
                <g key={loc.id}>
                  {isActive && (
                    <circle cx={pos.x} cy={pos.y} r={12} fill="#facc15" opacity={0.15} />
                  )}
                  <circle
                    cx={pos.x} cy={pos.y}
                    r={isActive ? 4 : isKey ? 3 : 2}
                    fill={isActive ? '#fbbf24' : '#d4d4d8'}
                    stroke={isActive ? '#fbbf24' : '#a1a1aa'}
                    strokeWidth={0.5}
                    opacity={isActive ? 1 : isKey ? 0.8 : 0.5}
                  />
                  {(isKey || isActive) && (
                    <text
                      x={pos.x + 6} y={pos.y + 1}
                      fill="#fff"
                      fontSize="8"
                      fontWeight={isActive ? '700' : '500'}
                      opacity={isActive ? 1 : 0.7}
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } as any}
                    >
                      {loc.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Event pins */}
            {mappedEvents.map(({ event, location }) => {
              if (location.id === 'nineveh' || location.id === 'babylon' || location.id === 'mount-horeb') return null;
              const pos = toPixel(location.y, location.x);
              const cat = CATEGORY_META[event.category] || CATEGORY_META.prophecy;
              const isSel = selectedEvent?.id === event.id;
              const proximity = Math.abs(event.year - currentYear);
              const opacity = Math.max(0.5, 1 - proximity / EVENT_WINDOW);

              return (
                <g key={event.id} onClick={() => handleEventClick(event)} style={{ cursor: 'pointer' }} opacity={opacity}>
                  {isSel && (
                    <circle cx={pos.x} cy={pos.y} r={18} fill="none" stroke={cat.color} strokeWidth={1.5} opacity={0.6}>
                      <animate attributeName="r" from="12" to="24" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={pos.x} cy={pos.y}
                    r={isSel ? 8 : event.significance === 'major' ? 7 : 5}
                    fill={cat.color}
                    stroke="#000"
                    strokeWidth={1}
                    opacity={0.9}
                  />
                  {(event.significance !== 'minor' || isSel) && (
                    <>
                      {/* Text shadow/background */}
                      <text
                        x={pos.x} y={pos.y - 12}
                        fill="#000" fontSize="8" fontWeight="700" textAnchor="middle" opacity={0.6}
                        stroke="#000" strokeWidth={3} paintOrder="stroke"
                      >
                        {event.name.length > 20 ? event.name.slice(0, 18) + '…' : event.name}
                      </text>
                      <text
                        x={pos.x} y={pos.y - 12}
                        fill="#fff" fontSize="8" fontWeight="700" textAnchor="middle"
                      >
                        {event.name.length > 20 ? event.name.slice(0, 18) + '…' : event.name}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Year overlay */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 z-10">
            <div className="text-amber-400 font-mono font-bold text-2xl leading-tight">{currentYear} BC</div>
            <div className="text-stone-400 text-xs">{visibleEvents.length} event{visibleEvents.length !== 1 ? 's' : ''} nearby</div>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-1 z-10">
            <button onClick={handleZoomIn} className="p-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-stone-300 hover:text-white transition-colors" title="Zoom in">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35M8 11h6M11 8v6" />
              </svg>
            </button>
            <button onClick={handleZoomOut} className="p-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-stone-300 hover:text-white transition-colors" title="Zoom out">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35M8 11h6" />
              </svg>
            </button>
            <button onClick={handleResetView} className="p-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-stone-300 hover:text-white transition-colors" title="Reset view">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Side panel ─────────────────────────────────── */}
        <div className="w-72 border-l border-stone-800 bg-stone-950/95 overflow-y-auto hidden md:block shrink-0">
          {selectedEvent ? (
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-white font-bold text-base leading-tight">{selectedEvent.name}</h2>
                <button onClick={() => setSelectedEvent(null)} className="text-stone-500 hover:text-white p-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: (CATEGORY_META[selectedEvent.category]?.color || '#666') + '22', color: CATEGORY_META[selectedEvent.category]?.color || '#999' }}>
                  {CATEGORY_META[selectedEvent.category]?.label || selectedEvent.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs text-stone-400 bg-stone-800 font-mono">~{selectedEvent.year} BC</span>
                {selectedEvent.location && (
                  <span className="px-2 py-0.5 rounded-full text-xs text-stone-400 bg-stone-800">{selectedEvent.location}</span>
                )}
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-3">{selectedEvent.description}</p>
              <a href={toBibleGatewayUrl(selectedEvent.primaryRef)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors">
                {selectedEvent.primaryRef}
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-white text-sm font-semibold mb-3">Events Near {currentYear} BC</h3>
              {visibleEvents.length === 0 ? (
                <p className="text-stone-600 text-xs">No events near this year. Drag the timeline.</p>
              ) : (
                <div className="space-y-1">
                  {visibleEvents.sort((a, b) => b.year - a.year).map(event => {
                    const cat = CATEGORY_META[event.category] || CATEGORY_META.prophecy;
                    return (
                      <button key={event.id}
                        onClick={() => { handleEventClick(event); setCurrentYear(event.year); }}
                        className="w-full text-left flex items-start gap-2 px-2 py-1.5 rounded hover:bg-stone-800/50 transition-colors">
                        <span className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <div className="min-w-0">
                          <span className="text-stone-500 text-[10px] font-mono">~{event.year}</span>
                          <p className="text-white text-xs font-medium leading-tight">{event.name}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-stone-800">
                <h4 className="text-stone-600 text-[10px] uppercase tracking-wider mb-2">Categories</h4>
                <div className="grid grid-cols-2 gap-1">
                  {Object.entries(CATEGORY_META).map(([key, { color, label }]) => (
                    <div key={key} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-[10px] text-stone-500">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Time scrubber ────────────────────────────────── */}
      <div className="shrink-0 bg-stone-950/95 backdrop-blur border-t border-stone-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={togglePlay}
            className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors shrink-0"
            title={playing ? 'Pause' : 'Play'}>
            {playing ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36A1 1 0 008 5.14z" />
              </svg>
            )}
          </button>

          <button onClick={cycleSpeed}
            className="px-2 py-1 rounded text-[10px] font-mono text-stone-500 hover:text-stone-300 bg-stone-800 transition-colors shrink-0"
            title="Change playback speed">
            {speedIdx === 0 ? '1x' : speedIdx === 1 ? '2x' : '4x'}
          </button>

          <span className="text-stone-500 text-xs font-mono shrink-0">{MIN_YEAR} BC</span>

          <div className="flex-1 relative">
            <input
              type="range" min={0} max={MIN_YEAR - MAX_YEAR} value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-2 bg-stone-800 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-stone-950 [&::-webkit-slider-thumb]:shadow-lg"
            />
            <div className="absolute left-0 right-0 top-4 h-2 pointer-events-none">
              {allEvents.map(e => {
                const pct = ((MIN_YEAR - e.year) / (MIN_YEAR - MAX_YEAR)) * 100;
                if (pct < 0 || pct > 100) return null;
                const cat = CATEGORY_META[e.category];
                return <div key={e.id} className="absolute w-0.5 h-1.5 rounded-full" style={{ left: `${pct}%`, backgroundColor: cat?.color || '#666', opacity: 0.4 }} />;
              })}
            </div>
          </div>

          <span className="text-stone-500 text-xs font-mono shrink-0">{MAX_YEAR} BC</span>
        </div>
      </div>

      {/* Mobile detail */}
      {selectedEvent && (
        <div className="md:hidden bg-stone-900 border-t border-stone-700 p-4 max-h-[35vh] overflow-y-auto shrink-0">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-white font-bold text-base">{selectedEvent.name}</h2>
            <button onClick={() => setSelectedEvent(null)} className="text-stone-500 hover:text-white p-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-stone-300 text-sm mb-2">{selectedEvent.description}</p>
          <a href={toBibleGatewayUrl(selectedEvent.primaryRef)} target="_blank" rel="noopener noreferrer"
            className="text-xs font-mono text-blue-400">{selectedEvent.primaryRef}</a>
        </div>
      )}
    </div>
  );
}
