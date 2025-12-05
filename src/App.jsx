import { useState, useEffect } from 'react'
import HackingAnimation from './components/HackingAnimation'
import Terminal from './components/Terminal'
import MatrixRain from './components/MatrixRain'
import LoginSystem from './components/LoginSystem'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [showMatrix, setShowMatrix] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)
  const [systemStatus, setSystemStatus] = useState({
    connected: true,
    encrypting: true,
    stealthMode: true,
    threatLevel: 'low'
  })
  const [hackingProgress, setHackingProgress] = useState(0)

  useEffect(() => {
    // Initialize system
    const initTimer = setTimeout(() => {
      setShowMatrix(false)
    }, 4000)

    // Simulate system status updates
    const statusInterval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        threatLevel: Math.random() > 0.7 ? 'high' : 'low',
        encrypting: Math.random() > 0.3
      }))
    }, 5000)

    // Simulate hacking progress
    const progressInterval = setInterval(() => {
      if (!isAuthenticated) return
      setHackingProgress(prev => {
        if (prev >= 100) return 0
        return prev + Math.random() * 5
      })
    }, 1000)

    return () => {
      clearTimeout(initTimer)
      clearInterval(statusInterval)
      clearInterval(progressInterval)
    }
  }, [isAuthenticated])

  const handleLogin = (username, password) => {
    // Simple authentication
    if (username === 'Muhammad Saqib' && password === '345678') {
      setUserData({
        username,
        accessLevel: 'root',
        clearance: 10,
        sessionId: Math.random().toString(36).substr(2, 9).toUpperCase()
      })
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserData(null)
    setHackingProgress(0)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return '#ff0000'
      case 'medium': return '#ff9900'
      case 'low': return '#00ff00'
      default: return '#00ff00'
    }
  }

  return (
    <div className="app-container">
      {showMatrix && <MatrixRain />}
      
      <div className="main-interface">
        {/* Top Status Bar */}
        <div className="global-status-bar">
          <div className="status-item">
            <span className={`status-dot ${systemStatus.connected ? 'online' : 'offline'}`}></span>
            <span>{systemStatus.connected ? 'CONNECTED' : 'DISCONNECTED'}</span>
          </div>
          <div className="status-item">
            <i className="fas fa-shield-alt"></i>
            <span>ENCRYPTION: {systemStatus.encrypting ? 'ACTIVE' : 'INACTIVE'}</span>
          </div>
          <div className="status-item">
            <i className="fas fa-user-secret"></i>
            <span>STEALTH: {systemStatus.stealthMode ? 'ENABLED' : 'DISABLED'}</span>
          </div>
          <div className="status-item">
            <i className="fas fa-exclamation-triangle"></i>
            <span style={{ color: getStatusColor(systemStatus.threatLevel) }}>
              THREAT: {systemStatus.threatLevel.toUpperCase()}
            </span>
          </div>
          <div className="status-item">
            <i className="fas fa-clock"></i>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <header className="header">
          <div className="logo">
            <span className="logo-text">
              {isAuthenticated ? `[${userData?.username}@root~]#` : '[anonymous@guest~]$'}
            </span>
            <span className="cursor"></span>
          </div>
          
          <div className="status-indicators">
            <div className={`status ${systemStatus.connected ? 'active' : 'danger'}`}>
              {systemStatus.connected ? 'CONNECTED' : 'DISCONNECTED'}
            </div>
            <div className={`status ${systemStatus.encrypting ? 'warning' : 'danger'}`}>
              {systemStatus.encrypting ? 'ENCRYPTING' : 'UNENCRYPTED'}
            </div>
            <div className={`status ${systemStatus.stealthMode ? 'active' : 'danger'}`}>
              {systemStatus.stealthMode ? 'STEALTH MODE' : 'VISIBLE'}
            </div>
            {isAuthenticated && (
              <div className="status success">
                <i className="fas fa-user-secret"></i> ROOT ACCESS
              </div>
            )}
          </div>
        </header>
        
        <div className="content-wrapper">
          {!isAuthenticated ? (
            <LoginSystem onLogin={handleLogin} />
          ) : (
            <>
              <div className="content-grid">
                <div className="left-panel">
                  <div className="panel-header">
                    <h3><i className="fas fa-crosshairs"></i> ACTIVE OPERATIONS</h3>
                    <div className="panel-controls">
                      <button className="control-btn">
                        <i className="fas fa-play"></i>
                      </button>
                      <button className="control-btn">
                        <i className="fas fa-pause"></i>
                      </button>
                      <button className="control-btn danger" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="operations-panel">
                    <HackingAnimation />
                    
                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Target Penetration</span>
                        <span>{hackingProgress.toFixed(1)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${hackingProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="active-targets">
                      <h4>ACTIVE TARGETS</h4>
                      <div className="targets-grid">
                        <div className="target-item online">
                          <div className="target-info">
                            <span className="target-name">MAIN SERVER</span>
                            <span className="target-ip">192.168.1.1</span>
                          </div>
                          <div className="target-status">
                            <span className="status-dot online"></span>
                            <span>EXPLOITING</span>
                          </div>
                        </div>
                        <div className="target-item warning">
                          <div className="target-info">
                            <span className="target-name">DATABASE</span>
                            <span className="target-ip">192.168.1.2</span>
                          </div>
                          <div className="target-status">
                            <span className="status-dot warning"></span>
                            <span>SCANNING</span>
                          </div>
                        </div>
                        <div className="target-item danger">
                          <div className="target-info">
                            <span className="target-name">FIREWALL</span>
                            <span className="target-ip">192.168.1.3</span>
                          </div>
                          <div className="target-status">
                            <span className="status-dot danger"></span>
                            <span>BLOCKED</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="right-panel">
                  <div className="panel-header">
                    <h3><i className="fas fa-terminal"></i> SYSTEM TERMINAL</h3>
                    <div className="panel-controls">
                      <span className="tab active">MAIN</span>
                      <span className="tab">LOGS</span>
                      <span className="tab">TOOLS</span>
                    </div>
                  </div>
                  
                  <div className="terminal-container">
                    <Terminal user={userData} />
                    
                    <div className="quick-commands">
                      <h4>QUICK COMMANDS</h4>
                      <div className="commands-grid">
                        <button className="command-btn" onClick={() => setHackingProgress(0)}>
                          <i className="fas fa-redo"></i> RESET
                        </button>
                        <button className="command-btn">
                          <i className="fas fa-search"></i> SCAN
                        </button>
                        <button className="command-btn">
                          <i className="fas fa-skull-crossbones"></i> EXPLOIT
                        </button>
                        <button className="command-btn">
                          <i className="fas fa-file-export"></i> EXFILTRATE
                        </button>
                        <button className="command-btn danger" onClick={handleLogout}>
                          <i className="fas fa-power-off"></i> LOGOUT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-preview">
                <Dashboard 
                  user={userData} 
                  onLogout={handleLogout}
                  hackingProgress={hackingProgress}
                />
              </div>
            </>
          )}
        </div>
        
        <footer className="footer">
          <div className="connection-status">
            <span className="dot online"></span>
            {isAuthenticated ? (
              <>
                SESSION: {userData?.sessionId} | 
                ACCESS: {userData?.accessLevel} | 
                CLEARANCE: LEVEL {userData?.clearance}
              </>
            ) : (
              'AUTHENTICATION REQUIRED | ACCESS: GUEST | CLEARANCE: LEVEL 0'
            )}
          </div>
          <div className="system-info">
            <div className="info-item">
              <i className="fas fa-server"></i>
              <span>TARGET: 192.168.1.0/24</span>
            </div>
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <span>[{new Date().toLocaleTimeString()} UTC]</span>
            </div>
            <div className="info-item">
              <i className="fas fa-database"></i>
              <span>DATA: {Math.floor(Math.random() * 1000)} GB</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Connection Lines Animation */}
      <div className="connection-lines">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="connection-line"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Glitch Effect */}
      <div className="glitch-overlay"></div>
    </div>
  )
}

export default App
