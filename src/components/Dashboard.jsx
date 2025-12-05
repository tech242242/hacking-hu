import { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ username }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systems, setSystems] = useState([
    { id: 1, name: 'Main Server', status: 'online', ip: '192.168.1.1', threat: 'low' },
    { id: 2, name: 'Database Cluster', status: 'online', ip: '192.168.1.2', threat: 'low' },
    { id: 3, name: 'Firewall Node', status: 'warning', ip: '192.168.1.3', threat: 'medium' },
    { id: 4, name: 'Proxy Server', status: 'offline', ip: '192.168.1.4', threat: 'high' },
  ]);

  const [logs, setLogs] = useState([
    { id: 1, time: '23:45:12', event: 'User authentication successful', type: 'success' },
    { id: 2, time: '23:44:56', event: 'Port scan detected on 192.168.1.3', type: 'warning' },
    { id: 3, time: '23:43:21', event: 'Database backup completed', type: 'info' },
    { id: 4, time: '23:42:15', event: 'Firewall rules updated', type: 'info' },
    { id: 5, time: '23:40:08', event: 'Failed login attempt from 203.0.113.5', type: 'error' },
  ]);

  const [hackingProgress, setHackingProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLogs(prev => [{
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        event: `System heartbeat - ${Math.random() > 0.5 ? 'Normal' : 'Elevated'}`,
        type: 'info'
      }, ...prev.slice(0, 9)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const startPortScan = () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setHackingProgress(0);
    
    const interval = setInterval(() => {
      setHackingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setLogs(prevLogs => [{
            id: Date.now(),
            time: new Date().toLocaleTimeString(),
            event: 'Port scan completed - 3 open ports found',
            type: 'success'
          }, ...prevLogs]);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const launchExploit = () => {
    setLogs(prev => [{
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      event: 'Initializing exploit sequence...',
      type: 'warning'
    }, ...prev]);
    
    setTimeout(() => {
      setLogs(prev => [{
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        event: 'Exploit successful - Access gained to target',
        type: 'success'
      }, ...prev]);
    }, 3000);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">
            <i className="fas fa-terminal"></i> SYSTEM CONTROL PANEL
          </h1>
          <div className="user-info">
            <span className="user-badge">ROOT</span>
            <span className="username">Welcome, {username}</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="system-status">
            <span className="status-indicator online"></span>
            <span>SYSTEM STATUS: OPERATIONAL</span>
          </div>
          <div className="current-time">
            {new Date().toLocaleTimeString()} UTC
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="fas fa-tachometer-alt"></i> OVERVIEW
        </button>
        <button 
          className={`tab ${activeTab === 'systems' ? 'active' : ''}`}
          onClick={() => setActiveTab('systems')}
        >
          <i className="fas fa-server"></i> SYSTEMS
        </button>
        <button 
          className={`tab ${activeTab === 'network' ? 'active' : ''}`}
          onClick={() => setActiveTab('network')}
        >
          <i className="fas fa-network-wired"></i> NETWORK
        </button>
        <button 
          className={`tab ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          <i className="fas fa-tools"></i> TOOLS
        </button>
        <button 
          className={`tab ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <i className="fas fa-clipboard-list"></i> LOGS
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            <div className="overview-card stats">
              <h3>SYSTEM STATISTICS</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">12</div>
                  <div className="stat-label">ACTIVE CONNECTIONS</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">3</div>
                  <div className="stat-label">THREATS DETECTED</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">98%</div>
                  <div className="stat-label">UPTIME</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">256-bit</div>
                  <div className="stat-label">ENCRYPTION</div>
                </div>
              </div>
            </div>

            <div className="overview-card activity">
              <h3>RECENT ACTIVITY</h3>
              <div className="activity-list">
                {logs.slice(0, 5).map(log => (
                  <div key={log.id} className={`activity-item ${log.type}`}>
                    <span className="activity-time">{log.time}</span>
                    <span className="activity-event">{log.event}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overview-card quick-tools">
              <h3>QUICK TOOLS</h3>
              <div className="tools-grid">
                <button className="tool-btn" onClick={startPortScan}>
                  <i className="fas fa-search"></i>
                  PORT SCAN
                </button>
                <button className="tool-btn">
                  <i className="fas fa-shield-alt"></i>
                  FIREWALL
                </button>
                <button className="tool-btn" onClick={launchExploit}>
                  <i className="fas fa-bolt"></i>
                  LAUNCH EXPLOIT
                </button>
                <button className="tool-btn">
                  <i className="fas fa-file-export"></i>
                  EXFILTRATE DATA
                </button>
              </div>
              
              {isScanning && (
                <div className="scan-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${hackingProgress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">Scanning... {hackingProgress}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'systems' && (
          <div className="systems-grid">
            {systems.map(system => (
              <div key={system.id} className={`system-card ${system.status}`}>
                <div className="system-header">
                  <h4>{system.name}</h4>
                  <span className={`system-status ${system.status}`}>
                    {system.status.toUpperCase()}
                  </span>
                </div>
                <div className="system-info">
                  <div className="info-row">
                    <span>IP Address:</span>
                    <span className="ip-address">{system.ip}</span>
                  </div>
                  <div className="info-row">
                    <span>Threat Level:</span>
                    <span className={`threat-level ${system.threat}`}>
                      {system.threat.toUpperCase()}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>Uptime:</span>
                    <span>24d 15h 32m</span>
                  </div>
                </div>
                <div className="system-actions">
                  <button className="action-btn">
                    <i className="fas fa-terminal"></i> SSH
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-chart-bar"></i> MONITOR
                  </button>
                  <button className="action-btn danger">
                    <i className="fas fa-power-off"></i> REBOOT
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="logs-container">
            <div className="logs-header">
              <h3>SYSTEM LOGS</h3>
              <button className="refresh-btn">
                <i className="fas fa-sync-alt"></i> REFRESH
              </button>
            </div>
            <div className="logs-list">
              {logs.map(log => (
                <div key={log.id} className={`log-entry ${log.type}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-event">{log.event}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="tools-container">
            <h3>HACKING TOOLS</h3>
            <div className="tools-grid-full">
              <div className="tool-card">
                <div className="tool-icon">
                  <i className="fas fa-crosshairs"></i>
                </div>
                <h4>TARGET SCANNER</h4>
                <p>Scan for open ports and vulnerabilities</p>
                <button className="tool-launch">LAUNCH</button>
              </div>
              
              <div className="tool-card">
                <div className="tool-icon">
                  <i className="fas fa-user-secret"></i>
                </div>
                <h4>BRUTE FORCE</h4>
                <p>Password cracking utility</p>
                <button className="tool-launch">LAUNCH</button>
              </div>
              
              <div className="tool-card">
                <div className="tool-icon">
                  <i className="fas fa-network-wired"></i>
                </div>
                <h4>NETWORK MAP</h4>
                <p>Visualize network topology</p>
                <button className="tool-launch">LAUNCH</button>
              </div>
              
              <div className="tool-card">
                <div className="tool-icon">
                  <i className="fas fa-file-code"></i>
                </div>
                <h4>EXPLOIT DB</h4>
                <p>Access exploit database</p>
                <button className="tool-launch">LAUNCH</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-footer">
        <div className="footer-left">
          <span>Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          <span>Encryption: AES-256-GCM</span>
        </div>
        <div className="footer-right">
          <button className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> TERMINATE SESSION
          </button>
        </div>
      </div>

      <div className="scanlines"></div>
      <div className="noise"></div>
    </div>
  );
};

export default Dashboard;
