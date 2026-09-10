export interface WindowState {
  id: string
  appId: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  isFocused: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

export interface AppDefinition {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  component: React.ComponentType
  defaultSize?: { width: number; height: number }
  defaultPosition?: { x: number; y: number }
}
