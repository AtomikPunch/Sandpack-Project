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
  const [canvases, setCanvases] = useState<CanvasData[]>([
    {
      id: 'welcome-page',
      name: 'Page d\'accueil',
      data: {
        "version": "5.2.4",
        "objects": [
          {
            "type": "rect",
            "left": 0,
            "top": 0,
            "width": 800,
            "height": 100,
            "fill": "#1D4ED8"
          },
          {
            "type": "textbox",
            "left": 20,
            "top": 30,
            "text": "MonSiteWeb",
            "fontSize": 30,
            "fill": "white"
          },
          {
            "type": "textbox",
            "left": 300,
            "top": 120,
            "text": "Bienvenue sur notre site !",
            "fontSize": 28,
            "fill": "#000000"
          },
          {
            "type": "rect",
            "left": 300,
            "top": 180,
            "width": 200,
            "height": 50,
            "fill": "#10B981"
          },
          {
            "type": "textbox",
            "left": 325,
            "top": 195,
            "text": "Commencer",
            "fontSize": 20,
            "fill": "white"
          }
        ]
      }
    }  ,
    {
      id: 'contact-page',
      name: 'Page Contact',
      data: {
        "version": "5.2.4",
        "objects": [
          {
            "type": "rect",
            "left": 100,
            "top": 60,
            "width": 600,
            "height": 450,
            "rx": 10,
            "ry": 10,
            "fill": "#111111",
            "stroke": "#ffffff22",
            "strokeWidth": 1
          },
          {
            "type": "textbox",
            "left": 130,
            "top": 80,
            "text": "Payment Details",
            "fontSize": 28,
            "fill": "#ffffff",
            "fontWeight": "bold"
          },
          {
            "type": "textbox",
            "left": 130,
            "top": 120,
            "text": "Enter your card information to complete the payment",
            "fontSize": 16,
            "fill": "#bbbbbb"
          },
          {
            "type": "textbox",
            "left": 130,
            "top": 160,
            "text": "Name on Card",
            "fontSize": 16,
            "fill": "#ffffff"
          },
          {
            "type": "rect",
            "left": 130,
            "top": 185,
            "width": 440,
            "height": 40,
            "fill": "#222222",
            "stroke": "#444444",
            "strokeWidth": 1
          },
          {
            "type": "textbox",
            "left": 140,
            "top": 195,
            "text": "John Doe",
            "fontSize": 16,
            "fill": "#999999"
          },
          {
            "type": "textbox",
            "left": 130,
            "top": 235,
            "text": "Card Number",
            "fontSize": 16,
            "fill": "#ffffff"
          },
          {
            "type": "rect",
            "left": 130,
            "top": 260,
            "width": 440,
            "height": 40,
            "fill": "#222222",
            "stroke": "#444444",
            "strokeWidth": 1
          },
          {
            "type": "textbox",
            "left": 140,
            "top": 270,
            "text": "1234 5678 9012 3456",
            "fontSize": 16,
            "fill": "#999999"
          },
          {
            "type": "textbox",
            "left": 130,
            "top": 315,
            "text": "Month",
            "fontSize": 16,
            "fill": "#ffffff"
          },
          {
            "type": "rect",
            "left": 130,
            "top": 340,
            "width": 90,
            "height": 40,
            "fill": "#222222",
            "stroke": "#444444",
            "strokeWidth": 1
          },
          {
            "type": "textbox",
            "left": 150,
            "top": 350,
            "text": "MM",
            "fontSize": 16,
            "fill": "#999999"
          },
          {
            "type": "textbox",
            "left": 240,
            "top": 315,
            "text": "Year",
            "fontSize": 16,
            "fill": "#ffffff"
          },
          {
            "type": "rect",
            "left": 240,
            "top": 340,
            "width": 90,
            "height": 40,
            "fill": "#222222",
            "stroke": "#444444",
            "strokeWidth": 1
          },
          {
            "type": "textbox",
            "left": 260,
            "top": 350,
            "text": "YY",
            "fontSize": 16,
            "fill": "#999999"
          },
          {
            "type": "textbox",
            "left": 350,
            "top": 315,
            "text": "CVV",
            "fontSize": 16,
            "fill": "#ffffff"
          },
          {
            "type": "rect",
            "left": 350,
            "top": 340,
            "width": 90,
            "height": 40,
            "fill": "#222222",
            "stroke": "#444444",
            "strokeWidth": 1
          },
          {
            "type": "textbox",
            "left": 370,
            "top": 350,
            "text": "123",
            "fontSize": 16,
            "fill": "#999999"
          },
          {
            "type": "rect",
            "left": 230,
            "top": 400,
            "width": 200,
            "height": 50,
            "fill": "#ffffff",
            "rx": 5,
            "ry": 5
          },
          {
            "type": "textbox",
            "left": 275,
            "top": 415,
            "text": "Pay Now",
            "fontSize": 18,
            "fill": "#000000",
            "fontWeight": "bold"
          }
        ]
      }
    }  ,
    {
      id: 'about-page',
      name: 'À propos',
      data: {
        "version": "5.3.0",
        "objects": [
          {
            "type": "rect",
            "left": 100,
            "top": 100,
            "width": 300,
            "height": 200,
            "fill": "#F59E0B",
            "angle": 0,
            "scaleX": 1,
            "scaleY": 1
          },
          {
            "type": "textbox",
            "left": 150,
            "top": 150,
            "width": 200,
            "height": 100,
            "fill": "#ffffff",
            "text": "À propos de nous",
            "fontSize": 28,
            "angle": 0,
            "scaleX": 1,
            "scaleY": 1
          }
        ]
      }
    }
  ]);
  const [previewCanvas, setPreviewCanvas] = useState<CanvasData | null>(null);

  const handleCanvasClick = (canvasId: string) => {
    setSelectedCanvasId(canvasId);
    setView('editor');
    //canvas.renderAll();
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
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Page Editor</h1>
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
