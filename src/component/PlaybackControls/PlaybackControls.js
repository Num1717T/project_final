import React from 'react';
import './PlaybackControls.css';

const PlaybackControls = ({ onCalculate, onDelete }) => {
  return (
    <div className="playback-controls">
      <button onClick={onCalculate}>Calculate</button>
      <button onClick={onDelete}>ลบวิดีโอ</button>
    </div>
  );
};

export default PlaybackControls;
