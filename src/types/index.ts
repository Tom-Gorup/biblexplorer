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

// How two people in the genealogy are connected:
// - 'parent': literal parent → child (default when omitted)
// - 'spouse': husband → wife/partner (not a blood line)
// - 'succession': one ruler followed another (Edom's kings were not father-son, Gen 36:31-39)
// - 'descendant': ancestor → later descendant with generations omitted by Scripture or compressed here
// - 'associated': connected by land/nation but not by blood (e.g. Seir the Horite under Edom)
export type RelationType = 'parent' | 'spouse' | 'succession' | 'descendant' | 'associated';

export interface Relationship {
  source: string; // parent id (or spouse/predecessor/ancestor per `type`)
  target: string; // child id (or spouse/successor/descendant per `type`)
  type?: RelationType; // defaults to 'parent'
}

export interface TribeMeta {
  id: TribeId;
  displayName: string;
  bg: string;
  border: string;
  chapter: string;
}
