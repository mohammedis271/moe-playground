import { DesktopProvider } from '@/contexts/DesktopContext'
import { Desktop } from '@/components/desktop/Desktop'
import { desktopApps } from '@/data/apps'
import { Routes, Route } from 'react-router-dom'

export function DesktopMode() {
  return (
    <DesktopProvider apps={desktopApps}>
      <Routes>
        <Route path="/" element={<Desktop apps={desktopApps} />} />
        <Route path="/:appId" element={<Desktop apps={desktopApps} />} />
      </Routes>
    </DesktopProvider>
  )
}
