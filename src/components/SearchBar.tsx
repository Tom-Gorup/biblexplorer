import { useState, useRef, useEffect } from 'react';
import type { Person } from '../types';
import { tribeColorMap } from '../utils/tribeColors';

interface Props {
  query: string;
  results: Person[];
  onSearch: (q: string) => void;
  onSelect: (id: string) => void;
}

export function SearchBar({ query, results, onSearch, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => { onSearch(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search person..."
          className="w-full pl-9 pr-3 py-2 bg-stone-800 border border-stone-600 rounded-lg text-sm text-white placeholder-stone-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-stone-800 border border-stone-600 rounded-lg shadow-xl max-h-72 overflow-y-auto">
          {results.map(p => {
            const color = tribeColorMap[p.tribe || 'pre-tribal'];
            return (
              <li key={p.id}>
                <button
                  onClick={() => { onSelect(p.id); setOpen(false); }}
                  className="w-full px-3 py-2 text-left hover:bg-stone-700 flex items-center gap-2 text-sm"
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color.bg, border: `1.5px solid ${color.border}` }} />
                  <span className="text-white font-medium">{p.name}</span>
                  {p.tribe && <span className="text-stone-500 text-xs ml-auto capitalize">{p.tribe}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
