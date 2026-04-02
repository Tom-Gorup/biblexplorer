interface Props {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: Props) {
  return (
    <header className="bg-stone-900/95 backdrop-blur-sm text-white px-4 md:px-6 py-3 flex items-center justify-between shrink-0 z-20 border-b border-stone-700/80">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1.5 hover:bg-white/10 rounded-lg text-stone-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="flex items-center gap-2.5">
          {/* Icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-600/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm md:text-base font-semibold tracking-tight leading-tight">
              Biblical Genealogy
            </h1>
            <p className="text-[10px] md:text-xs text-stone-500 leading-tight">From Adam to Jesus &middot; Interactive Family Tree</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-stone-600 bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700/60">ESV</span>
      </div>
    </header>
  );
}
