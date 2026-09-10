import { useEffect, useRef } from 'react'
import { Terminal } from '@/components/terminal/Terminal'

interface TerminalAppProps {
  isFocused?: boolean
}

export function TerminalApp({ isFocused = true }: TerminalAppProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const input = containerRef.current?.querySelector('input')
    if (!input) return

    if (isFocused) {
      input.focus()
    } else {
      input.blur()
    }
  }, [isFocused])

  const handleClick = () => {
    if (isFocused) {
      const input = containerRef.current?.querySelector('input')
      input?.focus()
    }
  }

  return (
    <div ref={containerRef} className="h-full" onClick={handleClick}>
      <Terminal />
    </div>
  )
}
