'use client';

import React, { useState } from 'react';
import CodePreview from '@/components/CodePreview';

type FileType = {
  name: string;
  content: string;
  type: 'file' | 'directory';
  children?: FileType[];
};

const fileStructure: FileType = {
  name: 'src',
  type: 'directory',
  content: '',
  children: [
    {
      name: 'app',
      type: 'directory',
      content: '',
      children: [
        {
          name: 'components',
          type: 'directory',
          content: '',
          children: [
            {
              name: 'Widget.tsx',
              type: 'file',
              content: `'use client';

import React from 'react';

export default function Widget() {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-800">Hello from Widget!</h2>
      <p className="mt-2 text-blue-600">This is a simple widget component.</p>
    </div>
  );
}`
            }
          ]
        },
        {
          name: 'page.tsx',
          type: 'file',
          content: `'use client';

import Widget from './components/Widget';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to My App</h1>
      <Widget />
    </div>
  );
}`
        }
      ]
    }
  ]
};

const FileIcon = ({ type, name }: { type: string; name: string }) => {
  const getIcon = () => {
    if (type === 'directory') return '📁';
    const extension = name.split('.').pop();
    switch (extension) {
      case 'tsx':
      case 'ts':
        return '📄';
      case 'css':
        return '🎨';
      case 'json':
        return '📦';
      default:
        return '📄';
    }
  };

  return <span className="mr-2">{getIcon()}</span>;
};

const FileTree = ({ 
  item, 
  depth = 0,
  onSelect,
  selectedFile
}: { 
  item: FileType; 
  depth?: number;
  onSelect: (file: FileType) => void;
  selectedFile: FileType | null;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    if (item.type === 'directory') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center px-2 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
          selectedFile?.name === item.name ? 'bg-blue-500 text-white' : ''
        }`}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
        onClick={() => {
          toggleOpen();
          if (item.type === 'file') {
            onSelect(item);
          }
        }}
      >
        <FileIcon type={item.type} name={item.name} />
        <span>{item.name}</span>
      </div>
      {item.type === 'directory' && isOpen && item.children?.map((child, index) => (
        <FileTree
          key={`${child.name}-${index}`}
          item={child}
          depth={depth + 1}
          onSelect={onSelect}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Explorer</h2>
          <div className="space-y-2">
            <FileTree item={fileStructure} onSelect={setSelectedFile} selectedFile={selectedFile} />
          </div>
        </div>
      </div>

      {/* Code Preview Area */}
      <div className="flex-1 overflow-auto p-8">
        {selectedFile ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              {selectedFile.name}
            </h1>
            <CodePreview code={selectedFile.content} editable={true} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a file to view its contents
          </div>
        )}
      </div>
    </div>
  );
}
