import React from 'react';
import './SidePanel.css';

const SidePanel = ({ inappropriateWords }) => {
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
                  <td>{new Date(entry.start_time * 1000).toISOString().substr(11, 8)}</td>
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
