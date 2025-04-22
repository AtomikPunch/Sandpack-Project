'use client';

import React from 'react';
import CanvasEditor from '@/components/CanvasEditor';

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Figma-like Editor</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <CanvasEditor width={1200} height={800} />
        </div>
      </div>
    </div>
  );
} 