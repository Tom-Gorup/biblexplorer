import type { SourceBook } from '../types';

interface Props {
  value: SourceBook | null;
  onChange: (v: SourceBook | null) => void;
}

const options: { value: SourceBook | null; label: string; desc: string }[] = [
  { value: null, label: 'All Books', desc: 'Everything' },
  { value: '1chr', label: '1 Chronicles', desc: 'Ch 1-9' },
  { value: 'matt', label: 'Matthew 1', desc: 'Royal line' },
  { value: 'luke', label: 'Luke 3', desc: 'Nathan line' },
];

export function SourceFilter({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-2">Source</h3>
      <div className="flex flex-wrap gap-1">
        {options.map(opt => (
          <button
            key={opt.value ?? 'all'}
            onClick={() => onChange(opt.value)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              value === opt.value
                ? 'bg-blue-600 text-white'
                : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200 border border-stone-700'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
