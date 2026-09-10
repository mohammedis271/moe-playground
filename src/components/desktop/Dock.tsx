import { useDesktop } from '@/contexts/DesktopContext'
import type { AppDefinition } from '@/types/desktop'
import { cn } from '@/lib/utils'

interface DockProps {
  apps: AppDefinition[]
}

export function Dock({ apps }: DockProps) {
  const { openWindow, windows } = useDesktop()

  const isAppOpen = (appId: string) => {
    return windows.some((w) => w.appId === appId && !w.isMinimized)
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-2 shadow-2xl">
        <div className="flex items-center gap-2">
          {apps.map((app) => {
            const Icon = app.icon
            const isOpen = isAppOpen(app.id)
            
            return (
              <button
                key={app.id}
                onClick={() => openWindow(app.id, app)}
                className={cn(
                  'group relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-200',
                  'hover:scale-110 hover:-translate-y-1',
                  'bg-gradient-to-br from-zinc-800/80 to-zinc-900/80',
                  'border border-white/10 hover:border-white/30',
                  'flex items-center justify-center'
                )}
                aria-label={app.name}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {app.name}
                  </div>
                </div>
                {isOpen && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
