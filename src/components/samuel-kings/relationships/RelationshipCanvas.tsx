import { useEffect, useRef, useState, useCallback } from 'react';
import cytoscape from 'cytoscape';
import type { Core } from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { skCytoscapeStyles } from '../../../styles/sk-cytoscape-styles';

cytoscape.use(fcose);

interface TooltipData {
  x: number;
  y: number;
  name: string;
  role: string;
  description: string;
}

interface Props {
  elements: any[];
  selectedId: string | null;
  onSelectCharacter: (id: string | null) => void;
  hiddenTypes: Set<string>;
}

export function RelationshipCanvas({ elements, selectedId, onSelectCharacter, hiddenTypes }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: skCytoscapeStyles as any,
      minZoom: 0.2,
      maxZoom: 3,
      wheelSensitivity: 0.3,
    });

    cyRef.current = cy;

    const layout = cy.layout({
      name: 'fcose',
      animate: false,
      quality: 'default',
      randomize: true,
      nodeRepulsion: 8000,
      idealEdgeLength: 120,
      edgeElasticity: 0.1,
      gravity: 0.25,
      fit: true,
      padding: 50,
    } as any);

    layout.one('layoutstop', () => setLoading(false));
    layout.run();

    cy.on('tap', 'node', e => {
      onSelectCharacter(e.target.id());
      setTooltip(null);
    });

    cy.on('tap', e => { if (e.target === cy) onSelectCharacter(null); });

    cy.on('mouseover', 'node', e => {
      const node = e.target;
      const rp = node.renderedPosition();
      const rect = containerRef.current!.getBoundingClientRect();
      setTooltip({
        x: rp.x + rect.left,
        y: rp.y + rect.top - 10,
        name: node.data('label'),
        role: node.data('role'),
        description: node.data('description'),
      });
    });

    cy.on('mouseout', 'node', () => setTooltip(null));
    cy.on('viewport', () => setTooltip(null));

    cy.on('zoom', () => {
      const zoom = cy.zoom();
      cy.batch(() => {
        cy.nodes('[significance="minor"]').style('label', zoom > 0.6 ? 'data(label)' : '');
        cy.nodes('[significance="notable"]').style('label', zoom > 0.3 ? 'data(label)' : '');
      });
    });

    return () => { cy.destroy(); cyRef.current = null; };
  }, [elements, onSelectCharacter]);

  // Highlight selected
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.nodes().removeClass('highlighted');
    if (selectedId) {
      const node = cy.getElementById(selectedId);
      if (node.length) { node.addClass('highlighted'); node.select(); }
    } else {
      cy.nodes().unselect();
    }
  }, [selectedId]);

  // Filter edges by relationship type
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.batch(() => {
      cy.edges().forEach(edge => {
        if (hiddenTypes.has(edge.data('relType'))) {
          edge.addClass('hidden');
        } else {
          edge.removeClass('hidden');
        }
      });
    });
  }, [hiddenTypes]);

  const handleFit = useCallback(() => { cyRef.current?.fit(undefined, 50); }, []);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900/80 z-20">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-stone-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-stone-400 text-sm">Building relationship web...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full bg-stone-900" />

      {/* Fit button */}
      <button
        onClick={handleFit}
        className="absolute bottom-4 right-4 p-2 bg-stone-800/90 backdrop-blur border border-stone-700 rounded-lg text-stone-400 hover:text-white transition-colors z-10"
        title="Fit to screen"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
        </svg>
      </button>

      {/* Tooltip */}
      {tooltip && (
        <div className="fixed z-50 pointer-events-none" style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}>
          <div className="bg-stone-800 border border-stone-600 rounded-lg shadow-xl px-3 py-2 max-w-64 mb-2">
            <p className="text-white font-semibold text-sm">{tooltip.name}</p>
            <p className="text-stone-500 text-xs capitalize">{tooltip.role.replace(/-/g, ' ')}</p>
            {tooltip.description && <p className="text-stone-400 text-xs leading-snug line-clamp-2 mt-1">{tooltip.description}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
