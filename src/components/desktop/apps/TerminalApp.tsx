import { useEffect, useRef } from 'react'
import { Terminal } from '@/components/terminal/Terminal'

export function TerminalApp() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleFocus = () => {
      const input = containerRef.current?.querySelector('input')
      if (input) {
        input.focus()
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('click', handleFocus)
      handleFocus()
      return () => container.removeEventListener('click', handleFocus)
    }
  }, [])

  return (
    <div ref={containerRef} className="h-full">
      <Terminal />
    </div>
  )
}
