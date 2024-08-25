import { useState } from 'react';

const MemeRecords = () => {
  return (
    <div className="meme-records">
      <div className="meme-records-title">Meme Records</div>
      <div className="meme-records-content">
        <div className="meme-records-content-item">
          <div className="meme-records-content-item-title">Total Memes</div>
          <div className="meme-records-content-item-value">0</div>
        </div>
      </div>
    </div>
  );
};

export default MemeRecords;
