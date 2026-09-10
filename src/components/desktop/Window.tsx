import { useRef, useEffect, useState } from 'react'
import { X, Minus } from 'lucide-react'
import { useDesktop } from '@/contexts/DesktopContext'
import { WindowContent } from './WindowContent'
import type { WindowState, AppDefinition } from '@/types/desktop'

interface WindowProps {
  window: WindowState
  app: AppDefinition
}

export function Window({ window, app }: WindowProps) {
  const { closeWindow, minimizeWindow, focusWindow, updateWindowPosition } = useDesktop()
  const windowRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(globalThis.innerWidth < 768)
    checkMobile()
    globalThis.addEventListener('resize', checkMobile)
    return () => globalThis.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!window.isFocused) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      e.preventDefault()

      const deltaX = e.clientX - dragStartRef.current.x
      const deltaY = e.clientY - dragStartRef.current.y

      const newX = Math.max(0, Math.min(window.position.x + deltaX, globalThis.innerWidth - 200))
      const newY = Math.max(0, Math.min(window.position.y + deltaY, globalThis.innerHeight - 100))

      updateWindowPosition(window.id, { x: newX, y: newY })
      dragStartRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      document.body.style.cursor = 'default'
    }

    if (isDraggingRef.current) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [window, updateWindowPosition])

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return
    isDraggingRef.current = true
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    document.body.style.cursor = 'grabbing'
    focusWindow(window.id)
  }

  if (window.isMinimized) return null

  const AppComponent = app.component

  return (
    <div
      ref={windowRef}
      className="absolute bg-zinc-900/95 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl"
      style={
        isMobile
          ? {
              left: 8,
              top: 8,
              right: 8,
              bottom: 88,
              width: 'auto',
              height: 'auto',
              zIndex: window.zIndex
            }
          : {
              left: window.position.x,
              top: window.position.y,
              width: window.size.width,
              height: window.size.height,
              zIndex: window.zIndex
            }
      }
      onClick={() => focusWindow(window.id)}
    >
      <div
        className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 border-b border-white/10 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 flex-1">
          <app.icon className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-gray-200">{window.title}</span>
        </div>
        <div className="flex items-center gap-2" data-no-drag>
          <button
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(window.id)
            }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
            aria-label="Minimize"
          >
            <Minus className="w-2 h-2 text-yellow-900 opacity-0 hover:opacity-100 mx-auto" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(window.id)
            }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
            aria-label="Close"
          >
            <X className="w-2 h-2 text-red-900 opacity-0 hover:opacity-100 mx-auto" />
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-52px)] overflow-auto">
        <WindowContent 
          appId={app.id}
          component={AppComponent}
          isFocused={window.isFocused}
        />
      </div>
    </div>
  )
}
