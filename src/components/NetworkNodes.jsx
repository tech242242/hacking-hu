import { useEffect, useRef } from 'react'

const NetworkNodes = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes = []
    const connections = []
    const numNodes = 15

    // Create nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        pulse: Math.random() * Math.PI * 2
      })
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          connections.push({
            node1: i,
            node2: j,
            distance: distance,
            active: Math.random() > 0.3
          })
        }
      }
    }

    let animationId

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      nodes.forEach(node => {
        node.x += node.speedX
        node.y += node.speedY
        node.pulse += 0.05

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.speedX *= -1
        if (node.y < 0 || node.y > canvas.height) node.speedY *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + Math.sin(node.pulse) * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#00ff00'
        ctx.shadowBlur = 15
        ctx.shadowColor = '#00ff00'
        ctx.fill()
      })

      // Draw connections
      connections.forEach(conn => {
        const node1 = nodes[conn.node1]
        const node2 = nodes[conn.node2]
        
        // Calculate new distance
        const dx = node1.x - node2.x
        const dy = node1.y - node2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(node1.x, node1.y)
          ctx.lineTo(node2.x, node2.y)
          
          // Pulsing effect
          const alpha = conn.active ? 0.3 + Math.sin(Date.now() / 1000) * 0.1 : 0.1
          ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`
          ctx.lineWidth = 1
          ctx.shadowBlur = 10
          ctx.shadowColor = '#00ff00'
          ctx.stroke()
          
          // Data packet animation
          if (conn.active && Math.random() > 0.95) {
            const progress = (Date.now() % 2000) / 2000
            const packetX = node1.x + (node2.x - node1.x) * progress
            const packetY = node1.y + (node2.y - node1.y) * progress
            
            ctx.beginPath()
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
            ctx.fillStyle = '#00ff00'
            ctx.shadowBlur = 20
            ctx.fill()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20"
      style={{ zIndex: 0 }}
    />
  )
}

export default NetworkNodes
