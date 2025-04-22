'use client';

import React, { useState } from 'react';
import CodePreview from '@/components/CodePreview';

export default function Home() {
  const [devMode, setDevMode] = useState(false);

  return (
    <div className="h-screen bg-white dark:bg-gray-900">
      <div className="h-full overflow-auto p-8">
        <div className="flex items-center justify-end mb-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={devMode}
              onChange={(e) => setDevMode(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dev Mode</span>
          </label>
        </div>
        <CodePreview 
          editable={true}
          devMode={devMode}
        />
      </div>
    </div>
  );
}
