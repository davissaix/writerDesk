'use client';
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import styles from './ThreeDotsSidebar.module.css';

interface ThreeDotsSidebarProps {
  contentToManage: string;
  onOpenContent: (content: string) => void;
}

const ThreeDotsSidebar: React.FC<ThreeDotsSidebarProps> = ({ contentToManage, onOpenContent }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(contentToManage);
      alert('Content copied to clipboard!');
    } catch (err) {
      alert('Failed to copy content.');
    }
  };

  const handleSaveLocalStorage = () => {
    const name = prompt('Please enter a name for your saved content:');
    if (name) {
      const uniqueKey = 'savedContent_' + Date.now();
      const contentObject = { name, content: contentToManage };
      localStorage.setItem(uniqueKey, JSON.stringify(contentObject));
      alert(`Content saved as '${name}'!`);
    } else {
      alert('Save cancelled.');
    }
  };

  const handleOpenLocalStorage = () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('savedContent_'));
    console.log('Available keys:', keys); // Log to check the keys
  
    const fileNames = keys.map((key) => {
      const item = localStorage.getItem(key);
      console.log('Retrieved item:', item); // Log to check the raw item
      try {
        const parsed = JSON.parse(item || 'null');
        console.log('Parsed item:', parsed); // Log to check the parsed item
        return parsed ? parsed.name : 'Unnamed';
      } catch {
        console.error('Parsing error for key:', key);
        return 'Invalid or corrupt data';
      }
    });
  
    const fileList = fileNames.map((name, index) => `${index + 1}. ${name}`).join('\n');
    const selectedIndex = prompt(`Select a file to open by number:\n${fileList}\nPut the number of your file.`);
  
    if (selectedIndex) {
      const index = parseInt(selectedIndex, 10) - 1;
      if (index >= 0 && index < keys.length) {
        const item = localStorage.getItem(keys[index]);
        console.log('Selected item:', item); // Log to check the selected item
        try {
          const parsed = JSON.parse(item || 'null');
          if (parsed && parsed.content) {
            console.log('Parsed content:', parsed.content); // Log to check the parsed content
            onOpenContent(parsed.content);
          } else {
            alert('Unable to open the selected file.');
          }
        } catch {
          console.error('Failed to parse the selected content.');
          alert('Failed to parse the content.');
        }
      } else {
        alert('Invalid selection.');
      }
    }
  };
  
  const handleDeleteLocalStorage = () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('savedContent_'));
    const fileNamesWithKeys = keys.map((key) => {
      const item = localStorage.getItem(key);
      try {
        const parsed = JSON.parse(item || 'null');
        return { key, name: parsed?.name || 'Unnamed' };
      } catch {
        console.error('Parsing error for key:', key);
        return { key, name: 'Invalid or corrupt data' };
      }
    });
  
    const fileList = fileNamesWithKeys.map((file, index) => `${index + 1}. ${file.name}`).join('\n');
    const selectedIndex = prompt(`Enter the number of the file to delete:\n${fileList}\nEnter '0' to delete all.`);
  
    if (selectedIndex !== null) {
      const index = parseInt(selectedIndex, 10) - 1;
  
      if (index === -1) { // User entered '0' to delete all
        keys.forEach(key => localStorage.removeItem(key));
        alert('All files have been deleted.');
      } else if (index >= 0 && index < fileNamesWithKeys.length) {
        localStorage.removeItem(fileNamesWithKeys[index].key); // Remove the specific key
        alert(`File '${fileNamesWithKeys[index].name}' has been deleted.`);
      } else {
        alert('Invalid selection.');
      }
    }
  };
  
  

  const handleDownloadContent = () => {
    const element = document.createElement("a");
    const file = new Blob([contentToManage], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "content.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert('Content downloaded as text file!');
  };

  return (
    <div>
      <div onClick={() => setSidebarOpen(!sidebarOpen)} className={styles.threeDotsIcon}>
        {/* Replace with actual icon */}
        ...
      </div>

      <div className={sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}>
        <Sidebar>
          <Menu>
            <MenuItem onClick={handleCopyContent}>Copy</MenuItem>
            <MenuItem onClick={handleSaveLocalStorage}>Save</MenuItem>
            <MenuItem onClick={handleOpenLocalStorage}>Open</MenuItem>
            <MenuItem onClick={handleDeleteLocalStorage}>Delete</MenuItem>
            <MenuItem onClick={handleDownloadContent}>Download</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
};

export default ThreeDotsSidebar;
