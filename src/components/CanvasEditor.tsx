'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Rect, Circle, Textbox } from 'fabric';

interface CanvasEditorProps { // mosaique de canvas , ajouter et supprimer, on hover ajouter des commentaires, mettre un chat dans chaque canva pour dire ce qui va pas
  width?: number; //quand il ajoute un canva , il dis ce qu'il veut dedans (voir et faire sur la page). /penser a toutes les pages.
  height?: number;
  initialData?: any;
  onSave?: (data: any, preview: string) => void;
  onBack?: () => void;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({
  width = 800,
  height = 600,
  initialData,
  onSave,
  onBack,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new FabricCanvas(canvasRef.current, {
        width,
        height,
        backgroundColor: '#ffffff',
      });
      setCanvas(fabricCanvas);

      // Load initial data if provided
      if (initialData) {
        fabricCanvas.loadFromJSON(initialData, () => {
          fabricCanvas.renderAll();
        });
      }

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [width, height, initialData]);

  const handleAddRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: '#3B82F6',
        width: 100,
        height: 100,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
    }
  };

  const handleAddCircle = () => {
    if (canvas) {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: '#10B981',
        radius: 50,
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
    }
  };

  const handleAddText = () => {
    if (canvas) {
      const text = new Textbox('Double click to edit', {
        left: 100,
        top: 100,
        fontSize: 20,
        fill: '#000000',
      });
      canvas.add(text);
      canvas.setActiveObject(text);
    }
  };

  const handleExportImage = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1
      });
      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.download = 'canvas-export.png';
      link.href = dataURL;
      link.click();
    }
  };

  const handleExportJSON = () => {
    if (canvas) {
      const json = canvas.toJSON();
      const jsonStr = JSON.stringify(json);
      // Create a temporary link to download the JSON
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'canvas-export.json';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        // Clear the canvas before loading new data
        canvas.clear();
        canvas.loadFromJSON(json, () => {
          canvas.renderAll();
        });
      } catch (error) {
        console.error('Error loading JSON:', error);
        alert('Invalid JSON file. Please make sure it contains valid canvas data.');
      }
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    if (canvas && onSave) {
      const data = canvas.toJSON();
      const preview = canvas.toDataURL({
        format: 'png',
        quality: 0.5,
        multiplier: 0.5
      });
      onSave(data, preview);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded ${
              selectedTool === 'select' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => setSelectedTool('select')}
          >
            Select
          </button>
          <button
            className="px-4 py-2 rounded bg-white"
            onClick={handleAddRectangle}
          >
            Rectangle
          </button>
          <button
            className="px-4 py-2 rounded bg-white"
            onClick={handleAddCircle}
          >
            Circle
          </button>
          <button
            className="px-4 py-2 rounded bg-white"
            onClick={handleAddText}
          >
            Text
          </button>
          <div className="ml-4 border-l border-gray-300 pl-4">
            <button
              className="px-4 py-2 rounded bg-green-500 text-white"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="ml-2 px-4 py-2 rounded bg-purple-500 text-white"
              onClick={handleExportJSON}
            >
              Export JSON
            </button>
            <label className="ml-2 px-4 py-2 rounded bg-blue-500 text-white cursor-pointer">
              Import JSON
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportJSON}
              />
            </label>
            {onBack && (
              <button
                className="ml-2 px-4 py-2 rounded bg-gray-500 text-white"
                onClick={onBack}
              >
                Back to Mosaic
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default CanvasEditor; 