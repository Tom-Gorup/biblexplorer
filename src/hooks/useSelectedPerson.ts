import { useState, useCallback } from 'react';
import type { Person } from '../types';

export function useSelectedPerson(persons: Person[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const personMap = new Map(persons.map(p => [p.id, p]));

  const selectedPerson = selectedId ? personMap.get(selectedId) || null : null;

  const selectPerson = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  return { selectedPerson, selectedId, selectPerson };
}
