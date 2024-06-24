// src/components/SidePanel.js
import React from 'react';
import './SidePanel.css';

const SidePanel = () => {
  // Array ของคำไม่สุภาพพร้อมด้วยช่วงเวลาที่เจอ
  const inappropriateWords = [
    { word: "มึง", time: "00:01:05" },
    { word: "เวรเอ้ย", time: "00:02:30" },
    { word: "ยากสัตว์", time: "00:04:15" }
  ];

  return (
    <div className="side-panel">
      <div className="status-report">
        <p>รายงานคำไม่สุภาพที่พบ:</p>
        {inappropriateWords.length > 0 ? (
          <table className="report-table">
            <thead>
              <tr>
                <th>คำหยาบ</th>
                <th>ช่วงเวลาที่เจอ</th>
              </tr>
            </thead>
            <tbody>
              {inappropriateWords.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.word}</td>
                  <td>{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>ไม่พบคำไม่สุภาพ</p>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
