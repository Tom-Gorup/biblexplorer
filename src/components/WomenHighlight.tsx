interface Props {
  active: boolean;
  onToggle: () => void;
}

const WOMEN = ['Tamar', 'Rahab', 'Ruth', 'Bathsheba', 'Mary'];

export function WomenHighlight({ active, onToggle }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-stone-500 text-xs font-semibold uppercase tracking-wider">Women of Christ's Line</h3>
        <button
          onClick={onToggle}
          className={`
            relative w-8 h-[18px] rounded-full transition-colors
            ${active ? 'bg-pink-500/40' : 'bg-stone-700'}
          `}
        >
          <span className={`
            absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full transition-transform
            ${active ? 'translate-x-3.5 bg-pink-400' : 'translate-x-0 bg-stone-500'}
          `} />
        </button>
      </div>
      {active && (
        <div className="flex flex-wrap gap-1">
          {WOMEN.map(name => (
            <span
              key={name}
              className="text-[11px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20"
            >
              {name}
            </span>
          ))}
        </div>
      )}
      {!active && (
        <p className="text-stone-600 text-[11px]">5 women Matthew highlights in Jesus' genealogy</p>
      )}
    </div>
  );
}
