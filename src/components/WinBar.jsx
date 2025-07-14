import React from 'react'
import './WinBar.css'

const WinBar = () => {
    const winRatio = 44.44

  return (
      <div className="win-ratio">
        <p>Winning Ratio:-</p>
        <div className="progress-bar" data-percent={`${winRatio.toFixed(2)}%`}>
            <div className="progress-fill" style={{ width: `${winRatio}%` }}>
            </div>
        </div>
    </div>
  );
};

export default WinBar
