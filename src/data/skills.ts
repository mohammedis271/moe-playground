import type { Skill } from '@/types'

export const skills: Skill[] = [
  { name: 'C#', category: 'language', level: 'expert' },
  { name: '.NET Core', category: 'framework', level: 'expert' },
  { name: 'React', category: 'framework', level: 'expert' },
  { name: 'TypeScript', category: 'language', level: 'advanced' },
  { name: 'SQL Server', category: 'tool', level: 'advanced' },
  { name: 'PostgreSQL', category: 'tool', level: 'advanced' },
  { name: 'Docker', category: 'infrastructure', level: 'advanced' },
  { name: 'Kubernetes', category: 'infrastructure', level: 'intermediate' },
  { name: 'GitHub Actions', category: 'tool', level: 'advanced' },
  { name: 'Octopus Deploy', category: 'tool', level: 'expert' },
  { name: 'Traefik', category: 'infrastructure', level: 'advanced' },
  { name: 'Redis', category: 'tool', level: 'advanced' },
  { name: 'RabbitMQ', category: 'tool', level: 'intermediate' },
  { name: 'Tailwind CSS', category: 'framework', level: 'advanced' },
  { name: 'Home Assistant', category: 'specialty', level: 'intermediate' },
  { name: 'Klipper', category: 'specialty', level: 'intermediate' },
  { name: 'ESP8266', category: 'specialty', level: 'intermediate' }
]

export const skillsByCategory = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = []
  }
  acc[skill.category].push(skill)
  return acc
}, {} as Record<string, Skill[]>)
