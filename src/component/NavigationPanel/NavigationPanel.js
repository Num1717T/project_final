import React from 'react';
import './NavigationPanel.css';

const NavigationPanel = ({ onVideoUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onVideoUpload(file);
    }
  };

  return (
    <div className="navigation-panel">
      <input
        type="file"
        accept="video/*"
        id="import-media-input"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="import-media-input" className="import-media-button">นำเข้าสื่อ</label>
    </div>
  );
};

export default NavigationPanel;
