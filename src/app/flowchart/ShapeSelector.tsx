import React from 'react';
import './ShapeSelector.css';

interface ShapeSelectorProps {
  position: { x: number; y: number };
  onSelect: (shape: 'circle' | 'triangle' | 'square') => void;
  onClose: () => void;
}

const ShapeSelector: React.FC<ShapeSelectorProps> = ({ position, onSelect, onClose }) => {
  return (
    <div 
      className="shape-selector"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <button onClick={() => onSelect('circle')} className="shape-button circle">
        <div className="circle-shape" />
      </button>
      <button onClick={() => onSelect('triangle')} className="shape-button triangle">
        <div className="triangle-shape" />
      </button>
      <button onClick={() => onSelect('square')} className="shape-button square">
        <div className="square-shape" />
      </button>
    </div>
  );
};

export default ShapeSelector; 