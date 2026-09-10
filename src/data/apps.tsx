import { Terminal as TerminalIcon, Briefcase, FolderOpen, Mail, User } from 'lucide-react'
import { lazy } from 'react'
import type { AppDefinition } from '@/types/desktop'

const TerminalApp = lazy(() => import('@/components/desktop/apps/TerminalApp').then(m => ({ default: m.TerminalApp })))
const WorkshopApp = lazy(() => import('@/pages/Workshop').then(m => ({ default: m.Workshop })))
const ProjectsApp = lazy(() => import('@/pages/Projects').then(m => ({ default: m.Projects })))
const ContactApp = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })))
const AboutApp = lazy(() => import('@/components/desktop/apps/AboutApp').then(m => ({ default: m.AboutApp })))

export const desktopApps: AppDefinition[] = [
  {
    id: 'terminal',
    name: 'Terminal',
    icon: TerminalIcon,
    component: TerminalApp,
    defaultSize: { width: 900, height: 600 },
    defaultPosition: { x: 150, y: 100 }
  },
  {
    id: 'workshop',
    name: 'Workshop',
    icon: Briefcase,
    component: WorkshopApp,
    defaultSize: { width: 1000, height: 700 },
    defaultPosition: { x: 100, y: 80 }
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: FolderOpen,
    component: ProjectsApp,
    defaultSize: { width: 1100, height: 750 },
    defaultPosition: { x: 80, y: 60 }
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: Mail,
    component: ContactApp,
    defaultSize: { width: 600, height: 700 },
    defaultPosition: { x: 200, y: 120 }
  },
  {
    id: 'about',
    name: 'About',
    icon: User,
    component: AboutApp,
    defaultSize: { width: 700, height: 600 },
    defaultPosition: { x: 180, y: 100 }
  }
]
