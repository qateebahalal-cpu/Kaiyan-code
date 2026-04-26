import React, { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
}

export default function CodeEditor({ code, onChange, language }: CodeEditorProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const highlight = (code: string) => {
    // Prism's markup is for HTML
    const lang = language === 'html' ? 'markup' : language;
    return Prism.highlight(
      code,
      Prism.languages[lang] || Prism.languages.javascript,
      lang
    );
  };

  return (
    <div className="flex-1 h-full bg-[#1e1e1e] overflow-auto scrollbar-hide font-mono">
      <Editor
        value={code}
        onValueChange={onChange}
        highlight={highlight}
        padding={20}
        className="min-h-full code-editor focus:outline-none"
        style={{
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontSize: 14,
          minHeight: '100%',
        }}
        textareaClassName="focus:outline-none"
      />
    </div>
  );
}
