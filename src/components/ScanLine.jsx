const ScanLine = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-green-500/30 animate-scanline shadow-[0_0_10px_#00ff00]"></div>
    </div>
  )
}

export default ScanLine
