import { useState, useEffect } from 'react'

const GlitchText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\')#&_(),.;:?!\\|{}<>[]^~'

  const glitch = () => {
    if (!isGlitching) return
    
    const length = text.length
    let newText = text.split('')
    
    // Randomly replace some characters
    const numChanges = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < numChanges; i++) {
      const pos = Math.floor(Math.random() * length)
      newText[pos] = chars[Math.floor(Math.random() * chars.length)]
    }
    
    setDisplayText(newText.join(''))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 100)
    }, Math.random() * 5000 + 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isGlitching) {
      glitch()
      const timeout = setTimeout(() => setDisplayText(text), 100)
      return () => clearTimeout(timeout)
    }
  }, [isGlitching])

  return (
    <span className={`relative ${className}`}>
      <span className="text-green-500">{displayText}</span>
      {isGlitching && (
        <>
          <span className="absolute left-0.5 top-0 text-red-500 opacity-70 animate-glitch">
            {displayText}
          </span>
          <span className="absolute left-0 top-0.5 text-blue-500 opacity-50 animate-glitch">
            {displayText}
          </span>
        </>
      )}
    </span>
  )
}

export default GlitchText
