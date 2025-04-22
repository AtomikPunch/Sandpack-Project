'use client';

import React from 'react';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodePreviewProps {
  code: string;
  scope?: Record<string, any>;
  editable?: boolean;
}

export default function CodePreview({ code, scope = {}, editable = false }: CodePreviewProps) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 p-4">
        <LiveProvider
          key={code} // force remount when code changes
          code={code}
          scope={{ ...scope, React }}
          noInline={false}
          transformCode={(code) => `<>${code}</>`} // Wrap code in fragment to handle multiple elements
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              {editable ? (
                <LiveEditor className="font-mono text-sm" />
              ) : (
                <SyntaxHighlighter
                  language="jsx"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              )}
            </div>
            <div className="bg-white p-4 rounded-lg dark:bg-gray-900">
              <div className="min-h-[200px]">
                <LivePreview />
              </div>
              <LiveError className="text-red-500 mt-2" />
            </div>
          </div>
        </LiveProvider>
      </div>
    </div>
  );
}
