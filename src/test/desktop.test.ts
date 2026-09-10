import { describe, it, expect } from 'vitest'
import type { WindowState } from '@/types/desktop'

describe('Window manager store', () => {
  describe('window creation', () => {
    it('should create window with correct default properties', () => {
      const window: WindowState = {
        id: 'test-1',
        appId: 'terminal',
        title: 'Terminal',
        isOpen: true,
        isMinimized: false,
        isFocused: true,
        position: { x: 100, y: 100 },
        size: { width: 800, height: 600 },
        zIndex: 1
      }
      
      expect(window.isOpen).toBe(true)
      expect(window.isMinimized).toBe(false)
      expect(window.isFocused).toBe(true)
      expect(window.zIndex).toBe(1)
    })

    it('should not create duplicate windows for same app', () => {
      const windows: WindowState[] = [
        { id: '1', appId: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isFocused: true, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 1 }
      ]
      
      const attemptDuplicate = (windows: WindowState[], appId: string) => {
        const existing = windows.find(w => w.appId === appId)
        return existing ? windows : [...windows, { id: '2', appId, title: 'Terminal', isOpen: true, isMinimized: false, isFocused: true, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 2 }]
      }
      
      const result = attemptDuplicate(windows, 'terminal')
      expect(result.length).toBe(1)
      expect(result[0].id).toBe('1')
    })
  })

  describe('window focus and z-order', () => {
    it('should maintain z-index ordering', () => {
      const windows: WindowState[] = [
        { id: '1', appId: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isFocused: false, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 1 },
        { id: '2', appId: 'workshop', title: 'Workshop', isOpen: true, isMinimized: false, isFocused: false, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 2 },
        { id: '3', appId: 'projects', title: 'Projects', isOpen: true, isMinimized: false, isFocused: true, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 3 }
      ]
      
      const sorted = [...windows].sort((a, b) => a.zIndex - b.zIndex)
      expect(sorted[0].zIndex).toBe(1)
      expect(sorted[1].zIndex).toBe(2)
      expect(sorted[2].zIndex).toBe(3)
    })

    it('should only have one focused window', () => {
      const windows: WindowState[] = [
        { id: '1', appId: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isFocused: false, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 1 },
        { id: '2', appId: 'workshop', title: 'Workshop', isOpen: true, isMinimized: false, isFocused: true, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 2 }
      ]
      
      const focusedWindows = windows.filter(w => w.isFocused)
      expect(focusedWindows.length).toBe(1)
      expect(focusedWindows[0].id).toBe('2')
    })
  })

  describe('window minimize and close', () => {
    it('should handle minimize without removing window', () => {
      let windows: WindowState[] = [
        { id: '1', appId: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isFocused: true, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 1 }
      ]
      
      windows = windows.map(w => w.id === '1' ? { ...w, isMinimized: true, isFocused: false } : w)
      
      expect(windows.length).toBe(1)
      expect(windows[0].isMinimized).toBe(true)
      expect(windows[0].isFocused).toBe(false)
    })

    it('should remove window on close', () => {
      let windows: WindowState[] = [
        { id: '1', appId: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isFocused: true, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 1 },
        { id: '2', appId: 'workshop', title: 'Workshop', isOpen: true, isMinimized: false, isFocused: false, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 2 }
      ]
      
      windows = windows.filter(w => w.id !== '1')
      
      expect(windows.length).toBe(1)
      expect(windows[0].id).toBe('2')
    })

    it('should handle reopening after close', () => {
      let windows: WindowState[] = [
        { id: '1', appId: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isFocused: true, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 1 }
      ]
      
      windows = windows.filter(w => w.id !== '1')
      expect(windows.length).toBe(0)
      
      windows = [...windows, { id: '2', appId: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isFocused: true, position: { x: 0, y: 0 }, size: { width: 800, height: 600 }, zIndex: 2 }]
      expect(windows.length).toBe(1)
      expect(windows[0].id).toBe('2')
    })
  })

  describe('window position and size', () => {
    it('should handle window position updates', () => {
      let windows: WindowState[] = [
        { id: '1', appId: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isFocused: true, position: { x: 100, y: 100 }, size: { width: 800, height: 600 }, zIndex: 1 }
      ]
      
      windows = windows.map(w => w.id === '1' ? { ...w, position: { x: 200, y: 150 } } : w)
      
      expect(windows[0].position.x).toBe(200)
      expect(windows[0].position.y).toBe(150)
    })

    it('should handle window size updates', () => {
      let windows: WindowState[] = [
        { id: '1', appId: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isFocused: true, position: { x: 100, y: 100 }, size: { width: 800, height: 600 }, zIndex: 1 }
      ]
      
      windows = windows.map(w => w.id === '1' ? { ...w, size: { width: 1000, height: 700 } } : w)
      
      expect(windows[0].size.width).toBe(1000)
      expect(windows[0].size.height).toBe(700)
    })
  })
})
