import { useState, useEffect } from 'react'
import LoginSystem from './components/LoginSystem'
import Dashboard from './components/Dashboard'
import MatrixRain from './components/MatrixRain'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [showMatrix, setShowMatrix] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMatrix(false)
    }, 4000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleLoginSuccess = (user) => {
    setUsername(user || 'Muhammad Saqib')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
  }

  return (
    <div className="app-container">
      {showMatrix && <MatrixRain />}
      
      <div className={`main-content ${isLoggedIn ? 'dashboard-view' : 'login-view'}`}>
        {isLoggedIn ? (
          <Dashboard 
            username={username} 
            onLogout={handleLogout}
          />
        ) : (
          <LoginSystem onLoginSuccess={() => handleLoginSuccess('Muhammad Saqib')} />
        )}
      </div>
      
      <div className="global-status-bar">
        <div className="status-item">
          <span className="status-dot online"></span>
          <span>CONNECTED</span>
        </div>
        <div className="status-item">
          <i className="fas fa-shield-alt"></i>
          <span>ENCRYPTED</span>
        </div>
        <div className="status-item">
          <i className="fas fa-clock"></i>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}

export default App
