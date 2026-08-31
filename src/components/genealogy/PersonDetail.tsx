import { useMemo } from 'react';
import type { Core, EdgeSingular, NodeSingular } from 'cytoscape';
import type { Person } from '../../types';
import { tribeColorMap } from '../../utils/tribeColors';
import { toBibleGatewayUrl, splitRefs } from '../../utils/bibleLinks';

interface FamilyMember {
  id: string;
  name: string;
  tribe: string;
  bgColor: string;
  borderColor: string;
  /** True when generations are omitted between this ancestor and the next person in the path */
  gapAfter?: boolean;
}

interface Props {
  person: Person;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onFocusDescendants: (id: string) => void;
  cyRef: React.MutableRefObject<Core | null>;
}

const toMember = (n: NodeSingular): FamilyMember => ({
  id: n.id(),
  name: n.data('label'),
  tribe: n.data('tribe'),
  bgColor: n.data('bgColor'),
  borderColor: n.data('borderColor'),
});

function getAncestryPath(cy: Core, personId: string): FamilyMember[] {
  const path: FamilyMember[] = [];
  let current = cy.getElementById(personId);
  const visited = new Set<string>();
  let isFirstStep = true;
  // Set when the upcoming ancestor is separated from the person below by omitted generations
  let nextHasGapAfter = false;

  while (current.length) {
    const id = current.id();
    if (visited.has(id)) break;
    visited.add(id);

    const member = toMember(current);
    if (nextHasGapAfter) member.gapAfter = true;
    path.unshift(member);

    // Walk upward along genuine lines of descent only. Marriage edges are crossed
    // when tracing a child's paternal line (husband → wife → child), but never as the
    // first step — a person's spouse is not their ancestor. Succession/association
    // edges (Edom's kings, Seir) are never ancestry.
    const inEdges = current.incomers('edge');
    let chosen: EdgeSingular | null = null;
    for (const t of ['parent', 'descendant', 'spouse']) {
      if (t === 'spouse' && isFirstStep) continue;
      const match = inEdges.filter(e => (e.data('type') || 'parent') === t);
      if (match.length > 0) { chosen = match.first() as EdgeSingular; break; }
    }
    if (!chosen) break;

    nextHasGapAfter = (chosen.data('type') || 'parent') === 'descendant';
    current = chosen.source() as unknown as typeof current;
    isFirstStep = false;
  }

  return path;
}

interface Family {
  parents: FamilyMember[];
  children: FamilyMember[];
  spouses: FamilyMember[];
  descendedFrom: FamilyMember[]; // ancestors with generations omitted
  descendantLines: FamilyMember[]; // later descendants with generations omitted
  precededBy: FamilyMember[]; // royal succession
  succeededBy: FamilyMember[];
  associated: FamilyMember[]; // land/nation association, no blood line
}

function getFamily(cy: Core, personId: string): Family {
  const node = cy.getElementById(personId);
  const family: Family = {
    parents: [], children: [], spouses: [], descendedFrom: [],
    descendantLines: [], precededBy: [], succeededBy: [], associated: [],
  };

  node.incomers('edge').forEach((e: EdgeSingular) => {
    const m = toMember(e.source());
    const t = e.data('type') || 'parent';
    if (t === 'parent') family.parents.push(m);
    else if (t === 'spouse') family.spouses.push(m);
    else if (t === 'descendant') family.descendedFrom.push(m);
    else if (t === 'succession') family.precededBy.push(m);
    else family.associated.push(m);
  });

  node.outgoers('edge').forEach((e: EdgeSingular) => {
    const m = toMember(e.target());
    const t = e.data('type') || 'parent';
    if (t === 'parent') family.children.push(m);
    else if (t === 'spouse') family.spouses.push(m);
    else if (t === 'descendant') family.descendantLines.push(m);
    else if (t === 'succession') family.succeededBy.push(m);
    else family.associated.push(m);
  });

  return family;
}

function FamilySection({ title, hint, members, onNavigate }: {
  title: string;
  hint?: string;
  members: FamilyMember[];
  onNavigate: (id: string) => void;
}) {
  if (members.length === 0) return null;
  return (
    <div>
      <h3 className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-1.5">
        {title}
        {hint && <span className="normal-case font-normal tracking-normal text-stone-600"> ({hint})</span>}
      </h3>
      <div className="flex flex-wrap gap-1">
        {members.map(m => (
          <FamilyLink key={m.id} member={m} onClick={() => onNavigate(m.id)} />
        ))}
      </div>
    </div>
  );
}

function FamilyLink({ member, onClick }: { member: FamilyMember; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-700/60 hover:bg-stone-600 text-stone-200 text-xs transition-colors"
    >
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: member.bgColor, border: `1px solid ${member.borderColor}` }} />
      {member.name}
    </button>
  );
}

export function PersonDetail({ person, onClose, onNavigate, onFocusDescendants, cyRef }: Props) {
  const tribe = person.tribe || 'pre-tribal';
  const colors = tribeColorMap[tribe];

  const ancestry = useMemo(() => {
    const cy = cyRef.current;
    if (!cy) return [];
    return getAncestryPath(cy, person.id);
  }, [person.id, cyRef]);

  const family = useMemo(() => {
    const cy = cyRef.current;
    if (!cy) {
      return {
        parents: [], children: [], spouses: [], descendedFrom: [],
        descendantLines: [], precededBy: [], succeededBy: [], associated: [],
      } as Family;
    }
    return getFamily(cy, person.id);
  }, [person.id, cyRef]);
  const { parents, children, spouses, descendedFrom, descendantLines, precededBy, succeededBy, associated } = family;

  return (
    <div className="bg-stone-800 border-t border-stone-600 overflow-y-auto max-h-[60vh] md:max-h-[50vh]">
      {/* Ancestry breadcrumb */}
      {ancestry.length > 1 && (
        <div className="px-4 pt-3 pb-1 overflow-x-auto">
          <div className="flex items-center gap-1 text-xs whitespace-nowrap">
            {ancestry.map((a, i) => (
              <span key={a.id} className="flex items-center gap-1">
                {i > 0 && (ancestry[i - 1].gapAfter
                  ? <span className="text-stone-600" title="Generations omitted">&rsaquo;&#8943;&rsaquo;</span>
                  : <span className="text-stone-600">&rsaquo;</span>
                )}
                {a.id === person.id ? (
                  <span className="text-white font-semibold">{a.name}</span>
                ) : (
                  <button
                    onClick={() => onNavigate(a.id)}
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                  >
                    {a.name}
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 pt-2">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0 border-2"
              style={{ backgroundColor: colors.bg + '33', borderColor: colors.border, color: colors.border }}
            >
              {person.name[0]}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">{person.name}</h2>
              {person.alternateNames && person.alternateNames.length > 0 && (
                <p className="text-stone-400 text-xs">Also: {person.alternateNames.join(', ')}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {(children.length > 0 || descendantLines.length > 0) && (
              <button
                onClick={() => onFocusDescendants(person.id)}
                className="text-stone-400 hover:text-blue-400 p-1 transition-colors"
                title="Focus on descendants"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </button>
            )}
            <button onClick={onClose} className="text-stone-500 hover:text-white p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tribe & Roles */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span
            className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
            style={{ backgroundColor: colors.bg + '33', color: colors.border, border: `1px solid ${colors.border}44` }}
          >
            {tribe.replace(/-/g, ' ')}
          </span>
          {person.significance === 'major' && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-900/40 text-amber-400 border border-amber-700/40">
              Major Figure
            </span>
          )}
          {person.roles?.map(role => (
            <span key={role} className="px-2 py-0.5 rounded-full text-xs bg-stone-700 text-stone-300 capitalize">
              {role}
            </span>
          ))}
          {person.gender === 'female' && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-pink-900/40 text-pink-400 border border-pink-700/40">
              Female
            </span>
          )}
        </div>

        {/* Description */}
        {person.description && (
          <p className="text-stone-300 text-sm leading-relaxed mb-3">{person.description}</p>
        )}

        {/* Family links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <FamilySection title="Parents" members={parents} onNavigate={onNavigate} />
          <FamilySection title="Spouses & Unions" members={spouses} onNavigate={onNavigate} />
          <FamilySection title="Children" members={children} onNavigate={onNavigate} />
          <FamilySection title="Descended From" hint="generations omitted" members={descendedFrom} onNavigate={onNavigate} />
          <FamilySection title="Descendants" hint="generations omitted" members={descendantLines} onNavigate={onNavigate} />
          <FamilySection title="Preceded By" hint="royal succession, not descent" members={precededBy} onNavigate={onNavigate} />
          <FamilySection title="Succeeded By" hint="royal succession, not descent" members={succeededBy} onNavigate={onNavigate} />
          <FamilySection title="Associated With" hint="by land or nation, not blood" members={associated} onNavigate={onNavigate} />
        </div>

        {/* Source reference */}
        <div className="mb-3">
          <h3 className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-1">Read in Scripture</h3>
          <div className="flex flex-wrap gap-1.5">
            {splitRefs(person.chroniclesRef).map(ref => (
              <a
                key={ref}
                href={toBibleGatewayUrl(ref)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 border border-blue-500/20 transition-colors"
              >
                {ref}
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Cross references */}
        {person.crossReferences && person.crossReferences.length > 0 && (
          <div>
            <h3 className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-1">Also Referenced In</h3>
            <div className="flex flex-wrap gap-1.5">
              {person.crossReferences.map(ref => (
                <a
                  key={ref}
                  href={toBibleGatewayUrl(ref)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-0.5 bg-stone-700 text-stone-300 hover:bg-stone-600 hover:text-white rounded font-mono transition-colors"
                >
                  {ref}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
