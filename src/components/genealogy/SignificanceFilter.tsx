interface Props {
  value: 'all' | 'notable' | 'major';
  onChange: (v: 'all' | 'notable' | 'major') => void;
}

const options: { value: 'all' | 'notable' | 'major'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'notable', label: 'Notable+' },
  { value: 'major', label: 'Major' },
];

export function SignificanceFilter({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-2">Detail Level</h3>
      <div className="flex rounded-lg overflow-hidden border border-stone-600">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 px-2 py-1.5 text-xs font-medium transition-colors ${
              value === opt.value
                ? 'bg-blue-600 text-white'
                : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
