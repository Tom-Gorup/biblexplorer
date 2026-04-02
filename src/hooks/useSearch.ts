import { useMemo, useState, useCallback } from 'react';
import Fuse from 'fuse.js';
import type { Person } from '../types';

export function useSearch(persons: Person[]) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(persons, {
    keys: [
      { name: 'name', weight: 2 },
      { name: 'alternateNames', weight: 1.5 },
      { name: 'description', weight: 0.5 },
      { name: 'roles', weight: 0.8 },
    ],
    threshold: 0.35,
    includeScore: true,
  }), [persons]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 20).map(r => r.item);
  }, [fuse, query]);

  const search = useCallback((q: string) => setQuery(q), []);

  return { query, results, search };
}
