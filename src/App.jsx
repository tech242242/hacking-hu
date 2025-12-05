import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import HackingAnimation from './components/HackingAnimation'
import Terminal from './components/Terminal'
import MatrixRain from './components/MatrixRain'
import NetworkNodes from './components/NetworkNodes'
import ScanLine from './components/ScanLine'
import GlitchText from './components/GlitchText'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showMainInterface, setShowMainInterface] = useState(false)

  const handleLoginSuccess = () => {
    setTimeout(() => {
      setShowMainInterface(true)
    }, 3000)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
  }

  if (!showMainInterface) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-green-500 mb-4 animate-pulse">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <div className="text-green-400 font-terminal">
            LOADING MAIN INTERFACE...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <NetworkNodes />
      <ScanLine />
      
      <div className="main-interface">
        <header className="header">
          <div className="logo">
            <GlitchText text="[root@cyberops~]#" className="logo-text" />
            <span className="cursor"></span>
          </div>
          <div className="status-indicators">
            <div className="status active">
              <i className="fas fa-shield-alt mr-2"></i>
              SECURE
            </div>
            <div className="status warning">
              <i className="fas fa-broadcast-tower mr-2"></i>
              ONLINE
            </div>
            <div className="status danger">
              <i className="fas fa-user-secret mr-2"></i>
              STEALTH
            </div>
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
            USER: MUHAMMAD SAQIB | CLEARANCE: ALPHA | ENCRYPTION: AES-256
          </div>
          <div className="time-display">
            [{new Date().toLocaleTimeString()} UTC]
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
