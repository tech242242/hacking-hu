import { useState, useEffect } from 'react'
import HackingAnimation from './components/HackingAnimation'
import Terminal from './components/Terminal'
import MatrixRain from './components/MatrixRain'
import './App.css'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>SYSTEM CRASH DETECTED</h1>
          <p style={{ color: '#0f0', marginBottom: '10px' }}>
            Error: {this.state.error?.message || 'Unknown error'}
          </p>
          <button onClick={() => window.location.reload()}>
            REBOOT SYSTEM
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App Component
function App() {
  const [showMatrix, setShowMatrix] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    console.log('App component mounted');
    
    const timer = setTimeout(() => {
      setShowMatrix(false)
      setIsLoaded(true)
      console.log('Matrix animation stopped, app loaded');
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  // Check if components exist
  const componentsExist = () => {
    try {
      return HackingAnimation && Terminal && MatrixRain;
    } catch (error) {
      console.error('Component loading error:', error);
      return false;
    }
  }

  if (!componentsExist()) {
    return (
      <div className="app-container" style={{ 
        background: '#000',
        color: '#f00',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>
          <h1>COMPONENT LOADING FAILED</h1>
          <p>Please check component files</p>
          <button onClick={() => window.location.reload()}>
            RETRY LOADING
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="app-container">
        {showMatrix && <MatrixRain />}
        
        <div className="main-interface" style={{ opacity: isLoaded ? 1 : 0 }}>
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
              [{new Date().toLocaleTimeString()}]
            </div>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
