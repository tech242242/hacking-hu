import { useState, useEffect, useRef } from 'react';
import './LoginSystem.css';

const LoginSystem = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('Muhammad Saqib');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const correctUsername = 'Muhammad Saqib';
  const correctPassword = '345678';

  const addLog = (message, type = 'info') => {
    setTerminalLogs(prev => [...prev, {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  useEffect(() => {
    const initialLogs = [
      'System boot sequence initiated...',
      'Loading security protocols...',
      'Network encryption enabled...',
      'Terminal ready for authentication...',
      'Current threat level: LOW',
      'Security Protocol: AES-256',
      'Last login: 2024-01-20 23:45:12 UTC'
    ];
    
    initialLogs.forEach((log, index) => {
      setTimeout(() => {
        addLog(log);
      }, index * 300);
    });

    setTimeout(() => {
      addLog('> AWAITING USER CREDENTIALS...', 'warning');
    }, 2500);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isLoggingIn) return;
    
    setIsLoggingIn(true);
    addLog(`> Login attempt #${attempts + 1} initiated...`, 'warning');
    addLog(`Username: ${username}`, 'info');
    addLog(`Password: ${'█'.repeat(password.length)}`, 'info');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addLog('Validating credentials with secure server...', 'info');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (username === correctUsername && password === correctPassword) {
      addLog('✓ Credentials verified successfully!', 'success');
      addLog('✓ Access level: ROOT ADMINISTRATOR', 'success');
      addLog('✓ Security clearance: LEVEL 10', 'success');
      addLog('✓ Initializing secure session...', 'success');
      
      setTimeout(() => {
        addLog('✓ Session encryption: AES-256-GCM', 'success');
        addLog('✓ Two-factor authentication: COMPLETE', 'success');
        addLog('✓ All security checks passed', 'success');
        addLog('========================================', 'success');
        addLog('ACCESS GRANTED - WELCOME TO THE SYSTEM', 'success');
        
        // Show success animation
        setTimeout(() => {
          onLoginSuccess();
        }, 2000);
      }, 1000);
    } else {
      addLog('✗ ERROR: Invalid credentials detected!', 'error');
      addLog('✗ Access denied - Authentication failed', 'error');
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        addLog('⚠ WARNING: Maximum login attempts exceeded!', 'error');
        addLog('⚠ System lockdown initiated...', 'error');
        addLog('⚠ Security protocol 7 activated', 'error');
        setShowWarning(true);
        
        setTimeout(() => {
          setShowWarning(false);
          setAttempts(0);
          addLog('System reset after security protocol', 'info');
          addLog('Ready for new authentication attempt...', 'info');
        }, 5000);
      } else {
        addLog(`Remaining attempts: ${3 - newAttempts}`, 'warning');
      }
    }
    
    setIsLoggingIn(false);
  };

  const simulateHack = () => {
    addLog('> Initiating brute force simulation...', 'warning');
    
    const hackMessages = [
      'Scanning ports...',
      'Port 22 (SSH) detected',
      'Attempting SSH brute force...',
      'Testing common credentials...',
      'admin:admin123 - FAILED',
      'root:toor - FAILED',
      'user:password - FAILED',
      'Testing dictionary attack...',
      'Progress: 15%',
      'Progress: 42%',
      'Progress: 78%',
      'CREDENTIAL FOUND: admin:admin@123',
      'Access gained to target system',
      'Covering tracks...',
      'Attack simulation complete'
    ];
    
    hackMessages.forEach((msg, index) => {
      setTimeout(() => {
        addLog(msg, index > 10 ? 'success' : 'info');
      }, index * 300);
    });
  };

  return (
    <div className="login-system">
      <div className="security-warning" style={{ display: showWarning ? 'block' : 'none' }}>
        <div className="warning-content">
          <h3>⚠ SECURITY BREACH DETECTED ⚠</h3>
          <p>Multiple failed login attempts detected</p>
          <p>System lockdown in progress...</p>
        </div>
      </div>

      <div className="login-container">
        <div className="login-header">
          <div className="header-glitch">
            <h1 className="glitch-text">SECURE TERMINAL v3.14</h1>
            <h1 className="glitch-text">SECURE TERMINAL v3.14</h1>
            <h1 className="glitch-text">SECURE TERMINAL v3.14</h1>
          </div>
          <div className="header-status">
            <span className="status-indicator active"></span>
            <span>ENCRYPTED CONNECTION</span>
            <span className="status-indicator warning"></span>
            <span>THREAT LEVEL: LOW</span>
          </div>
        </div>

        <div className="login-grid">
          <div className="login-form-container">
            <div className="form-header">
              <h2><i className="fas fa-terminal"></i> AUTHENTICATION REQUIRED</h2>
              <p>Root access requires Level 10 clearance</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <label htmlFor="username">
                  <i className="fas fa-user-secret"></i> OPERATOR ID
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter operator ID"
                    required
                    ref={inputRef}
                  />
                  <span className="input-highlight"></span>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">
                  <i className="fas fa-key"></i> ENCRYPTION KEY
                </label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter encryption key"
                    required
                  />
                  <span className="input-highlight"></span>
                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="login-button"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <span className="spinner"></span>
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-fingerprint"></i>
                      INITIATE AUTHENTICATION
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="hack-button"
                  onClick={simulateHack}
                >
                  <i className="fas fa-skull-crossbones"></i>
                  SIMULATE ATTACK
                </button>
              </div>
            </form>

            <div className="security-info">
              <div className="info-item">
                <i className="fas fa-shield-alt"></i>
                <span>AES-256 Encryption</span>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <span>Session Timeout: 15min</span>
              </div>
              <div className="info-item">
                <i className="fas fa-history"></i>
                <span>Last Login: 23:45:12 UTC</span>
              </div>
            </div>
          </div>

          <div className="terminal-container">
            <div className="terminal-header">
              <div className="terminal-title">
                <span>SYSTEM TERMINAL</span>
                <div className="terminal-controls">
                  <span className="control red"></span>
                  <span className="control yellow"></span>
                  <span className="control green"></span>
                </div>
              </div>
            </div>
            
            <div className="terminal-output" ref={terminalRef}>
              {terminalLogs.map((log) => (
                <div key={log.id} className={`terminal-line ${log.type}`}>
                  <span className="timestamp">[{log.timestamp}]</span>
                  <span className="message">{log.message}</span>
                  {log.type === 'success' && <span className="blink">_</span>}
                </div>
              ))}
              {isLoggingIn && (
                <div className="terminal-line info">
                  <span className="timestamp">[{new Date().toLocaleTimeString()}]</span>
                  <span className="typing-animation">
                    Processing authentication<span className="dots"></span>
                  </span>
                </div>
              )}
            </div>
            
            <div className="terminal-input">
              <span className="prompt">root@secure:~#</span>
              <input
                type="text"
                placeholder="Type 'help' for commands"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addLog(`> ${e.target.value}`, 'command');
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="login-footer">
          <div className="connection-status">
            <span className="status-dot active"></span>
            CONNECTED TO: SECURE_SERVER_01
          </div>
          <div className="attempts-counter">
            Login Attempts: {attempts}/3
          </div>
          <div className="system-time">
            {new Date().toLocaleTimeString()} UTC
          </div>
        </div>
      </div>

      <div className="scanlines"></div>
      <div className="noise"></div>
    </div>
  );
};

export default LoginSystem;
