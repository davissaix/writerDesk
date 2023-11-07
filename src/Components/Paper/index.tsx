'use client';
import React, { useEffect, useRef } from 'react';
import './styles.css';

interface PaperProps {
  content: string;
  onContentChange: (content: string) => void;
}

const Paper: React.FC<PaperProps> = ({ content, onContentChange }) => {
  const editableDivRef = useRef<HTMLDivElement>(null);
  const lineStyle = { width: '80%' };

  // Effect for updating the inner text when the content prop changes.
  // This is only intended for external updates (e.g., loading a file).
  useEffect(() => {
    const div = editableDivRef.current;
    if (div && content !== div.innerText) {
      div.innerText = content;
    }
  }, [content]);

  // Event handlers
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    if (editableDivRef.current) {
      onContentChange(editableDivRef.current.innerText);
    }
  };

  return (
    <div id="paper-container">
      <div
        ref={editableDivRef}
        className="line scrollbar-hide"
        contentEditable="true"
        style={lineStyle}
        onPaste={handlePaste}
        onInput={handleInput} // Handle input for typing
        spellCheck="false"
      >
        {/* Content is managed via innerText, no children here */}
      </div>
    </div>
  );
};

export default Paper;
