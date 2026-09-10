import { useState, useEffect } from 'react'

export function MenuBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-purple-600 rounded flex items-center justify-center text-xs font-bold text-black">
            M
          </div>
          <span className="text-sm font-semibold text-white">MOE</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-sm text-gray-300">
          <button className="hover:text-white transition-colors">Workshop</button>
          <button className="hover:text-white transition-colors">Projects</button>
          <button className="hover:text-white transition-colors">About</button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-300">
          <span>{formatDate(time)}</span>
          <span className="text-white font-mono">{formatTime(time)}</span>
        </div>
        <div className="sm:hidden text-xs text-white font-mono">
          {formatTime(time)}
        </div>
      </div>
    </div>
  )
}
