
// src/components/Paper/index.tsx
import React from 'react';
import './styles.css'; // Make sure to import your CSS file for styling

const Paper: React.FC = () => {
  // Define the widths for each line
  const lineStyles = [
    { width: '80%' },
    { width: '81%' },
    { width: '82%' },
    { width: '82.5%' },
    { width: '83%' },
    { width: '84%' },
    { width: '85%' },
    { width: '86%' },
    { width: '86.5%' },
    { width: '87%' },
    { width: '87.5%' },
    { width: '88%' },
    { width: '88.5%' },
    { width: '89%' },
    { width: '89.5%' },
    { width: '90%' },
    { width: '91%' },
    { width: '91.5%' },
    { width: '92%' },
    { width: '92.5%' },
    { width: '93%' },
    // { width: '102%' },
    // { width: '104%' },
    // { width: '106%' },
    // { width: '108%' },
  ];

  return (
    <div id="paper-container">
      {lineStyles.map((style, index) => (
        <div
          key={index}
          className="line"
          contentEditable="true"
          style={style}
        >
          {/* This div is contenteditable, so users can type here */}
        </div>
      ))}
    </div>
  );
};

export default Paper;



