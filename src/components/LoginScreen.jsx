import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoginScreen = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState([])
  const [showAccessGranted, setShowAccessGranted] = useState(false)
  const terminalRef = useRef(null)

  const terminalLines = [
    "> INITIALIZING SECURE CONNECTION...",
    "> CONNECTING TO DATABASE SERVER...",
    "> ENCRYPTING TRANSMISSION...",
    "> AUTHENTICATION PROTOCOL ENGAGED...",
    "> VERIFYING USER CREDENTIALS...",
    "> CHECKING SECURITY CLEARANCE...",
    "> ACCESS LEVEL: ADMINISTRATOR",
    "> WELCOME BACK, OPERATIVE",
  ]

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput])

  const addTerminalLine = (text, color = "text-green-500") => {
    setTerminalOutput(prev => [...prev, { text, color, id: Date.now() }])
  }

  const simulateLogin = () => {
    if (!username || !password) {
      setLoginError(true)
      addTerminalLine("> ERROR: CREDENTIALS REQUIRED", "text-red-500")
      return
    }

    if (username === "Muhammad Saqib" && password === "345678") {
      setIsLoggingIn(true)
      setLoginError(false)
      
      // Clear previous outputs
      setTerminalOutput([])
      
      // Simulate hacking sequence
      const sequence = [
        { text: "> INITIATING SECURE LOGIN PROTOCOL...", delay: 500 },
        { text: "> USERNAME: " + username, delay: 800 },
        { text: "> PASSWORD: ********", delay: 800 },
        { text: "> ENCRYPTING CREDENTIALS...", delay: 1000 },
        { text: "> CONNECTING TO MAINFRAME...", delay: 1200 },
        { text: "> VERIFYING SECURITY CLEARANCE...", delay: 1500 },
        { text: "> ✓ CLEARANCE LEVEL: ALPHA", delay: 1800, color: "text-green-500" },
        { text: "> BYPASSING FIREWALL...", delay: 2000 },
        { text: "> ACCESS GRANTED", delay: 2500, color: "text-green-500" },
        { text: "> WELCOME TO THE SYSTEM, " + username.toUpperCase(), delay: 2800, color: "text-green-500" },
      ]

      let currentDelay = 0
      sequence.forEach((step, index) => {
        setTimeout(() => {
          addTerminalLine(step.text, step.color || "text-green-400")
          
          if (index === sequence.length - 1) {
            setTimeout(() => {
              setShowAccessGranted(true)
              setTimeout(() => {
                onLoginSuccess()
              }, 3000)
            }, 1000)
          }
        }, currentDelay + step.delay)
        currentDelay += step.delay
      })
    } else {
      setLoginError(true)
      addTerminalLine("> ACCESS DENIED: INVALID CREDENTIALS", "text-red-500")
      addTerminalLine("> SYSTEM LOCKOUT IN 2 ATTEMPTS", "text-red-500")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    simulateLogin()
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-green-900/10 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
        
        {/* Binary Rain */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-500 font-bold text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -20}%`,
                animation: `matrix ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>

      {/* Main Login Interface */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-green-500 mb-4 tracking-wider">
            <span className="animate-pulse">[</span>
            CYBER<span className="text-red-500">OPS</span>
            <span className="animate-pulse">]</span>
          </h1>
          <p className="text-green-400 text-lg tracking-wider font-terminal">
            SECURE ACCESS POINT - CLASSIFIED
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <div className="text-green-400 text-sm">SYSTEM STATUS: ONLINE</div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </motion.header>

        {/* Login Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-black/80 backdrop-blur-sm border-2 border-green-500/50 rounded-lg overflow-hidden shadow-2xl shadow-green-900/30"
        >
          {/* Terminal Header */}
          <div className="bg-green-900/30 border-b border-green-500/30 p-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-green-400 text-sm tracking-wider ml-4">
                root@cyberops:~# login_terminal
              </div>
              <div className="ml-auto text-green-500 animate-pulse">●</div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Terminal */}
              <div className="space-y-6">
                <div className="bg-black/50 border border-green-500/30 rounded p-4 h-64 overflow-y-auto font-terminal text-sm"
                     ref={terminalRef}>
                  <div className="text-green-400 mb-2">> INITIALIZING TERMINAL...</div>
                  <div className="text-green-400 mb-2">> WELCOME TO CYBEROPS SECURITY</div>
                  <div className="text-green-400 mb-2">> DATE: {new Date().toLocaleDateString()}</div>
                  <div className="text-green-400 mb-2">> TIME: {new Date().toLocaleTimeString()}</div>
                  <div className="text-green-400 mb-2">> ENTER CREDENTIALS TO CONTINUE</div>
                  <div className="h-px bg-green-500/30 my-3"></div>
                  
                  {terminalOutput.map((line) => (
                    <div key={line.id} className={`mb-1 ${line.color} font-terminal`}>
                      {line.text}
                    </div>
                  ))}
                  
                  {isLoggingIn && terminalOutput.length === 0 && (
                    <div className="text-green-400 animate-pulse">
                      > CONNECTING TO SERVER<span className="animate-pulse">...</span>
                    </div>
                  )}
                </div>

                {/* System Status */}
                <div className="bg-black/50 border border-green-500/30 rounded p-4">
                  <h3 className="text-green-500 font-bold mb-3">SYSTEM STATUS</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-400">FIREWALL:</span>
                      <span className="text-green-500">ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-400">ENCRYPTION:</span>
                      <span className="text-green-500">AES-256</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-400">CONNECTION:</span>
                      <span className="text-green-500">SECURE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="space-y-6">
                <div className="bg-black/50 border border-green-500/30 rounded p-6">
                  <h3 className="text-green-500 text-xl font-bold mb-6 tracking-wider">
                    <i className="fas fa-user-secret mr-2"></i>
                    SECURE LOGIN
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-green-400 mb-2 font-terminal">
                        <i className="fas fa-user mr-2"></i>
                        USERNAME
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full bg-black/70 border border-green-500/50 text-green-400 p-3 pl-10 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-terminal"
                          placeholder="Enter operative ID"
                        />
                        <i className="fas fa-user-secret absolute left-3 top-3.5 text-green-500"></i>
                      </div>
                    </div>

                    <div>
                      <label className="block text-green-400 mb-2 font-terminal">
                        <i className="fas fa-key mr-2"></i>
                        PASSWORD
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-black/70 border border-green-500/50 text-green-400 p-3 pl-10 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-terminal"
                          placeholder="Enter access code"
                        />
                        <i className="fas fa-lock absolute left-3 top-3.5 text-green-500"></i>
                      </div>
                    </div>

                    {loginError && (
                      <div className="bg-red-900/30 border border-red-500/50 rounded p-3">
                        <div className="text-red-400 font-terminal flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i>
                          ACCESS DENIED - INVALID CREDENTIALS
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className={`w-full py-3 px-6 rounded font-bold tracking-wider transition-all duration-300 ${
                        isLoggingIn
                          ? 'bg-green-900/50 text-green-400 cursor-not-allowed'
                          : 'bg-green-900/70 text-green-400 hover:bg-green-900 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/30'
                      } border border-green-500/50 font-terminal`}
                    >
                      {isLoggingIn ? (
                        <span className="flex items-center justify-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          AUTHENTICATING...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <i className="fas fa-terminal mr-2"></i>
                          INITIATE LOGIN SEQUENCE
                        </span>
                      )}
                    </button>
                  </form>
                </div>

                {/* Security Notice */}
                <div className="bg-black/50 border border-red-500/30 rounded p-4">
                  <h4 className="text-red-500 font-bold mb-2 flex items-center">
                    <i className="fas fa-shield-alt mr-2"></i>
                    SECURITY NOTICE
                  </h4>
                  <p className="text-red-400/80 text-sm">
                    All access attempts are logged and monitored. Unauthorized access will result in immediate system lockdown.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-green-400/70 text-sm"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>ENCRYPTED CONNECTION</span>
            </div>
            <div className="hidden md:block">|</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>NO TRACE PROTOCOL</span>
            </div>
            <div className="hidden md:block">|</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>24/7 MONITORING</span>
            </div>
          </div>
          <p className="font-terminal tracking-wider">
            CYBEROPS SECURITY SYSTEM v3.14 © 2024
          </p>
        </motion.footer>
      </div>

      {/* Access Granted Overlay */}
      <AnimatePresence>
        {showAccessGranted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="mb-8"
              >
                <div className="text-6xl md:text-8xl font-bold text-green-500 mb-4">
                  ACCESS GRANTED
                </div>
                <div className="text-3xl text-green-400 mb-2">
                  WELCOME, {username.toUpperCase()}
                </div>
                <div className="text-green-300">
                  Security Clearance: LEVEL ALPHA
                </div>
              </motion.div>

              <div className="space-y-4">
                <div className="text-green-400">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  INITIALIZING MAIN INTERFACE...
                </div>
                <div className="w-64 h-1 bg-green-900/50 mx-auto rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hacking Effects */}
      {isLoggingIn && (
        <>
          <div className="fixed inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-500 font-terminal text-xl"
                initial={{ y: -100, x: Math.random() * window.innerWidth }}
                animate={{ y: window.innerHeight + 100 }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </motion.div>
            ))}
          </div>
          
          <div className="fixed inset-0 bg-gradient-to-t from-green-900/10 to-transparent pointer-events-none" />
        </>
      )}
    </div>
  )
}

export default LoginScreen
