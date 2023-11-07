'use client';
import React, { useState, useEffect } from 'react';
import Paper from '../Components/Paper';
import ThreeDotsSidebar from '../Components/ThreeDotsSidebar'; // Ensure this is the correct path

const Home: React.FC = () => {
  const [content, setContent] = useState('');
  const [isExternalUpdate, setIsExternalUpdate] = useState(false);

  useEffect(() => {
    // When component mounts, fetch the most recent content
    let latestKey = '';
    let latestTimestamp = 0;
    // Loop over all localStorage keys to find the most recent 'savedContent_'
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('savedContent_')) {
        const timestamp = parseInt(key.split('_')[1], 10);
        if (timestamp > latestTimestamp) {
          latestTimestamp = timestamp;
          latestKey = key;
        }
      }
    });
    
    if (latestKey) {
      // Fetch the most recent content and set it
      const latestContent = localStorage.getItem(latestKey);
      if (latestContent) {
        try {
          const parsedContent = JSON.parse(latestContent);
          setContent(parsedContent.content);
        } catch (e) {
          console.error('Error parsing the latest content:', e);
        }
      }
    }
  }, []);


  const handleOpenContent = (openedContent: string) => {
    console.log('Opened content:', openedContent); 
    setContent(openedContent); // Update the content with the opened content
  };

  return (
    <div>
      <Paper content={content} onContentChange={setContent} />

      <ThreeDotsSidebar contentToManage={content} onOpenContent={handleOpenContent} />
    </div>
  );
};

export default Home;
