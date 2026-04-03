import { useEffect, useRef, useState, useCallback } from 'react';
import cytoscape from 'cytoscape';
import type { Core } from 'cytoscape';
import dagre from 'cytoscape-dagre';
import type { CytoscapeElement } from '../../utils/buildGraph';
import { cytoscapeStyles } from '../../styles/cytoscape-styles';
import { ZOOM_LIMITS } from '../../utils/constants';

// Register dagre layout
cytoscape.use(dagre);

const ERA_ANCHORS = [
  { label: 'Pre-Flood', anchor: 'adam', color: '#10b981' },
  { label: 'Post-Flood', anchor: 'noah', color: '#6366f1' },
  { label: 'Patriarchs', anchor: 'abraham', color: '#f59e0b' },
  { label: 'Israel\u2019s Tribes', anchor: 'judah', color: '#a855f7' },
  { label: 'Kingdom', anchor: 'david', color: '#ef4444' },
  { label: 'Exile', anchor: 'jehoiachin', color: '#14b8a6' },
  { label: 'Return', anchor: 'zerubbabel', color: '#0ea5e9' },
  { label: 'Christ', anchor: 'jesus', color: '#fbbf24' },
];

interface TooltipData {
  x: number;
  y: number;
  name: string;
  tribe: string;
  significance: string;
  description: string;
  bgColor: string;
  borderColor: string;
}

interface EraMarker {
  label: string;
  y: number;
  color: string;
}

interface Props {
  elements: CytoscapeElement[];
  selectedId: string | null;
  onSelectPerson: (id: string | null) => void;
  layoutDir: 'TB' | 'LR';
  cyRef: React.MutableRefObject<Core | null>;
  significanceFilter: 'all' | 'notable' | 'major';
  sourceFilter: string | null;
  onReady?: () => void;
}

export function TreeCanvas({ elements, selectedId, onSelectPerson, layoutDir, cyRef, significanceFilter, sourceFilter, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [eraMarkers, setEraMarkers] = useState<EraMarker[]>([]);

  const updateEraPositions = useCallback((cy: Core, dir: 'TB' | 'LR') => {
    if (dir !== 'TB') { setEraMarkers([]); return; }
    const zoom = cy.zoom();
    if (zoom < 0.1) { setEraMarkers([]); return; }

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const markers = ERA_ANCHORS.map(era => {
      const node = cy.getElementById(era.anchor);
      if (!node.length) return null;
      const rp = node.renderedPosition();
      // Only show if within the visible viewport (with some padding)
      if (rp.y < -30 || rp.y > containerRect.height + 30) return null;
      return { label: era.label, y: rp.y, color: era.color };
    }).filter(Boolean) as EraMarker[];

    setEraMarkers(markers);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: elements as any,
      style: cytoscapeStyles as any,
      minZoom: ZOOM_LIMITS.min,
      maxZoom: ZOOM_LIMITS.max,
      wheelSensitivity: 0.3,
      textureOnViewport: true,
      hideEdgesOnViewport: true,
    });

    cyRef.current = cy;

    // Run layout
    const layout = cy.layout({
      name: 'dagre',
      rankDir: layoutDir,
      nodeSep: 60,
      rankSep: 90,
      edgeSep: 20,
      animate: false,
      fit: true,
      padding: 50,
    } as any);

    layout.one('layoutstop', () => {
      setLoading(false);
      updateEraPositions(cy, layoutDir);
      onReady?.();
    });

    layout.run();

    // Click handler
    cy.on('tap', 'node', (e) => {
      const nodeId = e.target.id();
      onSelectPerson(nodeId);
      setTooltip(null);
    });

    cy.on('tap', (e) => {
      if (e.target === cy) {
        onSelectPerson(null);
      }
    });

    // Hover tooltip
    cy.on('mouseover', 'node', (e) => {
      const node = e.target;
      const nodeId = node.id();
      if (nodeId === selectedId) return;
      const rp = node.renderedPosition();
      const container = containerRef.current!.getBoundingClientRect();
      setTooltip({
        x: rp.x + container.left,
        y: rp.y + container.top - 10,
        name: node.data('label'),
        tribe: node.data('tribe'),
        significance: node.data('significance'),
        description: node.data('description'),
        bgColor: node.data('bgColor'),
        borderColor: node.data('borderColor'),
      });
      node.style('cursor', 'pointer');
    });

    cy.on('mouseout', 'node', () => {
      setTooltip(null);
    });

    // Hide tooltip and update era markers on pan/zoom
    cy.on('viewport', () => {
      setTooltip(null);
      updateEraPositions(cy, layoutDir);
    });

    // Level of detail: show/hide labels based on zoom
    cy.on('zoom', () => {
      const zoom = cy.zoom();
      cy.batch(() => {
        cy.nodes('[significance="minor"]').style(
          'label',
          zoom > 0.5 ? 'data(label)' : ''
        );
        cy.nodes('[significance="notable"]').style(
          'label',
          zoom > 0.2 ? 'data(label)' : ''
        );
      });
    });

    return () => {
      cy.destroy();
      cyRef.current = null;
    };
  }, [elements, layoutDir]); // eslint-disable-line react-hooks/exhaustive-deps

  // Highlight selected node
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.nodes().removeClass('highlighted');

    if (selectedId) {
      const node = cy.getElementById(selectedId);
      if (node.length) {
        node.addClass('highlighted');
        node.select();
      }
    } else {
      cy.nodes().unselect();
    }
  }, [selectedId, cyRef]);

  // Significance filter
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.batch(() => {
      cy.nodes().removeClass('sig-hidden');
      cy.edges().removeClass('sig-hidden');

      if (significanceFilter === 'notable') {
        cy.nodes('[significance="minor"]').addClass('sig-hidden');
      } else if (significanceFilter === 'major') {
        cy.nodes('[significance="minor"]').addClass('sig-hidden');
        cy.nodes('[significance="notable"]').addClass('sig-hidden');
      }

      if (significanceFilter !== 'all') {
        cy.edges().forEach(edge => {
          const src = edge.source();
          const tgt = edge.target();
          if (src.hasClass('sig-hidden') || tgt.hasClass('sig-hidden')) {
            edge.addClass('sig-hidden');
          }
        });
      }
    });
  }, [significanceFilter, cyRef]);

  // Source book filter
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.batch(() => {
      cy.nodes().removeClass('source-hidden');
      cy.edges().removeClass('source-hidden');

      if (sourceFilter) {
        cy.nodes().forEach(node => {
          const sources: string[] = node.data('sources') || ['1chr'];
          if (!sources.includes(sourceFilter)) {
            node.addClass('source-hidden');
          }
        });
        cy.edges().forEach(edge => {
          if (edge.source().hasClass('source-hidden') || edge.target().hasClass('source-hidden')) {
            edge.addClass('source-hidden');
          }
        });
      }
    });
  }, [sourceFilter, cyRef]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900/80 z-20">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-stone-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-stone-400 text-sm">Building family tree...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full bg-stone-900" />

      {/* Era markers */}
      {eraMarkers.map(marker => (
        <div
          key={marker.label}
          className="absolute left-2 pointer-events-none z-[5]"
          style={{ top: marker.y, transform: 'translateY(-50%)' }}
        >
          <div className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-sm rounded-full px-2.5 py-1">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: marker.color }} />
            <span className="text-[10px] font-semibold tracking-wide uppercase whitespace-nowrap" style={{ color: marker.color + 'cc' }}>
              {marker.label}
            </span>
          </div>
        </div>
      ))}

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}
        >
          <div className="bg-stone-800 border border-stone-600 rounded-lg shadow-xl px-3 py-2 max-w-64 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: tooltip.bgColor, border: `1.5px solid ${tooltip.borderColor}` }} />
              <span className="text-white font-semibold text-sm">{tooltip.name}</span>
              <span className="text-stone-500 text-xs capitalize ml-auto">{tooltip.tribe.replace(/-/g, ' ')}</span>
            </div>
            {tooltip.description && (
              <p className="text-stone-400 text-xs leading-snug line-clamp-2">{tooltip.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
