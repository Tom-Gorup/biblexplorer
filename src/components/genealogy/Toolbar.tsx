interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  onToggleLayout: () => void;
  onClearFocus?: () => void;
  onShowJesusLineage?: () => void;
  layoutDir: 'TB' | 'LR';
  personCount: number;
  visibleCount: number;
  isFocused: boolean;
}

function ToolButton({ onClick, title, children, variant = 'default' }: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'accent';
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all
        ${variant === 'accent'
          ? 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border border-blue-500/20'
          : 'text-stone-400 hover:text-white hover:bg-white/10'
        }
      `}
    >
      {children}
    </button>
  );
}

export function Toolbar({ onZoomIn, onZoomOut, onFit, onToggleLayout, onClearFocus, onShowJesusLineage, layoutDir, personCount, visibleCount, isFocused }: Props) {
  return (
    <div className="absolute bottom-6 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-stone-900/90 backdrop-blur-xl border border-stone-700/80 rounded-2xl px-1 py-1 shadow-2xl shadow-black/40 z-10">
      {/* Jesus lineage button */}
      {!isFocused && onShowJesusLineage && (
        <>
          <ToolButton onClick={onShowJesusLineage} title="Trace the lineage from Adam to Jesus">
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span className="hidden sm:inline text-amber-400">Lineage</span>
          </ToolButton>
          <div className="w-px h-6 bg-stone-700/60 mx-0.5" />
        </>
      )}
      {/* Zoom controls */}
      <div className="flex items-center">
        <ToolButton onClick={onZoomOut} title="Zoom out">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35M8 11h6" />
          </svg>
          <span className="hidden md:inline">Zoom</span>
        </ToolButton>
        <ToolButton onClick={onZoomIn} title="Zoom in">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35M8 11h6M11 8v6" />
          </svg>
        </ToolButton>
      </div>

      <div className="w-px h-6 bg-stone-700/60 mx-0.5" />

      {/* View controls */}
      <div className="flex items-center">
        <ToolButton onClick={onFit} title="Fit entire tree to screen">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
          </svg>
          <span className="hidden md:inline">Fit</span>
        </ToolButton>
        <ToolButton onClick={onToggleLayout} title={layoutDir === 'TB' ? 'Switch to horizontal layout' : 'Switch to vertical layout'}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            {layoutDir === 'TB' ? (
              <>
                <rect x="4" y="3" width="16" height="4" rx="1" />
                <rect x="4" y="10" width="7" height="4" rx="1" />
                <rect x="13" y="10" width="7" height="4" rx="1" />
                <path strokeLinecap="round" d="M12 7v3M8 14v3M16 14v3" />
              </>
            ) : (
              <>
                <rect x="3" y="4" width="4" height="16" rx="1" />
                <rect x="10" y="4" width="4" height="7" rx="1" />
                <rect x="10" y="13" width="4" height="7" rx="1" />
                <path strokeLinecap="round" d="M7 12h3M14 8h3M14 16h3" />
              </>
            )}
          </svg>
          <span className="hidden md:inline">{layoutDir === 'TB' ? 'Vertical' : 'Horizontal'}</span>
        </ToolButton>
      </div>

      {/* Focus indicator */}
      {isFocused && onClearFocus && (
        <>
          <div className="w-px h-6 bg-stone-700/60 mx-0.5" />
          <ToolButton onClick={onClearFocus} title="Clear focus and show full tree" variant="accent">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Clear focus</span>
          </ToolButton>
        </>
      )}

      <div className="w-px h-6 bg-stone-700/60 mx-0.5" />

      {/* People count */}
      <div className="flex items-center gap-1.5 px-2.5 py-2">
        <svg className="w-3.5 h-3.5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-1.053M18 10.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM12.75 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs font-medium tabular-nums">
          {visibleCount < personCount ? (
            <><span className="text-white">{visibleCount}</span><span className="text-stone-600"> / </span><span className="text-stone-500">{personCount}</span></>
          ) : (
            <span className="text-stone-400">{personCount}</span>
          )}
        </span>
      </div>
    </div>
  );
}
