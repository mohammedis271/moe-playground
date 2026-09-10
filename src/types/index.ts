export type ProjectStatus = 'ACTIVE' | 'EXPERIMENT' | 'COMPLETE' | 'BROKEN' | 'ARCHIVED'
export type ServiceStatus = 'ONLINE' | 'OFFLINE' | 'DEGRADED' | 'EXPERIMENTAL'
export type PrintCategory = 'USEFUL' | 'QUESTIONABLE' | 'EXPERIMENTAL' | 'WHY_DID_I_PRINT_THIS'

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  tech: string[]
  problem?: string
  solution?: string
  architecture?: string
  challenges?: string[]
  lessons?: string[]
  github?: string
  demo?: string
  featured?: boolean
}

export interface Skill {
  name: string
  category: 'language' | 'framework' | 'tool' | 'infrastructure' | 'specialty'
  level?: 'expert' | 'advanced' | 'intermediate'
}

export interface HomelabService {
  id: string
  name: string
  status: ServiceStatus
  description: string
  tech: string[]
  url?: string
  icon?: string
}

export interface HomelabMetrics {
  containers: number
  images: number
  volumes: number
  storage: string
  cpu: string
  memory: string
}

export interface AIAgent {
  id: string
  name: string
  persona: string
  description: string
  specialty: string[]
  status: 'ACTIVE' | 'EXPERIMENTAL' | 'BROKEN'
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
  type: 'career' | 'project' | 'milestone'
}

export interface Print3D {
  id: string
  name: string
  category: PrintCategory
  description: string
  materials: string
  printTime?: string
  status: 'SUCCESS' | 'FAILURE' | 'IN_PROGRESS'
  image?: string
}

export interface SystemStatus {
  uptime: string
  projects: number
  services: number
  experiments: number
  status: 'OPERATIONAL' | 'BUILDING' | 'DEGRADED'
}
