import React, { useState } from 'react';

interface CanvasData {
  id: string;
  name: string;
  data: any;
  preview?: string;
}

interface CanvasMosaicProps {
  canvases?: CanvasData[];
  onCanvasClick: (canvasId: string) => void;
  onAddCanvas: (name: string) => void;
  onDeleteCanvas: (canvasId: string) => void;
  onPreviewCanvas: (canvas: CanvasData) => void;
}

const defaultCanvases: CanvasData[] = [
  {
    id: 'front-page',
    name: 'Front Page',
    data: {},
    preview: undefined
  },
  {
    id: 'payment-page',
    name: 'Payment Page',
    data: {},
    preview: undefined
  }
];

const CanvasMosaic: React.FC<CanvasMosaicProps> = ({
  canvases = defaultCanvases,
  onCanvasClick,
  onAddCanvas,
  onDeleteCanvas,
  onPreviewCanvas,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newCanvasName, setNewCanvasName] = useState('');
  const [hoveredCanvasId, setHoveredCanvasId] = useState<string | null>(null);

  const handleAdd = () => {
    if (newCanvasName.trim()) {
      onAddCanvas(newCanvasName.trim());
      setNewCanvasName('');
      setShowModal(false);
    }
  };

  return (
    <div className="relative">
      {/* Grid */}
      <div className="grid grid-cols-3 gap-6 p-6 transition-transform duration-500">
        {canvases.map((canvas) => (
          <div
            key={canvas.id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
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
                        onCanvasClick(canvas.id);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCanvas(canvas.id);
                      }}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreviewCanvas(canvas);
                      }}
                      className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Image */}
            <div onClick={() => onCanvasClick(canvas.id)} className="aspect-video bg-gray-100 relative">
              {canvas.preview ? (
                <img src={canvas.preview} alt={canvas.name} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No preview available
                </div>
              )}
            </div>

            {/* Title */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{canvas.name}</h3>
            </div>
          </div>
        ))}

        {/* Add New Canvas Button */}
        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border-2 border-dashed border-gray-300 flex items-center justify-center aspect-video"
          onClick={() => setShowModal(true)}
        >
          <div className="text-center">
            <div className="text-4xl text-gray-400 mb-2">+</div>
            <p className="text-gray-600">Add New Canvas</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold mb-4">What do you want to create as page?</h2>
            <input
              type="text"
              value={newCanvasName}
              onChange={(e) => setNewCanvasName(e.target.value)}
              placeholder="Page name..."
              className="w-full border px-4 py-2 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAdd}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasMosaic;
