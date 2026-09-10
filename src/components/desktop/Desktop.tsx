import { ReactNode } from 'react'
import { MenuBar } from './MenuBar'
import { Dock } from './Dock'
import { Window } from './Window'
import { useDesktop } from '@/contexts/DesktopContext'
import type { AppDefinition } from '@/types/desktop'

interface DesktopProps {
  apps: AppDefinition[]
  wallpaper?: string
  children?: ReactNode
}

export function Desktop({ apps, wallpaper, children }: DesktopProps) {
  const { windows } = useDesktop()

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black"
        style={
          wallpaper
            ? {
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/40 via-zinc-950/60 to-black/80" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <MenuBar />

      <div className="absolute inset-0 pt-8 pb-20">
        {children}
        {windows.map((window) => {
          const app = apps.find((a) => a.id === window.appId)
          if (!app) return null
          return <Window key={window.id} window={window} app={app} />
        })}
      </div>

      <Dock apps={apps} />
    </div>
  )
}
