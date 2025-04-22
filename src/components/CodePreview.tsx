'use client';

import React from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react';

interface CodePreviewProps {
  code: string;
  scope?: Record<string, any>;
  editable?: boolean;
}

export default function CodePreview({ code, editable = false }: CodePreviewProps) {
  const files = {
    '/App.tsx': code,
    '/components/Widget.tsx': `
import React from 'react';

export default function Widget() {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-800">Hello from Widget!</h2>
      <p className="mt-2 text-blue-600">This is a simple widget component.</p>
    </div>
  );
}`,
    '/styles.css': `
      body {
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
      }
    `,
  };

  return (
    <div className="h-full w-full">
      <SandpackProvider
        template="react-ts"
        files={files}
        customSetup={{
          dependencies: {
            "react": "^18",
            "react-dom": "^18",
            "@types/react": "^18",
            "@types/react-dom": "^18",
            "tailwindcss": "^3.3.0",
          },
        }}
        options={{
          activeFile: '/App.tsx',
        }}
        theme="dark"
      >
        <div className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-4">
            <div className="h-full border-r border-gray-700">
              <SandpackCodeEditor 
                showTabs 
                readOnly={!editable}
                showLineNumbers
                showInlineErrors
                wrapContent
                style={{ height: '100%' }}
              />
            </div>
            <div className="h-full">
              <SandpackPreview
                showNavigator
                showRefreshButton
                style={{ height: '100%' }}
              />
            </div>
          </div>
        </div>
      </SandpackProvider>
    </div>
  );
}
