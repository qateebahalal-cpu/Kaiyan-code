import React, { useEffect, useRef } from 'react';
import { RefreshCw, ExternalLink, Smartphone, Tablet, Monitor } from 'lucide-react';
import { type File } from '@/src/constants';

interface WebPreviewProps {
  files: File[];
}

export default function WebPreview({ files }: WebPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const updatePreview = () => {
    const htmlFile = files.find(f => f.language === 'html') || files[0];
    const cssFiles = files.filter(f => f.language === 'css');
    const jsFiles = files.filter(f => f.language === 'javascript');

    let combinedContent = htmlFile?.content || '';

    // Inject CSS
    const styles = cssFiles.map(f => `<style>${f.content}</style>`).join('\n');
    combinedContent = combinedContent.replace('</head>', `${styles}</head>`);
    if (!combinedContent.includes('</head>')) {
      combinedContent = `${styles}${combinedContent}`;
    }

    // Inject JS
    const scripts = jsFiles.map(f => `<script>${f.content}</script>`).join('\n');
    combinedContent = combinedContent.replace('</body>', `${scripts}</body>`);
    if (!combinedContent.includes('</body>')) {
      combinedContent = `${combinedContent}${scripts}`;
    }

    if (iframeRef.current) {
      const blob = new Blob([combinedContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;
    }
  };

  useEffect(() => {
    updatePreview();
  }, [files]);

  return (
    <div className="flex-1 h-full bg-[#f4f4f4] flex flex-col">
      <div className="h-10 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all">
              <Smartphone size={14} />
            </button>
            <button className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all">
              <Tablet size={14} />
            </button>
            <button className="p-1 bg-white rounded shadow-sm text-purple-600 transition-all">
              <Monitor size={14} />
            </button>
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">
            Live Preview
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={updatePreview}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-all"
          >
            <RefreshCw size={14} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-all">
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-white m-4 rounded-xl shadow-2xl shadow-gray-200 overflow-hidden border border-gray-100">
        <iframe 
          ref={iframeRef}
          title="Web Preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
