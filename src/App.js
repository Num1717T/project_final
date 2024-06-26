// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import NavigationPanel from './component/NavigationPanel/NavigationPanel';
import MainEditingArea from './component/MainEditingArea/MainEditingArea';
import PlaybackControls from './component/PlaybackControls/PlaybackControls';
import SidePanel from './component/SidePanel/SidePanel';
import './App.css'; // รวมถึง CSS หลักของแอปพลิเคชัน

const App = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [inappropriateWords, setInappropriateWords] = useState([]);

  const handleVideoUpload = (file) => {
    const url = URL.createObjectURL(file);
    setVideoFile(url);
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/process-video', {
        video_path: '/content/เทสๆ.mp4' // Update this path as needed
      });
      setInappropriateWords(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = () => {
    setVideoFile(null);
  };

  return (
    <div className="App">
      <div className="video-editor">
        <NavigationPanel onVideoUpload={handleVideoUpload} />
        <MainEditingArea videoFile={videoFile} />
        <PlaybackControls onCalculate={handleCalculate} onDelete={handleDelete} />
        <SidePanel inappropriateWords={inappropriateWords} />
      </div>
    </div>
  );
};

export default App;
