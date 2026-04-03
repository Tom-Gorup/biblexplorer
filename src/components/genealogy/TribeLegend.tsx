import type { TribeMeta, TribeId } from '../../types';

interface Props {
  tribes: TribeMeta[];
  activeTribe: TribeId | null;
  onTribeClick: (tribe: TribeId | null) => void;
}

export function TribeLegend({ tribes, activeTribe, onTribeClick }: Props) {
  return (
    <div className="space-y-0.5">
      <h3 className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-2">Tribes</h3>
      <button
        onClick={() => onTribeClick(null)}
        className={`w-full text-left px-2 py-1 rounded text-xs flex items-center gap-2 transition-colors ${
          activeTribe === null ? 'bg-stone-700 text-white' : 'text-stone-400 hover:bg-stone-700/50 hover:text-stone-200'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-stone-400 to-stone-600 shrink-0" />
        Show All
      </button>
      {tribes.map(t => (
        <button
          key={t.id}
          onClick={() => onTribeClick(activeTribe === t.id ? null : t.id)}
          className={`w-full text-left px-2 py-1 rounded text-xs flex items-center gap-2 transition-colors ${
            activeTribe === t.id ? 'bg-stone-700 text-white' : 'text-stone-400 hover:bg-stone-700/50 hover:text-stone-200'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.bg, border: `1.5px solid ${t.border}` }} />
          <span className="truncate">{t.displayName}</span>
        </button>
      ))}
    </div>
  );
}
