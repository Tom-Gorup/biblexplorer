import { NavLink } from 'react-router-dom';

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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-600/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-sm md:text-base font-semibold tracking-tight leading-tight">
            Bible Explorer
          </h1>
        </div>
      </div>
      <nav className="flex items-center gap-1">
        <NavLink
          to="/genealogy"
          className={({ isActive }) =>
            `px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              isActive ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-stone-400 hover:text-white hover:bg-white/10'
            }`
          }
        >
          Genealogy
        </NavLink>
        <NavLink
          to="/samuel-kings"
          className={({ isActive }) =>
            `px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              isActive ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-stone-400 hover:text-white hover:bg-white/10'
            }`
          }
        >
          Samuel &amp; Kings
        </NavLink>
        <NavLink
          to="/easter"
          className={({ isActive }) =>
            `px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              isActive ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-stone-400 hover:text-white hover:bg-white/10'
            }`
          }
        >
          Easter
        </NavLink>
        <span className="text-[10px] font-mono text-stone-600 bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700/60 ml-2">ESV</span>
        <a
          href="https://github.com/Tom-Gorup/biblexplorer"
          target="_blank"
          rel="noopener noreferrer"
          title="Open source on GitHub — spot an inaccuracy? Report it or open a pull request"
          className="ml-1 p-1.5 rounded-md text-stone-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-label="GitHub repository">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
