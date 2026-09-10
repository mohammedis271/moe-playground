import type { SystemStatus } from '@/types'

export interface MockSystemStatus extends SystemStatus {
  mock: true
  lastUpdated: string
}

export const systemStatus: MockSystemStatus = {
  mock: true,
  uptime: '42 days, 13 hours',
  projects: 12,
  services: 8,
  experiments: 5,
  status: 'OPERATIONAL',
  lastUpdated: new Date().toISOString()
}

export const getMockSystemStatus = (): MockSystemStatus => ({
  ...systemStatus,
  lastUpdated: new Date().toISOString()
})
