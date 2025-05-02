'use client';

import React, { useState } from 'react';
import CanvasEditor from '@/components/CanvasEditor';
import CanvasMosaic from '@/components/CanvasMosaic';
import { v4 as uuidv4 } from 'uuid';

interface CanvasData {
  id: string;
  name: string;
  data: any;
  preview?: string;
}

export default function EditorPage() {
  const [view, setView] = useState<'mosaic' | 'editor'>('mosaic');
  const [selectedCanvasId, setSelectedCanvasId] = useState<string | null>(null);
  const [canvases, setCanvases] = useState<CanvasData[]>([]);
  const [previewCanvas, setPreviewCanvas] = useState<CanvasData | null>(null);

  const handleCanvasClick = (canvasId: string) => {
    setSelectedCanvasId(canvasId);
    setView('editor');
  };

  const handleAddCanvas = () => {
    const newCanvas: CanvasData = {
      id: uuidv4(),
      name: `Canvas ${canvases.length + 1}`,
      data: null,
    };
    setCanvases([...canvases, newCanvas]);
    setSelectedCanvasId(newCanvas.id);
    setView('editor');
  };

  const handleSaveCanvas = (canvasId: string, data: any, preview: string) => {
    setCanvases(canvases.map(canvas =>
      canvas.id === canvasId
        ? { ...canvas, data, preview }
        : canvas
    ));
  };

  const handleBackToMosaic = () => {
    setView('mosaic');
    setSelectedCanvasId(null);
  };

  const handleDeleteCanvas = (canvasId: string) => {
    setCanvases(canvases.filter(canvas => canvas.id !== canvasId));
    if (previewCanvas?.id === canvasId) {
      setPreviewCanvas(null);
    }
  };

  const handlePreviewCanvas = (canvas: CanvasData) => {
    setPreviewCanvas(canvas);
  };

  const handleClosePreview = () => {
    setPreviewCanvas(null);
  };

  const selectedCanvas = canvases.find(canvas => canvas.id === selectedCanvasId);

  return (
    <div className="min-h-screen bg-gray-50 flex relative overflow-hidden">
      <div
        className={`transition-all duration-300 flex-shrink-0 ${
        previewCanvas ? 'w-[calc(100%-1000px)]' : 'w-full'
        }`}
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Figma-like Editor</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {view === 'mosaic' ? (
            <CanvasMosaic
              canvases={canvases}
              onCanvasClick={handleCanvasClick}
              onAddCanvas={handleAddCanvas}
              onDeleteCanvas={handleDeleteCanvas}
              onPreviewCanvas={handlePreviewCanvas}
            />
          ) : (
            <CanvasEditor
              width={1200}
              height={800}
              initialData={selectedCanvas?.data}
              onSave={(data, preview) => selectedCanvasId && handleSaveCanvas(selectedCanvasId, data, preview)}
              onBack={handleBackToMosaic}
            />
          )}
        </div>
      </div>

      {/* Slide-in Preview Panel */}
        <div
    className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
      previewCanvas ? 'translate-x-0' : 'translate-x-full'
    } w-full`}
    style={{
      maxWidth: previewCanvas ? '1200px' : '0',
      transition: 'max-width 0.3s ease',
    }}
  >
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-xl font-semibold">{previewCanvas?.name}</h2>
      <button
        onClick={handleClosePreview}
        className="text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
    </div>
    <div className="p-4">
      {previewCanvas?.preview ? (
        <img src={previewCanvas.preview} alt="Preview" className="w-full rounded shadow" />
      ) : (
        <p className="text-gray-400">No preview available.</p>
      )}
    </div>
  </div>

    </div>
  );
}
