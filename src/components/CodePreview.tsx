'use client';

import React, { useState, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';

interface CodePreviewProps {
  code?: string;
  scope?: Record<string, any>;
  editable?: boolean;
  devMode?: boolean;
}

// List of elements that can be highlighted
const highlightableElements = [
  { id: 'header', label: 'Header' },
  { id: 'nav', label: 'Navigation' },
  { id: 'main', label: 'Main Content' },
  { id: 'card', label: 'Card' },
  { id: 'button', label: 'Button' },
];

export default function CodePreview({ editable = false, devMode = false }: CodePreviewProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'highlight-response') {
        console.log('Highlight response:', event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleElementHover = (elementId: string) => {
    setSelectedElement(elementId);
    const iframe = document.querySelector('iframe');
    iframe?.contentWindow?.postMessage(
      { 
        type: 'highlight', 
        target: elementId,
        action: 'highlight'
      }, 
      '*'
    );
  };

  const handleElementLeave = () => {
    setSelectedElement(null);
    const iframe = document.querySelector('iframe');
    iframe?.contentWindow?.postMessage(
      { 
        type: 'highlight', 
        action: 'unhighlight'
      }, 
      '*'
    );
  };

  const files = {
    '/App.tsx': `
    'use client';
    
    import React, { useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
    import Home from './pages/Home';
    import About from './pages/About';
    import Dashboard from './pages/Dashboard';
    import './styles.css';
    
    export default function App() {
      useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
          if (event.data.type === 'highlight') {
            const { target, action } = event.data;
            
            // Remove any existing highlights
            document.querySelectorAll('.highlight-overlay').forEach(el => el.remove());
            
            if (action === 'highlight' && target) {
              const element = document.querySelector(\`[data-element="\${target}"]\`);
              if (element) {
                const rect = element.getBoundingClientRect();
                const overlay = document.createElement('div');
                overlay.className = 'highlight-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = rect.top + 'px';
                overlay.style.left = rect.left + 'px';
                overlay.style.width = rect.width + 'px';
                overlay.style.height = rect.height + 'px';
                overlay.style.border = '2px solid #6b46c1';
                overlay.style.backgroundColor = 'rgba(107, 70, 193, 0.1)';
                overlay.style.pointerEvents = 'none';
                overlay.style.zIndex = '9999';
                document.body.appendChild(overlay);
              }
            }
          }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
      }, []);

      return (
        <Router>
          <div className="min-h-screen font-poppins text-gray-800">
            <header data-element="header" className="bg-white/80 backdrop-blur shadow-md py-4 px-6 flex justify-between items-center rounded-b-xl">
              <h1 className="text-2xl font-bold text-purple-700">✨ My Fancy App</h1>
              <nav data-element="nav" className="flex items-center space-x-4">
                <Link to="/" className="nav-link">🏠 Home</Link>
                <Link to="/about" className="nav-link">ℹ️ About</Link>
                <Link to="/dashboard" className="nav-link">📊 Dashboard</Link>
              </nav>
            </header>
            <main data-element="main" className="p-6 max-w-4xl mx-auto mt-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      );
    }
      `,
    
      '/pages/Home.tsx': `
    import React from 'react';
    import Widget from '../components/Widget';
    
    export default function Home() {
      return (
        <div data-element="card" className="card animate-fadeIn">
          <h2 className="card-title">🏡 Welcome to the Home Page</h2>
          <p className="text-gray-600 mb-4">This is your cozy starting point!</p>
          <Widget />
        </div>
      );
    }
      `,
    
      '/pages/About.tsx': `
    import React from 'react';
    
    export default function About() {
      return (
        <div className="card animate-fadeIn">
          <h2 className="card-title">ℹ️ About Us</h2>
          <p className="text-gray-600">This small app shows routing between pages with stylish UI elements using TailwindCSS.</p>
        </div>
      );
    }
      `,
    
      '/pages/Dashboard.tsx': `
    import React, { useState } from 'react';
    import Button from '../components/Button';
    
    export default function Dashboard() {
      const [count, setCount] = useState(0);
    
      return (
        <div className="card animate-fadeIn">
          <h2 className="card-title">📊 Dashboard</h2>
          <p className="text-gray-600 mb-2">Click count: <span className="font-semibold text-purple-700">{count}</span></p>
          <Button label="Click Me!" onClick={() => setCount(count + 1)} />
        </div>
      );
    }
      `,
    
      '/components/Widget.tsx': `
    import React from 'react';
    
    export default function Widget() {
      return (
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-purple-100 shadow-md border border-purple-200">
          <h3 className="text-lg font-bold text-purple-800">🧩 Reusable Widget</h3>
          <p className="text-purple-700">Add me to any page to show shared content.</p>
        </div>
      );
    }
      `,
    
      '/components/Button.tsx': `
    import React from 'react';
    
    interface ButtonProps {
      label: string;
      onClick: () => void;
    }
    
    export default function Button({ label, onClick }: ButtonProps) {
      return (
        <button
          data-element="button"
          onClick={onClick}
          className="btn-primary"
        >
          {label}
        </button>
      );
    }
      `,
    
      '/styles.css': `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
    
    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .font-poppins {
      font-family: 'Poppins', sans-serif;
    }
    
    .nav-link {
      position: relative;
      font-weight: 500;
      color: #6b46c1;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(107, 70, 193, 0.2);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .nav-link:hover {
      color: #553c9a;
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(107, 70, 193, 0.15);
    }
    
    .nav-link:active {
      transform: translateY(1px);
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background: #6b46c1;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    
    .nav-link:hover::after {
      width: 80%;
    }
    
    .card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #4c1d95;
    }
    
    .btn-primary {
      background: linear-gradient(45deg, #6b46c1, #805ad5);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(107, 70, 193, 0.2);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(107, 70, 193, 0.3);
    }
    
    .btn-primary:active {
      transform: translateY(1px);
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
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
            "react-router-dom": "^6",
            "@types/react": "^18",
            "@types/react-dom": "^18",
            "@types/react-router-dom": "^6",
            "tailwindcss": "^3.3.0",
          },
        }}
        theme="dark"
      >
        <SandpackLayout>
          {devMode ? (
            <div className="w-full h-screen flex">
              <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
                <h3 className="text-white text-lg font-semibold mb-4">Elements</h3>
                <ul className="space-y-2">
                  {highlightableElements.map((element) => (
                    <li
                      key={element.id}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        selectedElement === element.id
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                      onMouseEnter={() => handleElementHover(element.id)}
                      onMouseLeave={handleElementLeave}
                    >
                      {element.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <SandpackPreview
                  showNavigator
                  showRefreshButton
                  className="h-full"
                />
              </div>
            </div>
          ) : (
            <div className="flex w-full h-full">
              <div className="w-50">
                <SandpackFileExplorer />
              </div>
              <div className="flex-1 grid grid-cols-2 gap-0 h-full">
                <div className="w-full h-full">
                  <SandpackCodeEditor 
                    showTabs 
                    readOnly={!editable}
                    showLineNumbers
                    showInlineErrors
                    wrapContent
                  />
                </div>
                <div className="w-full bg-white dark:bg-gray-900 h-full">
                  <div className="h-full flex flex-col">
                    <SandpackPreview
                      showNavigator
                      showRefreshButton
                      className="h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
