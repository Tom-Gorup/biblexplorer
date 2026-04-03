import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { allEvents, allLocations } from '../../data/samuel-kings';
import type { SKEvent, SKLocation } from '../../types/samuel-kings';
import { toBibleGatewayUrl } from '../../utils/bibleLinks';

// ── Constants ───────────────────────────────────────────────────
const MIN_YEAR = 1100; // BC (Samuel's birth)
const MAX_YEAR = 560;  // BC (after exile)
const EVENT_WINDOW = 15; // years visible around the cursor
const PLAY_SPEED = 80;   // ms per year tick

// Category colors and icons
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

// ── Location lookup by name ─────────────────────────────────────
const locationByName = new Map<string, SKLocation>();
for (const loc of allLocations) {
  locationByName.set(loc.name, loc);
  if (loc.modernName) locationByName.set(loc.modernName, loc);
}

function findLocation(eventLoc?: string): SKLocation | null {
  if (!eventLoc) return null;
  // Try exact match first, then partial
  if (locationByName.has(eventLoc)) return locationByName.get(eventLoc)!;
  for (const loc of allLocations) {
    if (loc.name.includes(eventLoc) || eventLoc.includes(loc.name)) return loc;
  }
  return null;
}

// ── Component ───────────────────────────────────────────────────
export default function EventsPage() {
  const [currentYear, setCurrentYear] = useState(MIN_YEAR);
  const [selectedEvent, setSelectedEvent] = useState<SKEvent | null>(null);
  const [playing, setPlaying] = useState(false);
  const playRef = useRef<number | null>(null);

  // Events visible at the current year
  const visibleEvents = useMemo(() => {
    return allEvents.filter(e => {
      const eventEnd = e.yearEnd || e.year;
      return e.year >= currentYear - EVENT_WINDOW && eventEnd <= currentYear + EVENT_WINDOW;
    });
  }, [currentYear]);

  // Events with locations for map pins
  const mappedEvents = useMemo(() => {
    return visibleEvents
      .map(e => ({ event: e, location: findLocation(e.location) }))
      .filter(m => m.location !== null) as { event: SKEvent; location: SKLocation }[];
  }, [visibleEvents]);

  // Play/pause
  useEffect(() => {
    if (playing) {
      playRef.current = window.setInterval(() => {
        setCurrentYear(y => {
          if (y <= MAX_YEAR) {
            setPlaying(false);
            return MAX_YEAR;
          }
          return y - 1;
        });
      }, PLAY_SPEED);
    }
    return () => { if (playRef.current) clearInterval(playRef.current); };
  }, [playing]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentYear(Number(e.target.value));
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
        <div className="flex-1 relative">
          <svg
            viewBox={`250 150 700 750`}
            className="w-full h-full"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            {/* Water bodies */}
            <defs>
              <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="100%" stopColor="#0f2847" />
              </linearGradient>
            </defs>

            {/* Mediterranean Sea */}
            <rect x="250" y="150" width="130" height="750" fill="url(#water)" opacity="0.5" />

            {/* Sea of Galilee */}
            <ellipse cx="510" cy="340" rx="20" ry="30" fill="#1e3a5f" opacity="0.6" />

            {/* Dead Sea */}
            <ellipse cx="530" cy="630" rx="15" ry="50" fill="#1e3a5f" opacity="0.6" />

            {/* Jordan River */}
            <path
              d="M510 310 Q520 400 530 500 Q535 550 530 580"
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="3"
              opacity="0.5"
            />

            {/* Coastline hint */}
            <path
              d="M380 150 L380 350 Q370 400 380 500 L390 600 L380 700 L370 900"
              fill="none"
              stroke="#334155"
              strokeWidth="1.5"
              opacity="0.4"
            />

            {/* Kingdom boundary hint */}
            <line x1="350" y1="500" x2="650" y2="500" stroke="#475569" strokeWidth="0.5" strokeDasharray="8 4" opacity="0.3" />
            <text x="360" y="495" fill="#475569" fontSize="9" opacity="0.3">ISRAEL</text>
            <text x="360" y="515" fill="#475569" fontSize="9" opacity="0.3">JUDAH</text>

            {/* ── City dots (always visible) ────────────────── */}
            {allLocations.map(loc => (
              <g key={loc.id}>
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={3}
                  fill="#57534e"
                  opacity={0.5}
                />
                <text
                  x={loc.x + 6}
                  y={loc.y + 3}
                  fill="#78716c"
                  fontSize="7"
                  opacity={0.6}
                >
                  {loc.name}
                </text>
              </g>
            ))}

            {/* ── Event pins (animated) ─────────────────────── */}
            {mappedEvents.map(({ event, location }) => {
              const cat = CATEGORY_META[event.category] || CATEGORY_META.prophecy;
              const isSel = selectedEvent?.id === event.id;
              const proximity = Math.abs(event.year - currentYear);
              const opacity = Math.max(0.3, 1 - proximity / EVENT_WINDOW);

              return (
                <g
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  style={{ cursor: 'pointer' }}
                  opacity={opacity}
                >
                  {/* Pulse ring for selected */}
                  {isSel && (
                    <circle
                      cx={location.x}
                      cy={location.y}
                      r={14}
                      fill="none"
                      stroke={cat.color}
                      strokeWidth="1.5"
                      opacity="0.4"
                    >
                      <animate attributeName="r" from="10" to="20" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Pin circle */}
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={isSel ? 8 : event.significance === 'major' ? 7 : 5}
                    fill={cat.color + '44'}
                    stroke={cat.color}
                    strokeWidth={isSel ? 2.5 : 1.5}
                  />
                  {/* Event label */}
                  {(event.significance !== 'minor' || isSel) && (
                    <text
                      x={location.x}
                      y={location.y - 10}
                      fill={cat.color}
                      fontSize="8"
                      fontWeight="600"
                      textAnchor="middle"
                      opacity={0.9}
                    >
                      {event.name.length > 25 ? event.name.slice(0, 22) + '...' : event.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Year display */}
          <div className="absolute top-3 left-3 bg-stone-800/90 backdrop-blur border border-stone-700 rounded-lg px-3 py-1.5 z-10">
            <span className="text-amber-400 font-mono font-bold text-lg">{currentYear} BC</span>
            <span className="text-stone-500 text-xs ml-2">{visibleEvents.length} events</span>
          </div>

          {/* Category legend */}
          <div className="absolute top-3 right-3 bg-stone-800/90 backdrop-blur border border-stone-700 rounded-lg px-3 py-2 z-10">
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
              {Object.entries(CATEGORY_META).map(([key, { color, label }]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-[9px] text-stone-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Event list (right panel, desktop) ──────────── */}
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
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: (CATEGORY_META[selectedEvent.category]?.color || '#666') + '22',
                    color: CATEGORY_META[selectedEvent.category]?.color || '#999',
                  }}
                >
                  {CATEGORY_META[selectedEvent.category]?.label || selectedEvent.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs text-stone-400 bg-stone-700 font-mono">
                  ~{selectedEvent.year} BC
                </span>
                {selectedEvent.location && (
                  <span className="px-2 py-0.5 rounded-full text-xs text-stone-400 bg-stone-700">
                    {selectedEvent.location}
                  </span>
                )}
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-3">{selectedEvent.description}</p>
              <a
                href={toBibleGatewayUrl(selectedEvent.primaryRef)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
              >
                {selectedEvent.primaryRef}
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-stone-400 text-sm font-semibold mb-2">Events Near {currentYear} BC</h3>
              {visibleEvents.length === 0 ? (
                <p className="text-stone-600 text-xs">No events near this year. Try scrolling the timeline.</p>
              ) : (
                <div className="space-y-1">
                  {visibleEvents.sort((a, b) => b.year - a.year).map(event => {
                    const cat = CATEGORY_META[event.category] || CATEGORY_META.prophecy;
                    return (
                      <button
                        key={event.id}
                        onClick={() => { handleEventClick(event); setCurrentYear(event.year); }}
                        className="w-full text-left flex items-start gap-2 px-2 py-1.5 rounded hover:bg-stone-700/50 transition-colors"
                      >
                        <span className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-stone-500 text-[10px] font-mono">~{event.year}</span>
                            <span className="text-white text-xs font-medium truncate">{event.name}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Time scrubber + play button ───────────────────── */}
      <div className="shrink-0 bg-stone-800/95 backdrop-blur border-t border-stone-700 px-4 py-2">
        <div className="flex items-center gap-3">
          {/* Play/pause button */}
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-300 hover:text-white transition-colors shrink-0"
            title={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36A1 1 0 008 5.14z" />
              </svg>
            )}
          </button>

          {/* Year labels */}
          <span className="text-stone-500 text-[10px] font-mono shrink-0">{MIN_YEAR} BC</span>

          {/* Slider */}
          <input
            type="range"
            min={MAX_YEAR}
            max={MIN_YEAR}
            value={currentYear}
            onChange={handleSliderChange}
            className="flex-1 h-1.5 bg-stone-700 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-stone-900"
          />

          {/* Year labels */}
          <span className="text-stone-500 text-[10px] font-mono shrink-0">{MAX_YEAR} BC</span>
        </div>

        {/* Event ticks on the scrubber */}
        <div className="relative h-2 mx-12 mt-0.5">
          {allEvents.map(e => {
            const pct = ((MIN_YEAR - e.year) / (MIN_YEAR - MAX_YEAR)) * 100;
            if (pct < 0 || pct > 100) return null;
            const cat = CATEGORY_META[e.category];
            return (
              <div
                key={e.id}
                className="absolute top-0 w-px h-2"
                style={{ left: `${pct}%`, backgroundColor: cat?.color || '#666', opacity: 0.4 }}
              />
            );
          })}
        </div>
      </div>

      {/* ── Mobile event detail (bottom) ─────────────────── */}
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
          <a
            href={toBibleGatewayUrl(selectedEvent.primaryRef)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-blue-400"
          >
            {selectedEvent.primaryRef}
          </a>
        </div>
      )}
    </div>
  );
}
