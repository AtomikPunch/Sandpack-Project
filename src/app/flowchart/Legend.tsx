import React from 'react';
import './Legend.css';

const Legend = () => {
  return (
    <div className="legend">
      <h3 className="legend-title">Node Types</h3>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-shape circle-shape"></div>
          <span className="legend-label">Process</span>
        </div>
        <div className="legend-item">
          <div className="legend-shape triangle-shape"></div>
          <span className="legend-label">Decision</span>
        </div>
        <div className="legend-item">
          <div className="legend-shape square-shape"></div>
          <span className="legend-label">Action</span>
        </div>
      </div>
    </div>
  );
};

export default Legend; 