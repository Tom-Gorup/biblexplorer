import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { allEvents, allLocations } from '../../data/samuel-kings';
import type { SKEvent, SKLocation } from '../../types/samuel-kings';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';

// ── Constants ───────────────────────────────────────────────────
const MIN_YEAR = 1100;
const MAX_YEAR = 560;
const EVENT_WINDOW = 15;
const PLAY_SPEED = 100;

const CATEGORY_META: Record<string, { color: string; label: string }> = {
  battle:       { color: '#ef4444', label: 'Battle' },
  prophecy:     { color: '#a78bfa', label: 'Prophecy' },
  coronation:   { color: '#facc15', label: 'Coronation' },
  death:        { color: '#78716c', label: 'Death' },
  treaty:       { color: '#22d3ee', label: 'Treaty' },
  construction: { color: '#f59e0b', label: 'Construction' },
  idolatry:     { color: '#f97316', label: 'Idolatry' },
  reform:       { color: '#22c55e', label: 'Reform' },
  siege:        { color: '#dc2626', label: 'Siege' },
  exile:        { color: '#6366f1', label: 'Exile' },
  miracle:      { color: '#38bdf8', label: 'Miracle' },
  journey:      { color: '#34d399', label: 'Journey' },
};

// ── Location lookup ─────────────────────────────────────────────
const locationByName = new Map<string, SKLocation>();
for (const loc of allLocations) {
  locationByName.set(loc.name, loc);
  if (loc.modernName) locationByName.set(loc.modernName, loc);
}
function findLocation(eventLoc?: string): SKLocation | null {
  if (!eventLoc) return null;
  if (locationByName.has(eventLoc)) return locationByName.get(eventLoc)!;
  for (const loc of allLocations) {
    if (loc.name.includes(eventLoc) || eventLoc.includes(loc.name)) return loc;
  }
  return null;
}

// Key cities to always label (the rest show on hover)
const KEY_CITIES = new Set(['jerusalem', 'samaria', 'dan', 'beersheba', 'hebron', 'damascus', 'tyre', 'nineveh', 'babylon', 'mount-carmel', 'megiddo', 'shechem']);

// ── Component ───────────────────────────────────────────────────
export default function EventsPage() {
  const [currentYear, setCurrentYear] = useState(MIN_YEAR);
  const [selectedEvent, setSelectedEvent] = useState<SKEvent | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
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

  // Cities that have active events
  const activeCityIds = useMemo(() => {
    const ids = new Set<string>();
    for (const { location } of mappedEvents) ids.add(location.id);
    return ids;
  }, [mappedEvents]);

  // Play — time flows forward (year decreases since BC)
  useEffect(() => {
    if (playing) {
      playRef.current = window.setInterval(() => {
        setCurrentYear(y => {
          if (y <= MAX_YEAR) { setPlaying(false); return MAX_YEAR; }
          return y - 1;
        });
      }, PLAY_SPEED);
    }
    return () => { if (playRef.current) clearInterval(playRef.current); };
  }, [playing]);

  // Slider: left=1100 BC (earliest), right=560 BC (latest)
  // Value is inverted so sliding right moves forward in time
  const sliderValue = MIN_YEAR - currentYear; // 0 at 1100 BC, 540 at 560 BC
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentYear(MIN_YEAR - Number(e.target.value));
    setPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (currentYear <= MAX_YEAR) setCurrentYear(MIN_YEAR);
    setPlaying(p => !p);
  }, [currentYear]);

  const handleEventClick = useCallback((event: SKEvent) => {
    setSelectedEvent(prev => prev?.id === event.id ? null : event);
  }, []);

  return (
    <div className="flex flex-col h-full bg-stone-900 relative">
      <div className="flex flex-1 overflow-hidden">
        {/* ── Map ──────────────────────────────────────────── */}
        <div className="flex-1 relative bg-[#0c1222]">
          <svg
            viewBox="300 200 650 650"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="land-glow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
            </defs>

            {/* Land mass */}
            <path
              d="M380 200 L380 320 Q370 360 350 400 L360 420 L380 440 L390 500 L395 560 L385 600 L380 650 L370 750 L400 850
                 L500 850 L560 750 L580 700 L600 650 L620 600 Q640 500 620 420 L600 350 L580 300 L560 250 L500 200 Z"
              fill="#1a2744"
              stroke="#2a3a5c"
              strokeWidth="1.5"
            />

            {/* Mediterranean Sea label */}
            <text x="320" y="500" fill="#1e3a5f" fontSize="12" fontWeight="600" opacity="0.4" transform="rotate(-90 320 500)">
              Mediterranean Sea
            </text>

            {/* Sea of Galilee */}
            <ellipse cx="510" cy="340" rx="18" ry="25" fill="#1e3a5f" stroke="#2a4a6f" strokeWidth="0.8" />
            <text x="535" y="345" fill="#3a5a8f" fontSize="7" opacity="0.6">Sea of Galilee</text>

            {/* Dead Sea */}
            <ellipse cx="530" cy="630" rx="12" ry="45" fill="#1e3a5f" stroke="#2a4a6f" strokeWidth="0.8" />
            <text x="548" y="635" fill="#3a5a8f" fontSize="7" opacity="0.6">Dead Sea</text>

            {/* Jordan River */}
            <path
              d="M510 365 Q515 400 520 450 Q525 500 530 550 Q532 580 530 585"
              fill="none" stroke="#1e3a5f" strokeWidth="2" opacity="0.6"
            />

            {/* Kingdom labels */}
            <text x="440" y="420" fill="#f59e0b" fontSize="14" fontWeight="700" opacity="0.12" letterSpacing="6">ISRAEL</text>
            <text x="440" y="610" fill="#3b82f6" fontSize="14" fontWeight="700" opacity="0.12" letterSpacing="6">JUDAH</text>

            {/* Kingdom dividing line */}
            <path d="M380 505 Q450 500 530 505 Q560 508 590 510" fill="none" stroke="#475569" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.25" />

            {/* ── City dots ──────────────────────────────────── */}
            {allLocations.map(loc => {
              const isActive = activeCityIds.has(loc.id);
              const isKey = KEY_CITIES.has(loc.id);
              const isHovered = hoveredCity === loc.id;
              const showLabel = isKey || isActive || isHovered;

              return (
                <g
                  key={loc.id}
                  onMouseEnter={() => setHoveredCity(loc.id)}
                  onMouseLeave={() => setHoveredCity(null)}
                  style={{ cursor: 'default' }}
                >
                  {/* Glow for active cities */}
                  {isActive && (
                    <circle cx={loc.x} cy={loc.y} r={12} fill={loc.kingdom === 'israel' ? '#f59e0b' : loc.kingdom === 'judah' ? '#3b82f6' : '#94a3b8'} opacity={0.08} />
                  )}
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r={isActive ? 4 : isKey ? 3 : 2}
                    fill={isActive ? '#e2e8f0' : '#64748b'}
                    opacity={isActive ? 1 : isKey ? 0.7 : 0.4}
                  />
                  {showLabel && (
                    <text
                      x={loc.x + (loc.x > 600 ? -6 : 7)}
                      y={loc.y + 3}
                      fill={isActive ? '#e2e8f0' : '#94a3b8'}
                      fontSize={isKey ? '9' : '8'}
                      fontWeight={isActive ? '600' : '400'}
                      textAnchor={loc.x > 600 ? 'end' : 'start'}
                      opacity={isActive ? 1 : 0.6}
                    >
                      {loc.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* ── Event pins ─────────────────────────────────── */}
            {mappedEvents.map(({ event, location }) => {
              const cat = CATEGORY_META[event.category] || CATEGORY_META.prophecy;
              const isSel = selectedEvent?.id === event.id;
              const proximity = Math.abs(event.year - currentYear);
              const opacity = Math.max(0.4, 1 - proximity / EVENT_WINDOW);

              return (
                <g
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  style={{ cursor: 'pointer' }}
                  opacity={opacity}
                >
                  {isSel && (
                    <circle cx={location.x} cy={location.y} r={16} fill="none" stroke={cat.color} strokeWidth="1.5" opacity="0.5">
                      <animate attributeName="r" from="12" to="22" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={isSel ? 9 : event.significance === 'major' ? 8 : 6}
                    fill={cat.color}
                    opacity={0.8}
                    stroke={isSel ? '#fff' : cat.color}
                    strokeWidth={isSel ? 2 : 0}
                  />
                  <text
                    x={location.x}
                    y={location.y - (isSel ? 14 : 11)}
                    fill="#fff"
                    fontSize={isSel ? '10' : '8'}
                    fontWeight="600"
                    textAnchor="middle"
                    opacity={event.significance === 'minor' && !isSel ? 0 : 0.9}
                  >
                    {event.name.length > 22 ? event.name.slice(0, 20) + '…' : event.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Year + event count overlay */}
          <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur border border-stone-700/60 rounded-lg px-3 py-1.5 z-10">
            <span className="text-amber-400 font-mono font-bold text-xl">{currentYear} BC</span>
            <span className="text-stone-500 text-xs ml-2">{visibleEvents.length} event{visibleEvents.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* ── Side panel ─────────────────────────────────────── */}
        <div className="w-72 border-l border-stone-700 bg-stone-900/95 overflow-y-auto hidden md:block shrink-0">
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
                <span className="px-2 py-0.5 rounded-full text-xs text-stone-400 bg-stone-700 font-mono">~{selectedEvent.year} BC</span>
                {selectedEvent.location && (
                  <span className="px-2 py-0.5 rounded-full text-xs text-stone-400 bg-stone-700">{selectedEvent.location}</span>
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
              <h3 className="text-stone-400 text-sm font-semibold mb-3">Events Near {currentYear} BC</h3>
              {visibleEvents.length === 0 ? (
                <p className="text-stone-600 text-xs">No events near this year. Drag the timeline.</p>
              ) : (
                <div className="space-y-1">
                  {visibleEvents.sort((a, b) => b.year - a.year).map(event => {
                    const cat = CATEGORY_META[event.category] || CATEGORY_META.prophecy;
                    return (
                      <button key={event.id}
                        onClick={() => { handleEventClick(event); setCurrentYear(event.year); }}
                        className="w-full text-left flex items-start gap-2 px-2 py-1.5 rounded hover:bg-stone-700/50 transition-colors">
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
              {/* Category legend */}
              <div className="mt-4 pt-4 border-t border-stone-700">
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

      {/* ── Time scrubber ────────────────────────────────────── */}
      <div className="shrink-0 bg-stone-800/95 backdrop-blur border-t border-stone-700 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button onClick={togglePlay}
            className="p-2 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-300 hover:text-white transition-colors shrink-0"
            title={playing ? 'Pause' : 'Play'}>
            {playing ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36A1 1 0 008 5.14z" />
              </svg>
            )}
          </button>

          <span className="text-stone-400 text-xs font-mono shrink-0 w-14">{MIN_YEAR} BC</span>

          <div className="flex-1 relative">
            <input
              type="range"
              min={0}
              max={MIN_YEAR - MAX_YEAR}
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-2 bg-stone-700 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-stone-900 [&::-webkit-slider-thumb]:shadow-lg"
            />
            {/* Event density ticks */}
            <div className="absolute left-0 right-0 top-4 h-2">
              {allEvents.map(e => {
                const pct = ((MIN_YEAR - e.year) / (MIN_YEAR - MAX_YEAR)) * 100;
                if (pct < 0 || pct > 100) return null;
                const cat = CATEGORY_META[e.category];
                return (
                  <div key={e.id} className="absolute w-0.5 h-1.5 rounded-full"
                    style={{ left: `${pct}%`, backgroundColor: cat?.color || '#666', opacity: 0.5 }} />
                );
              })}
            </div>
          </div>

          <span className="text-stone-400 text-xs font-mono shrink-0 w-12 text-right">{MAX_YEAR} BC</span>
        </div>
      </div>

      {/* ── Mobile event detail ──────────────────────────────── */}
      {selectedEvent && (
        <div className="md:hidden bg-stone-800 border-t border-stone-600 p-4 max-h-[35vh] overflow-y-auto shrink-0">
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
