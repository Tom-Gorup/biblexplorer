import { useState, useRef, useEffect } from 'react';
import { passionWeek } from '../../data/easter';
import type { PassionEvent, PassionDay } from '../../data/easter';
import { toBibleGatewayUrl, splitRefs } from '../../utils/bibleLinks';

// ── Category colors ────────────────────────────────────────────
const CATEGORY_COLORS: Record<PassionEvent['category'], string> = {
  entry: '#facc15',
  teaching: '#3b82f6',
  miracle: '#14b8a6',
  confrontation: '#f97316',
  worship: '#a78bfa',
  betrayal: '#ef4444',
  trial: '#dc2626',
  suffering: '#991b1b',
  death: '#57534e',
  burial: '#78716c',
  resurrection: '#22c55e',
};

const CATEGORY_LABELS: Record<PassionEvent['category'], string> = {
  entry: 'Entry',
  teaching: 'Teaching',
  miracle: 'Miracle',
  confrontation: 'Confrontation',
  worship: 'Worship',
  betrayal: 'Betrayal',
  trial: 'Trial',
  suffering: 'Suffering',
  death: 'Death',
  burial: 'Burial',
  resurrection: 'Resurrection',
};

// ── Scripture link component ───────────────────────────────────
function ScriptureLink({ reference }: { reference: string }) {
  return (
    <a
      href={toBibleGatewayUrl(reference)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block text-xs px-2 py-0.5 rounded bg-stone-700/60 text-blue-400 hover:text-blue-300 hover:bg-stone-700 transition-colors"
    >
      {reference}
    </a>
  );
}

// ── Event card ─────────────────────────────────────────────────
function EventCard({
  event,
  isSelected,
  onSelect,
}: {
  event: PassionEvent;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const catColor = CATEGORY_COLORS[event.category];

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-lg border p-3 transition-all cursor-pointer ${
        isSelected
          ? 'border-stone-500 bg-stone-800/80 ring-1 ring-stone-500/40'
          : 'border-stone-700/60 bg-stone-800/40 hover:border-stone-600 hover:bg-stone-800/60'
      }`}
    >
      <div className="flex items-start gap-2 flex-wrap">
        <h4 className="text-sm font-semibold text-stone-200 flex-1 min-w-0">
          {event.title}
        </h4>
        <span
          className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: catColor + '20',
            color: catColor,
          }}
        >
          {CATEGORY_LABELS[event.category]}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
        {event.location && (
          <span className="text-[11px] text-stone-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </span>
        )}
        {event.participants.length > 0 && (
          <span className="text-[11px] text-stone-500">
            {event.participants.slice(0, 3).join(', ')}
            {event.participants.length > 3 && ` +${event.participants.length - 3}`}
          </span>
        )}
      </div>
    </button>
  );
}

// ── Day section ────────────────────────────────────────────────
function DaySection({
  day,
  selectedId,
  onSelectEvent,
}: {
  day: PassionDay;
  selectedId: string | null;
  onSelectEvent: (e: PassionEvent) => void;
}) {
  return (
    <section className="relative pl-5">
      {/* Colored left border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
        style={{ backgroundColor: day.color }}
      />

      {/* Day header */}
      <div className="mb-3 pt-1">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h2 className="text-lg font-bold text-white">{day.day}</h2>
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            {day.date}
          </span>
        </div>
        <p className="text-sm mt-0.5" style={{ color: day.color }}>
          {day.theme}
        </p>
      </div>

      {/* Event cards */}
      <div className="flex flex-col gap-2">
        {day.events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            isSelected={selectedId === event.id}
            onSelect={() => onSelectEvent(event)}
          />
        ))}
      </div>
    </section>
  );
}

// ── Sidebar detail view ────────────────────────────────────────
function SidebarDetail({ event }: { event: PassionEvent }) {
  const catColor = CATEGORY_COLORS[event.category];
  const allRefs = [event.primaryRef, ...(event.crossRefs ?? [])];

  return (
    <div className="p-5 space-y-4">
      <div>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: catColor + '20',
            color: catColor,
          }}
        >
          {CATEGORY_LABELS[event.category]}
        </span>
        <h3 className="text-base font-bold text-white mt-2">{event.title}</h3>
        {event.location && (
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </p>
        )}
      </div>

      <p className="text-sm text-stone-300 leading-relaxed">{event.description}</p>

      {event.participants.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
            Participants
          </h4>
          <div className="flex flex-wrap gap-1">
            {event.participants.map(p => (
              <span
                key={p}
                className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700/60"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
          Scripture
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {allRefs.flatMap(ref => splitRefs(ref)).map(ref => (
            <ScriptureLink key={ref} reference={ref} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sidebar intro (default state) ──────────────────────────────
function SidebarIntro() {
  return (
    <div className="p-5 space-y-5">
      <div>
        <h3 className="text-base font-bold text-white">The Road to the Cross</h3>
        <p className="text-sm text-stone-400 mt-2 leading-relaxed">
          Walk through the final week of Jesus' earthly ministry, from the
          Triumphal Entry to the empty tomb. Click on any event to explore its
          details, location, participants, and scripture references.
        </p>
      </div>

      <div>
        <h4 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
          Eight Days
        </h4>
        <div className="flex flex-col gap-1.5">
          {passionWeek.map(day => (
            <div key={day.day} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: day.color }}
              />
              <span className="text-sm text-stone-300 font-medium">{day.day}</span>
              <span className="text-xs text-stone-500 ml-auto">{day.theme}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-stone-800">
        <p className="text-xs text-stone-500 leading-relaxed">
          {passionWeek.reduce((sum, d) => sum + d.events.length, 0)} events across{' '}
          {passionWeek.length} days, each linked to the original scripture text.
        </p>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function PassionWeekPage() {
  const [selectedEvent, setSelectedEvent] = useState<PassionEvent | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelectEvent = (event: PassionEvent) => {
    if (selectedEvent?.id === event.id) {
      setSelectedEvent(null);
      setSidebarOpen(false);
    } else {
      setSelectedEvent(event);
      setSidebarOpen(true);
    }
  };

  // Close mobile sidebar on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        setSelectedEvent(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="flex h-full bg-stone-900">
      {/* Main scrolling content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
        {/* Page title */}
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold text-white">Passion Week</h1>
          <p className="text-sm text-stone-400 mt-1">
            The final week of Jesus' earthly ministry — from Palm Sunday to the Resurrection
          </p>
        </div>

        {/* Day sections */}
        <div className="max-w-3xl space-y-8">
          {passionWeek.map(day => (
            <DaySection
              key={day.day}
              day={day}
              selectedId={selectedEvent?.id ?? null}
              onSelectEvent={handleSelectEvent}
            />
          ))}
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed right-0 top-0 bottom-0 z-40 w-80
          lg:static lg:z-auto lg:w-80 lg:shrink-0
          border-l border-stone-700/80 bg-stone-950 overflow-y-auto
          transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-3 border-b border-stone-800 lg:hidden">
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
            Details
          </span>
          <button
            onClick={() => {
              setSidebarOpen(false);
              setSelectedEvent(null);
            }}
            className="p-1 rounded hover:bg-stone-800 text-stone-500 hover:text-stone-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {selectedEvent ? (
          <SidebarDetail event={selectedEvent} />
        ) : (
          <SidebarIntro />
        )}
      </aside>
    </div>
  );
}
