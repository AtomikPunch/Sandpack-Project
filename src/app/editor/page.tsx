'use client';

import React, { useState, useEffect } from 'react';
import CanvasEditor from '@/components/CanvasEditor';
import CanvasMosaic from '@/components/CanvasMosaic';
import { v4 as uuidv4 } from 'uuid';
import { Canvas as FabricCanvas } from 'fabric';

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
  const [hoveredCanvasId, setHoveredCanvasId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const tempCanvas = document.createElement('canvas');
    const fabricCanvas = new FabricCanvas(tempCanvas, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    const generatePreviews = async () => {
      const needsPreview = canvases.some(canvas => canvas.data && !canvas.preview);
      if (!needsPreview) return;

      const updatedCanvases = await Promise.all(
        canvases.map(async (canvas) => {
          if (canvas.data && !canvas.preview) {
            await new Promise((resolve) => {
              fabricCanvas.loadFromJSON(canvas.data, () => {
                fabricCanvas.renderAll();
                resolve(null);
              });
            });

            const preview = fabricCanvas.toDataURL({
              format: 'png',
              quality: 1,
              multiplier: 1
            });

            return { ...canvas, preview };
          }
          return canvas;
        })
      );

      setCanvases(updatedCanvases);
    };

    generatePreviews();

    return () => {
      fabricCanvas.dispose();
    };
  }, [canvases]);

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
        className={`transition-all duration-300 ${
          previewCanvas ? 'w-[300px]' : 'w-full'
        }`}
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Page Editor</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {view === 'mosaic' ? (
            previewCanvas ? (
              <div className="flex flex-col gap-4 p-4">
                {canvases.map((canvas) => (
                  <div
                    key={canvas.id}
                    className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow relative"
                    onMouseEnter={() => setHoveredCanvasId(canvas.id)}
                    onMouseLeave={() => setHoveredCanvasId(null)}
                  >
                    {/* Context Menu Trigger */}
                    {hoveredCanvasId === canvas.id && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="group relative">
                          <button className="text-gray-600 text-xl px-2">⋯</button>
                          <div className="absolute right-0 mt-1 bg-white border rounded shadow-lg opacity-100 z-20">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCanvasClick(canvas.id);
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCanvas(canvas.id);
                              }}
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                            >
                              Delete
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePreviewCanvas(canvas);
                              }}
                              className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                            >
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="aspect-video bg-gray-100 relative mb-2">
                      {canvas.preview ? (
                        <img 
                          src={canvas.preview} 
                          alt={canvas.name} 
                          className="w-full h-full object-contain rounded"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No preview available
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{canvas.name}</h3>
                  </div>
                ))}
                <div
                  className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 flex items-center justify-center"
                  onClick={() => setShowModal(true)}
                >
                  <div className="text-center">
                    <div className="text-2xl text-gray-400 mb-1">+</div>
                    <p className="text-gray-600">Add New Canvas</p>
                  </div>
                </div>
              </div>
            ) : (
              <CanvasMosaic
                canvases={canvases}
                onCanvasClick={handleCanvasClick}
                onAddCanvas={handleAddCanvas}
                onDeleteCanvas={handleDeleteCanvas}
                onPreviewCanvas={handlePreviewCanvas}
              />
            )
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
          maxWidth: previewCanvas ? 'calc(100% - 300px)' : '0',
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
