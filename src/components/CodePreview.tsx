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
    '/styles.css': `
      body {
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `,
    '/components/Widget.tsx': `
import React from 'react';

export default function Widget() {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-800">Hello from Widget!</h2>
      <p className="mt-2 text-blue-600">This is a simple widget component.</p>
    </div>
  );
}
    `,
  };

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-gray-700">
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
        theme="dark"
      >
        <SandpackLayout>
          <div className="grid grid-cols-2 gap-0 w-full">
            <div className="w-full">
              <SandpackCodeEditor 
                showTabs 
                readOnly={!editable}
                showLineNumbers
                showInlineErrors
                wrapContent
              />
            </div>
            <div className="w-full bg-white dark:bg-gray-900">
              <div className="min-h-[200px]">
                <SandpackPreview
                  showNavigator
                  showRefreshButton
                />
              </div>
            </div>
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
