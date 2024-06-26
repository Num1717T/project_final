import React from 'react';
import './MainEditingArea.css';

const MainEditingArea = ({ videoFile }) => {
  return (
    <div className="main-editing-area">
      {videoFile ? (
        <video controls className="video-preview">
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>โปรดนำเข้าคลิปเพื่อเริ่มการตัดต่อ</p>
      )}
    </div>
  );
};

export default MainEditingArea;
