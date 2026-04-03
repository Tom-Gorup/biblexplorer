export type Kingdom = 'united' | 'israel' | 'judah';
export type CharacterRole = 'king' | 'prophet' | 'priest' | 'military' | 'queen' | 'official' | 'foreign-king';
export type RelationTypeSK = 'ally' | 'enemy' | 'marriage' | 'parent-child' | 'succession' | 'prophet-to-king' | 'betrayal' | 'murder' | 'counsel' | 'judgment' | 'anointing' | 'rebellion' | 'treaty';
export type EventCategory = 'battle' | 'prophecy' | 'coronation' | 'death' | 'treaty' | 'construction' | 'idolatry' | 'reform' | 'siege' | 'exile' | 'miracle' | 'journey';
export type SourceBookSK = '1sam' | '2sam' | '1kgs' | '2kgs';
export type KingAssessment = 'good' | 'evil' | 'mixed';

export interface SKCharacter {
  id: string;
  name: string;
  alternateNames?: string[];
  role: CharacterRole;
  kingdom?: Kingdom;
  significance: 'major' | 'notable' | 'minor';
  description: string;
  sources: SourceBookSK[];
  primaryRef: string;
  crossReferences?: string[];
  roles?: string[];
}

export interface King extends SKCharacter {
  role: 'king' | 'queen';
  kingdom: Kingdom;
  reignStart: number;
  reignEnd: number;
  reignYears: number;
  orderInKingdom: number;
  assessment: KingAssessment;
  endOfReign: string;
  contemporaryKings?: string[];
  contemporaryProphets?: string[];
}

export interface SKRelationship {
  source: string;
  target: string;
  type: RelationTypeSK;
  description?: string;
  ref?: string;
  bidirectional?: boolean;
}

export interface SKEvent {
  id: string;
  name: string;
  category: EventCategory;
  year: number;
  yearEnd?: number;
  description: string;
  location?: string;
  participants: string[];
  sources: SourceBookSK[];
  primaryRef: string;
  significance: 'major' | 'notable' | 'minor';
}

export interface SKLocation {
  id: string;
  name: string;
  modernName?: string;
  x: number;
  y: number;
  kingdom?: Kingdom;
  description?: string;
}

export interface ArcPoint {
  year: number;
  influence: number;
  label: string;
  ref: string;
}
