'use client';

import React, { useCallback, useRef, useState } from 'react';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import CustomNode from './CustomNode';
import ShapeSelector from './ShapeSelector';
import Legend from './Legend';

import '@xyflow/react/dist/style.css';
import './flowchart.css';

interface FlowchartData {
  nodes: Node[];
  edges: Edge[];
}

const nodeTypes = {
  custom: CustomNode,
};

const initialFlowchartData: FlowchartData = {
  nodes: [
    {
      id: 'AccueilGroup',
      type: 'group',
      data: { label: 'Accueil Page' },
      position: { x: -500, y: -50 },
      style: {
        width: 400,
        height: 500,
        background: 'linear-gradient(to bottom, blue, black)',
        border: '2px solid #06b6d4',
        borderRadius: 16,
        zIndex: -1,
      },
    },
    {
      id: 'CatalogueDeVinsGroup',
      type: 'group',
      data: { label: 'Catalogue de Vins' },
      position: { x: 0, y: -50 },
      style: {
        width: 400,
        height: 500,
        background: 'linear-gradient(to bottom, blue, black)',
        border: '2px solid #06b6d4',
        borderRadius: 16,
        zIndex: -1,
      },
    },
    {
      id: 'FicheDetailleeGroup',
      type: 'group',
      data: { label: 'Fiche Détaillée' },
      position: { x: 500, y: -50 },
      style: {
        width: 400,
        height: 500,
        background: 'linear-gradient(to bottom, blue, black)',
        border: '2px solid #06b6d4',
        borderRadius: 16,
        zIndex: -1,
      },
    },
    {
      id: 'ContactGroup',
      type: 'group',
      data: { label: 'Contact' },
      position: { x: 1000, y: -50 },
      style: {
        width: 400,
        height: 500,
        background: 'linear-gradient(to bottom, blue, black)',
        border: '2px solid #06b6d4',
        borderRadius: 16,
        zIndex: -1,
      },
    },

    // --- Children: AccueilGroup ---
    {
      id: 'Accueil',
      type: 'custom',
      data: { label: 'Accueil' },
      position: { x: 100, y: 50 },
      parentId: 'AccueilGroup',
      extent: 'parent',
    },
    {
      id: 'Validation1',
      type: 'custom',
      data: { label: 'Authentification requise' },
      position: { x: 250, y: 150 },
      parentId: 'AccueilGroup',
      extent: 'parent',
    },
    {
      id: 'Erreur1',
      type: 'custom',
      data: { label: 'Erreur de chargement' },
      position: { x: 100, y: 250 },
      parentId: 'AccueilGroup',
      extent: 'parent',
    },

    // --- Children: CatalogueDeVinsGroup ---
    {
      id: 'CatalogueDeVins',
      type: 'custom',
      data: { label: 'Catalogue de Vins' },
      position: { x: 100, y: 50 },
      parentId: 'CatalogueDeVinsGroup',
      extent: 'parent',
    },
    {
      id: 'Validation2',
      type: 'custom',
      data: { label: 'Authentification requise' },
      position: { x: 250, y: 150 },
      parentId: 'CatalogueDeVinsGroup',
      extent: 'parent',
    },
    {
      id: 'Erreur2',
      type: 'custom',
      data: { label: 'Indisponibilité des détails' },
      position: { x: 100, y: 250 },
      parentId: 'CatalogueDeVinsGroup',
      extent: 'parent',
    },

    // --- Children: FicheDetailleeGroup ---
    {
      id: 'FicheDetaillee',
      type: 'custom',
      data: { label: 'Fiche Détaillée' },
      position: { x: 100, y: 50 },
      parentId: 'FicheDetailleeGroup',
      extent: 'parent',
    },
    {
      id: 'Validation3',
      type: 'custom',
      data: { label: 'Authentification requise' },
      position: { x: 250, y: 150 },
      parentId: 'FicheDetailleeGroup',
      extent: 'parent',
    },
    {
      id: 'Erreur3',
      type: 'custom',
      data: { label: 'Problème de chargement' },
      position: { x: 100, y: 250 },
      parentId: 'FicheDetailleeGroup',
      extent: 'parent',
    },

    // --- Children: ContactGroup ---
    {
      id: 'Contact',
      type: 'custom',
      data: { label: 'Contact' },
      position: { x: 100, y: 50 },
      parentId: 'ContactGroup',
      extent: 'parent',
    },
  ],

  edges: [
    { id: 'e1', source: 'Accueil', target: 'CatalogueDeVins', label: "Clic sur 'Catalogue de vins'" },
    { id: 'e2', source: 'CatalogueDeVins', target: 'FicheDetaillee', label: "Clic sur une bouteille" },
    { id: 'e3', source: 'FicheDetaillee', target: 'Contact', label: "Clic sur 'Contact'" },
    { id: 'e4', source: 'Accueil', target: 'Validation1' },
    { id: 'e5', source: 'CatalogueDeVins', target: 'Validation2' },
    { id: 'e6', source: 'FicheDetaillee', target: 'Validation3' },
    { id: 'e7', source: 'Accueil', target: 'Erreur1', label: 'Erreur de chargement' },
    { id: 'e8', source: 'CatalogueDeVins', target: 'Erreur2', label: 'Indisponibilité des détails' },
    { id: 'e9', source: 'FicheDetaillee', target: 'Erreur3', label: 'Problème de chargement' },
  ],
};


let id = 1;
const getId = () => `${id++}`;
const nodeOrigin: [number, number] = [0.5, 0];

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlowchartData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlowchartData.edges);
  const { screenToFlowPosition } = useReactFlow();
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [pendingConnection, setPendingConnection] = useState<any>(null);

  // Keep a ref to the current flowchart data to avoid infinite loops
  const flowchartDataRef = useRef<FlowchartData>({
    nodes: initialFlowchartData.nodes,
    edges: initialFlowchartData.edges,
  });

  // Update the ref whenever nodes or edges change
  React.useEffect(() => {
    flowchartDataRef.current = {
      nodes,
      edges,
    };
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [],
  );

  const handleLabelChange = useCallback((nodeId: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          };
        }
        return node;
      }),
    );
  }, []);

  const createNode = useCallback(
    (shape: 'circle' | 'triangle' | 'square', position: { x: number; y: number }, connectionState: any) => {
      const id = getId();
      const newNode: Node = {
        id,
        type: 'custom',
        position,
        data: {
          label: `Node ${id}`,
          onChange: handleLabelChange,
          shape,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      if (connectionState) {
        setEdges((eds) => [
          ...eds,
          {
            id,
            source: connectionState.fromNode.id,
            target: id,
            type: 'default',
          },
        ]);
      }
    },
    [handleLabelChange],
  );

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent, connectionState: any) => {
      if (!connectionState.isValid && connectionState.fromNode) {
        event.preventDefault();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        
        // Set the popup position and store the connection state
        setPopupPosition({ x: clientX, y: clientY });
        setPendingConnection(connectionState);
      }
    },
    [],
  );

  const handleShapeSelect = useCallback(
    (shape: 'circle' | 'triangle' | 'square') => {
      if (popupPosition && pendingConnection) {
        const position = screenToFlowPosition({
          x: popupPosition.x,
          y: popupPosition.y,
        });
        createNode(shape, position, pendingConnection);
      }
      setPopupPosition(null);
      setPendingConnection(null);
    },
    [popupPosition, pendingConnection, createNode, screenToFlowPosition],
  );

  const handlePopupClose = useCallback(() => {
    setPopupPosition(null);
    setPendingConnection(null);
  }, []);

  // Update nodes with onChange handler only once on mount
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onChange: handleLabelChange,
          shape: node.data.shape || 'square', // Default shape for existing nodes
        },
      })),
    );
  }, []);

  // Function to get the current flowchart data for API calls
  const getFlowchartDataForAPI = () => {
    return flowchartDataRef.current;
  };

  return (
    <div className="flowchart-container" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
      >
        <Background />
      </ReactFlow>
      <Legend />
      {popupPosition && (
        <ShapeSelector
          position={popupPosition}
          onSelect={handleShapeSelect}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);