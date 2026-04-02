import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import type { Core } from 'cytoscape';
import type { TribeId, SourceBook } from './types';
import { allPersons } from './data/genealogy';
import { allRelationships } from './data/relationships';
import { tribes } from './data/tribes';
import { buildGraph } from './utils/buildGraph';
import { useSelectedPerson } from './hooks/useSelectedPerson';
import { useSearch } from './hooks/useSearch';
import { Header } from './components/Header';
import { TreeCanvas } from './components/TreeCanvas';
import { SearchBar } from './components/SearchBar';
import { PersonDetail } from './components/PersonDetail';
import { TribeLegend } from './components/TribeLegend';
import { SignificanceFilter } from './components/SignificanceFilter';
import { SourceFilter } from './components/SourceFilter';
import { Toolbar } from './components/Toolbar';
import { WomenHighlight } from './components/WomenHighlight';

const WOMEN_IDS = ['tamar', 'rahab', 'ruth', 'bathsheba', 'mary'];

function readUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    person: params.get('person'),
    tribe: params.get('tribe') as TribeId | null,
    significance: (params.get('detail') as 'all' | 'notable' | 'major') || 'all',
    source: params.get('book') as SourceBook | null,
    focus: params.get('focus'),
  };
}

function App() {
  const initialParams = useMemo(readUrlParams, []);

  const cyRef = useRef<Core | null>(null);
  const [layoutDir, setLayoutDir] = useState<'TB' | 'LR'>('TB');
  const [activeTribe, setActiveTribe] = useState<TribeId | null>(initialParams.tribe);
  const [significanceFilter, setSignificanceFilter] = useState<'all' | 'notable' | 'major'>(initialParams.significance);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<SourceBook | null>(initialParams.source);
  const [visibleCount, setVisibleCount] = useState(allPersons.length);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [womenHighlighted, setWomenHighlighted] = useState(true);

  const elements = useMemo(() => buildGraph(allPersons, allRelationships), []);
  const { selectedPerson, selectedId, selectPerson } = useSelectedPerson(allPersons);
  const { query, results, search } = useSearch(allPersons);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedId) params.set('person', selectedId);
    if (activeTribe) params.set('tribe', activeTribe);
    if (significanceFilter !== 'all') params.set('detail', significanceFilter);
    if (sourceFilter) params.set('book', sourceFilter);
    if (focusedId) params.set('focus', focusedId);

    const url = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', url);
  }, [selectedId, activeTribe, significanceFilter, sourceFilter, focusedId]);

  const handleSelect = useCallback((id: string) => {
    selectPerson(id);
    setSidebarOpen(false);
    const cy = cyRef.current;
    if (cy) {
      const node = cy.getElementById(id);
      if (node.length) {
        cy.animate({
          center: { eles: node },
          zoom: 1.5,
        }, { duration: 400 });
      }
    }
  }, [selectPerson]);

  const handleTribeFilter = useCallback((tribe: TribeId | null) => {
    setActiveTribe(tribe);
    const cy = cyRef.current;
    if (!cy) return;

    cy.batch(() => {
      if (tribe === null) {
        cy.elements().removeClass('dimmed tribe-active');
      } else {
        cy.elements().addClass('dimmed').removeClass('tribe-active');
        const tribeNodes = cy.nodes(`[tribe="${tribe}"]`);
        tribeNodes.removeClass('dimmed').addClass('tribe-active');
        tribeNodes.connectedEdges().removeClass('dimmed').addClass('tribe-active');
      }
    });
  }, []);

  const handleFocusDescendants = useCallback((id: string) => {
    const cy = cyRef.current;
    if (!cy) return;

    setFocusedId(id);
    const root = cy.getElementById(id);
    const subtree = root.successors().union(root);
    const subtreeNodes = subtree.nodes();
    setVisibleCount(subtreeNodes.length);

    cy.batch(() => {
      cy.elements().addClass('dimmed').removeClass('tribe-active');
      subtree.removeClass('dimmed');
      subtree.connectedEdges().filter(e => subtree.contains(e.source()) && subtree.contains(e.target())).removeClass('dimmed');
    });

    cy.animate({ fit: { eles: subtree, padding: 50 } }, { duration: 400 });
  }, []);

  const handleShowJesusLineage = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;

    const jesus = cy.getElementById('jesus');
    if (!jesus.length) return;

    const path = cy.collection();
    let current = jesus;
    const visited = new Set<string>();

    while (current.length) {
      const id = current.id();
      if (visited.has(id)) break;
      visited.add(id);
      path.merge(current);

      const parents = current.incomers('node');
      if (parents.length === 0) break;
      current = parents.first() as any;
    }

    const pathEdges = cy.edges().filter(e => path.contains(e.source()) && path.contains(e.target()));
    const fullPath = path.union(pathEdges);

    setFocusedId('jesus-lineage');
    setVisibleCount(path.nodes().length);

    cy.batch(() => {
      cy.elements().addClass('dimmed').removeClass('tribe-active');
      fullPath.removeClass('dimmed');
    });

    cy.animate({ fit: { eles: fullPath, padding: 50 } }, { duration: 600 });
  }, []);

  const handleToggleWomen = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;

    setWomenHighlighted(prev => {
      const next = !prev;
      cy.batch(() => {
        if (next) {
          WOMEN_IDS.forEach(id => {
            const node = cy.getElementById(id);
            if (node.length) node.addClass('women-lineage');
          });
        } else {
          cy.nodes().removeClass('women-lineage');
        }
      });
      return next;
    });
  }, []);

  const handleClearFocus = useCallback(() => {
    setFocusedId(null);
    setVisibleCount(allPersons.length);
    const cy = cyRef.current;
    if (!cy) return;

    cy.batch(() => {
      cy.elements().removeClass('dimmed tribe-active');
    });

    if (activeTribe) {
      handleTribeFilter(activeTribe);
    }
  }, [activeTribe, handleTribeFilter]);

  // Apply initial state after tree is ready (URL params + default women highlight)
  const handleTreeReady = useCallback(() => {
    // Apply default women highlight
    const cy = cyRef.current;
    if (cy) {
      cy.batch(() => {
        WOMEN_IDS.forEach(id => {
          const node = cy.getElementById(id);
          if (node.length) node.addClass('women-lineage');
        });
      });
    }

    const params = readUrlParams();
    if (params.person) {
      handleSelect(params.person);
    }
    if (params.tribe) {
      handleTribeFilter(params.tribe);
    }
    if (params.focus === 'jesus-lineage') {
      handleShowJesusLineage();
    } else if (params.focus) {
      handleFocusDescendants(params.focus);
    }
  }, [handleSelect, handleTribeFilter, handleShowJesusLineage, handleFocusDescendants]);

  const zoomIn = useCallback(() => {
    const cy = cyRef.current;
    if (cy) {
      const w = cy.width(), h = cy.height();
      cy.zoom({ level: cy.zoom() * 1.4, renderedPosition: { x: w / 2, y: h / 2 } });
    }
  }, []);

  const zoomOut = useCallback(() => {
    const cy = cyRef.current;
    if (cy) {
      const w = cy.width(), h = cy.height();
      cy.zoom({ level: cy.zoom() / 1.4, renderedPosition: { x: w / 2, y: h / 2 } });
    }
  }, []);

  const fit = useCallback(() => {
    const cy = cyRef.current;
    if (cy) cy.fit(cy.elements(), 50);
  }, []);

  const toggleLayout = useCallback(() => {
    setLayoutDir(d => d === 'TB' ? 'LR' : 'TB');
  }, []);

  return (
    <div className="flex flex-col h-dvh w-screen bg-stone-900">
      <Header onMenuToggle={() => setSidebarOpen(o => !o)} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:relative z-40 md:z-auto
          w-72 md:w-64 h-full
          border-r border-stone-700 flex flex-col overflow-hidden shrink-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `} style={{ backgroundColor: '#1c1c22' }}>
          <div className="p-3 border-b border-stone-700">
            <SearchBar query={query} results={results} onSearch={search} onSelect={handleSelect} />
          </div>
          <div className="p-3 border-b border-stone-700">
            <SourceFilter value={sourceFilter} onChange={setSourceFilter} />
          </div>
          <div className="p-3 border-b border-stone-700">
            <SignificanceFilter value={significanceFilter} onChange={setSignificanceFilter} />
          </div>
          <div className="p-3 border-b border-stone-700">
            <WomenHighlight active={womenHighlighted} onToggle={handleToggleWomen} />
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <TribeLegend tribes={tribes} activeTribe={activeTribe} onTribeClick={handleTribeFilter} />
          </div>
          <div className="p-3 border-t border-stone-700">
            <p className="text-stone-600 text-xs text-center">Pan: drag &middot; Zoom: pinch/scroll &middot; Tap: details</p>
          </div>
        </aside>

        {/* Main area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <TreeCanvas
            elements={elements}
            selectedId={selectedId}
            onSelectPerson={selectPerson}
            layoutDir={layoutDir}
            cyRef={cyRef}
            significanceFilter={significanceFilter}
            sourceFilter={sourceFilter}
            onReady={handleTreeReady}
          />
          <Toolbar
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onFit={fit}
            onToggleLayout={toggleLayout}
            onClearFocus={handleClearFocus}
            onShowJesusLineage={handleShowJesusLineage}
            layoutDir={layoutDir}
            personCount={allPersons.length}
            visibleCount={visibleCount}
            isFocused={focusedId !== null}
          />
          {selectedPerson && (
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <PersonDetail
                person={selectedPerson}
                onClose={() => selectPerson(null)}
                onNavigate={handleSelect}
                onFocusDescendants={handleFocusDescendants}
                cyRef={cyRef}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
