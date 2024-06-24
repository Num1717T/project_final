// src/App.js
import React from 'react';
import NavigationPanel from './component/NavigationPanel/NavigationPanel';
import MainEditingArea from './component/MainEditingArea/MainEditingArea';
import PlaybackControls from './component/PlaybackControls/PlaybackControls';
import SidePanel from './component/SidePanel/SidePanel';
import './App.css'; // รวมถึง CSS หลักของแอปพลิเคชัน

const App = () => {
  return (
    <div className="App">
      <div className="video-editor">
        <NavigationPanel />
        <MainEditingArea />
        <PlaybackControls />
        <SidePanel />
      </div>
    </div>
  );
};

export default App;
