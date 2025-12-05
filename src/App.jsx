import { useState, useEffect } from 'react'
import HackingAnimation from './components/HackingAnimation'
import Terminal from './components/Terminal'
import MatrixRain from './components/MatrixRain'
import './App.css'

function App() {
  const [showMatrix, setShowMatrix] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMatrix(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app-container">
      {showMatrix && <MatrixRain />}
      
      <div className="main-interface">
        <header className="header">
          <div className="logo">
            <span className="logo-text">[root@hack~]#</span>
            <span className="cursor"></span>
          </div>
          <div className="status-indicators">
            <div className="status active">CONNECTED</div>
            <div className="status warning">ENCRYPTING</div>
            <div className="status danger">STEALTH MODE</div>
          </div>
        </header>
        
        <div className="content-grid">
          <div className="left-panel">
            <HackingAnimation />
          </div>
          
          <div className="right-panel">
            <Terminal />
          </div>
        </div>
        
        <footer className="footer">
          <div className="connection-status">
            <span className="dot online"></span>
            LIVE CONNECTION | ENCRYPTED: AES-256 | TARGET: 192.168.1.1
          </div>
          <div className="time-display">
            [23:59:45 UTC]
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
