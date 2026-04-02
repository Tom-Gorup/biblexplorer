export type TribeId =
  | 'judah' | 'levi' | 'benjamin' | 'reuben' | 'simeon'
  | 'gad' | 'issachar' | 'naphtali' | 'manasseh' | 'ephraim'
  | 'asher' | 'dan' | 'zebulun' | 'pre-tribal' | 'edom' | 'ishmael';

export type Significance = 'major' | 'notable' | 'minor';

export type SourceBook = '1chr' | 'matt' | 'luke';

export interface Person {
  id: string;
  name: string;
  alternateNames?: string[];
  tribe?: TribeId;
  significance: Significance;
  description?: string;
  chroniclesRef: string;
  crossReferences?: string[];
  roles?: string[];
  gender?: 'male' | 'female';
  sources: SourceBook[];
}

export interface Relationship {
  source: string; // parent id
  target: string; // child id
}

export interface TribeMeta {
  id: TribeId;
  displayName: string;
  color: string;
  borderColor: string;
  chapter: string;
}
