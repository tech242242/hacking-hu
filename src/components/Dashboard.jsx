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
