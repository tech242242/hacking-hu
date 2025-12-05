import { useState, useEffect, useRef } from 'react'
import './Terminal.css'

const Terminal = () => {
  const [commands, setCommands] = useState([
    { id: 1, text: 'root@hack:~# nmap -sS 192.168.1.0/24', type: 'input' },
    { id: 2, text: 'Starting Nmap 7.80 at 2024-01-20 23:45 UTC', type: 'output' },
    { id: 3, text: 'Discovered open port 22/tcp on 192.168.1.1', type: 'output' },
    { id: 4, text: 'Discovered open port 80/tcp on 192.168.1.1', type: 'output' },
    { id: 5, text: 'root@hack:~# hydra -l admin -P passlist.txt ssh://192.168.1.1', type: 'input' },
  ])
  
  const [currentCommand, setCurrentCommand] = useState('')
  const terminalRef = useRef(null)

  const commandsList = [
    'scan network',
    'bruteforce ssh',
    'sql injection',
    'decode hash',
    'port scan',
    'exploit vulnerability',
    'clear logs',
    'establish backdoor'
  ]

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentCommand.trim()) return

    const newCommands = [...commands]
    newCommands.push({ id: Date.now(), text: `root@hack:~# ${currentCommand}`, type: 'input' })
    
    // Simulate response
    setTimeout(() => {
      const responses = [
        `Command executed: ${currentCommand}`,
        'Access granted - Root privileges obtained',
        'Firewall bypassed successfully',
        'Encryption key found: 0x4F9A2B...',
        'Data exfiltration in progress',
        'Vulnerability exploited successfully'
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      newCommands.push({ 
        id: Date.now() + 1, 
        text: randomResponse, 
        type: 'output',
        color: Math.random() > 0.5 ? '#00ff00' : '#ff0000'
      })
      
      setCommands(newCommands)
    }, 500)

    setCurrentCommand('')
  }

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-title">
          <span className="title-text">SECURITY TERMINAL v3.14</span>
          <div className="terminal-controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>
        </div>
      </div>

      <div className="terminal-body" ref={terminalRef}>
        <div className="welcome-message">
          <div className="ascii-art">
            {`
  ██╗  ██╗ █████╗  ██████╗██╗  ██╗███╗   ██╗ ██████╗ 
  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝████╗  ██║██╔════╝ 
  ███████║███████║██║     █████╔╝ ██╔██╗ ██║██║  ███╗
  ██╔══██║██╔══██║██║     ██╔═██╗ ██║╚██╗██║██║   ██║
  ██║  ██║██║  ██║╚██████╗██║  ██╗██║ ╚████║╚██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
            `}
          </div>
          <p className="welcome-text">Type 'help' for available commands</p>
        </div>

        {commands.map((cmd) => (
          <div key={cmd.id} className={`command-line ${cmd.type}`}>
            <span className="prompt">{cmd.type === 'input' ? '$' : '>'}</span>
            <span 
              className="command-text"
              style={{ color: cmd.color || (cmd.type === 'input' ? '#00ff00' : '#ffffff') }}
            >
              {cmd.text}
            </span>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="input-line">
          <span className="prompt">$</span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            className="command-input"
            placeholder="Type command here..."
            autoFocus
          />
        </form>
      </div>

      <div className="terminal-footer">
        <div className="suggestions">
          {commandsList.map((cmd, index) => (
            <button
              key={index}
              className="suggestion"
              onClick={() => setCurrentCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Terminal
