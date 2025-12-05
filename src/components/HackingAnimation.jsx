import { useEffect, useState } from 'react'
import './HackingAnimation.css'

const HackingAnimation = () => {
  const [lines, setLines] = useState([])

  useEffect(() => {
    const generateLine = () => {
      const chars = '01█▓▒░░░▒▓█║╗╝╚╔╗▄▀▌▐αβγδεζηθλμνξπρστφχψω';
      const length = Math.floor(Math.random() * 30) + 20;
      let line = '';
      for (let i = 0; i < length; i++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      return line;
    }

    const interval = setInterval(() => {
      const newLines = [...lines];
      if (newLines.length > 15) {
        newLines.shift();
      }
      newLines.push({
        id: Date.now(),
        text: generateLine(),
        color: Math.random() > 0.7 ? '#ff0000' : '#00ff00'
      });
      setLines(newLines);
    }, 100);

    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div className="hacking-animation">
      <div className="animation-header">
        <h3>SYSTEM PENETRATION IN PROGRESS</h3>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <span className="progress-text">78%</span>
        </div>
      </div>
      
      <div className="code-display">
        {lines.map((line) => (
          <div
            key={line.id}
            className="code-line"
            style={{ color: line.color }}
          >
            {line.text}
          </div>
        ))}
      </div>
      
      <div className="stats">
        <div className="stat">
          <span className="stat-label">Packets Sent:</span>
          <span className="stat-value">12,847</span>
        </div>
        <div className="stat">
          <span className="stat-label">Ports Scanned:</span>
          <span className="stat-value">1,024</span>
        </div>
        <div className="stat">
          <span className="stat-label">Vulnerabilities:</span>
          <span className="stat-value danger">3</span>
        </div>
      </div>
    </div>
  )
}

export default HackingAnimation
