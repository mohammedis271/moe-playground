import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { WindowState, AppDefinition } from '@/types/desktop'

interface DesktopContextValue {
  windows: WindowState[]
  openWindow: (appId: string, app: AppDefinition) => void
  closeWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  focusWindow: (windowId: string) => void
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void
  getAppById: (appId: string) => AppDefinition | undefined
}

const DesktopContext = createContext<DesktopContextValue | undefined>(undefined)

interface DesktopProviderProps {
  children: ReactNode
  apps: AppDefinition[]
}

export function DesktopProvider({ children, apps }: DesktopProviderProps) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [nextZIndex, setNextZIndex] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()

  const getAppById = useCallback((appId: string) => {
    return apps.find(a => a.id === appId)
  }, [apps])

  useEffect(() => {
    const path = location.pathname.replace('/desktop/', '')
    if (path && path !== '/desktop') {
      const app = apps.find(a => a.id === path)
      if (app && !windows.some(w => w.appId === app.id)) {
        openWindow(app.id, app)
      }
    }
  }, [location.pathname])

  const openWindow = useCallback((appId: string, app: AppDefinition) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId)
      if (existing) {
        setNextZIndex((z) => z + 1)
        navigate(`/desktop/${appId}`, { replace: true })
        return prev.map((w) =>
          w.id === existing.id
            ? { ...w, isMinimized: false, isFocused: true, zIndex: nextZIndex }
            : { ...w, isFocused: false }
        )
      }

      const defaultSize = app.defaultSize || { width: 800, height: 600 }
      const defaultPosition = app.defaultPosition || {
        x: Math.max(100, globalThis.innerWidth / 2 - defaultSize.width / 2),
        y: Math.max(80, globalThis.innerHeight / 2 - defaultSize.height / 2)
      }

      const newWindow: WindowState = {
        id: `${appId}-${Date.now()}`,
        appId,
        title: app.name,
        isOpen: true,
        isMinimized: false,
        isFocused: true,
        position: defaultPosition,
        size: defaultSize,
        zIndex: nextZIndex
      }

      setNextZIndex((z) => z + 1)
      navigate(`/desktop/${appId}`, { replace: true })
      return [...prev.map((w) => ({ ...w, isFocused: false })), newWindow]
    })
  }, [nextZIndex, navigate])

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      const filtered = prev.filter((w) => w.id !== windowId)
      const closedWindow = prev.find(w => w.id === windowId)
      if (closedWindow?.isFocused && location.pathname.includes(closedWindow.appId)) {
        navigate('/desktop', { replace: true })
      }
      return filtered
    })
  }, [navigate, location.pathname])

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMinimized: true, isFocused: false } : w
      )
    )
  }, [])

  const focusWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      const window = prev.find(w => w.id === windowId)
      if (window) {
        navigate(`/desktop/${window.appId}`, { replace: true })
      }
      return prev.map((w) =>
        w.id === windowId
          ? { ...w, isFocused: true, isMinimized: false, zIndex: nextZIndex }
          : { ...w, isFocused: false }
      )
    })
    setNextZIndex((z) => z + 1)
  }, [nextZIndex, navigate])

  const updateWindowPosition = useCallback(
    (windowId: string, position: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, position } : w))
      )
    },
    []
  )

  const updateWindowSize = useCallback(
    (windowId: string, size: { width: number; height: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, size } : w))
      )
    },
    []
  )

  return (
    <DesktopContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
        getAppById
      }}
    >
      {children}
    </DesktopContext.Provider>
  )
}

export function useDesktop() {
  const context = useContext(DesktopContext)
  if (!context) {
    throw new Error('useDesktop must be used within DesktopProvider')
  }
  return context
}
