import { projects } from '@/data/projects'
import { skillsByCategory } from '@/data/skills'
import { getMockSystemStatus } from '@/data/system'
import { aboutMe } from '@/data/about'
import type { Command, CommandOutput } from '@/lib/terminal-parser'

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Show available commands',
    execute: (): CommandOutput => ({
      type: 'help',
      content: [
        'Available Commands:',
        '  help      - Show this help message',
        '  whoami    - Display info about Moe',
        '  projects  - List featured projects',
        '  skills    - Show technical skills',
        '  status    - Display system status',
        '  contact   - Get contact information',
        '  about     - Learn more about this workshop',
        '  clear     - Clear terminal output',
        '',
        'Pro tip: Try typing random commands for entertainment.'
      ]
    })
  },
  
  whoami: {
    name: 'whoami',
    description: 'Display info about Moe',
    execute: (): CommandOutput => ({
      type: 'data',
      content: [
        `Name: ${aboutMe.name}`,
        `Title: ${aboutMe.title}`,
        `Tagline: ${aboutMe.tagline}`,
        `Location: ${aboutMe.location}`,
        '',
        aboutMe.bio,
        '',
        'Interests:',
        ...aboutMe.interests.map(i => `  • ${i}`)
      ]
    })
  },
  
  projects: {
    name: 'projects',
    description: 'List featured projects',
    execute: (): CommandOutput => {
      const featured = projects.filter(p => p.featured)
      return {
        type: 'data',
        content: [
          'Featured Projects:',
          '',
          ...featured.flatMap(p => [
            `[${p.status}] ${p.title}`,
            `  ${p.description}`,
            `  Tech: ${p.tech.join(', ')}`,
            p.github ? `  GitHub: ${p.github}` : '',
            p.demo ? `  Demo: ${p.demo}` : '',
            ''
          ].filter(Boolean))
        ]
      }
    }
  },
  
  skills: {
    name: 'skills',
    description: 'Show technical skills',
    execute: (): CommandOutput => {
      const categories = Object.entries(skillsByCategory)
      return {
        type: 'data',
        content: [
          'Technical Skills:',
          '',
          ...categories.flatMap(([category, categorySkills]) => [
            `${category.toUpperCase()}:`,
            ...categorySkills.map(s => `  • ${s.name}${s.level ? ` (${s.level})` : ''}`),
            ''
          ])
        ]
      }
    }
  },
  
  status: {
    name: 'status',
    description: 'Display system status',
    execute: (): CommandOutput => {
      const status = getMockSystemStatus()
      return {
        type: 'data',
        content: [
          '⚠️  MOCK DATA — For demonstration only',
          '',
          'MOE SYSTEM STATUS:',
          `  Status: ${status.status}`,
          `  Uptime: ${status.uptime}`,
          `  Active Projects: ${status.projects}`,
          `  Running Services: ${status.services}`,
          `  Experiments: ${status.experiments}`,
          '',
          `Last Updated: ${new Date(status.lastUpdated).toLocaleString()}`
        ]
      }
    }
  },
  
  contact: {
    name: 'contact',
    description: 'Get contact information',
    execute: (): CommandOutput => ({
      type: 'data',
      content: [
        'Contact Information:',
        '',
        `Email: ${aboutMe.email}`,
        `GitHub: ${aboutMe.github}`,
        `LinkedIn: ${aboutMe.linkedin}`,
        '',
        'Feel free to reach out about projects, collaboration, or homelab disasters.'
      ]
    })
  },
  
  about: {
    name: 'about',
    description: 'Learn more about this workshop',
    execute: (): CommandOutput => ({
      type: 'text',
      content: [
        'Welcome to MOE\'S DIGITAL WORKSHOP',
        '',
        'This is my personal playground where I showcase projects,',
        'experiments, and the occasional engineering disaster.',
        '',
        'Built with React 19, TypeScript, Vite, and Tailwind CSS.',
        'Source available on GitHub.',
        '',
        'Type "help" to see what you can do here.'
      ]
    })
  },
  
  clear: {
    name: 'clear',
    description: 'Clear terminal output',
    execute: (): CommandOutput => ({
      type: 'text',
      content: ''
    })
  }
}
