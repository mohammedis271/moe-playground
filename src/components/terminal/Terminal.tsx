import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'
import { parseCommand, getHumorousResponse } from '@/lib/terminal-parser'
import { commands } from '@/lib/commands'

interface TerminalLine {
  id: string
  type: 'input' | 'output' | 'error'
  content: string | string[]
}

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '0',
      type: 'output',
      content: [
        'Welcome to MOE\'S WORKSHOP TERMINAL v1.0',
        'Type "help" for available commands.',
        ''
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedInput = input.trim()
    
    if (!trimmedInput) {
      return
    }

    const { command } = parseCommand(trimmedInput)
    
    const inputLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      content: `$ ${trimmedInput}`
    }

    if (command === 'clear') {
      setLines([])
      setInput('')
      setHistory([...history, trimmedInput])
      setHistoryIndex(-1)
      return
    }

    const cmd = commands[command]
    let outputLine: TerminalLine

    if (cmd) {
      const result = cmd.execute()
      outputLine = {
        id: (Date.now() + 1).toString(),
        type: result.type === 'error' ? 'error' : 'output',
        content: result.content
      }
    } else {
      outputLine = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: getHumorousResponse(command)
      }
    }

    setLines([...lines, inputLine, outputLine])
    setInput('')
    setHistory([...history, trimmedInput])
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  const renderContent = (content: string | string[]) => {
    const contentArray = Array.isArray(content) ? content : [content]
    return contentArray.map((line, i) => (
      <div key={i} className="whitespace-pre-wrap">
        {line || '\u00A0'}
      </div>
    ))
  }

  return (
    <div className="glass rounded-lg overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-black/20">
        <TerminalIcon className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-mono text-cyan-400">moe@workshop:~$</span>
      </div>
      
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2"
      >
        {lines.map((line) => (
          <div key={line.id}>
            {line.type === 'input' && (
              <div className="text-green-400">{line.content}</div>
            )}
            {line.type === 'output' && (
              <div className="text-gray-300">{renderContent(line.content)}</div>
            )}
            {line.type === 'error' && (
              <div className="text-red-400">{renderContent(line.content)}</div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-mono text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-100 font-mono text-sm outline-none"
            placeholder="Type 'help' for commands..."
            autoFocus
          />
        </div>
      </form>
    </div>
  )
}
