import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'release-hub',
    title: 'Release Hub',
    description: 'Orchestrated release pipeline connecting Jira, GitHub, CI/CD, Octopus Deploy, and multi-environment deployment',
    status: 'ACTIVE',
    tech: ['C#', '.NET', 'React', 'Octopus Deploy', 'GitHub Actions', 'Docker'],
    problem: 'Manual release coordination across teams, environments, and approval gates led to deployment delays and release tracking chaos',
    solution: 'Automated pipeline with state machine orchestrating Jira → GitHub PR → CI → Octopus → Dev → SIT → UAT → Production flow',
    architecture: 'Event-driven architecture with webhook receivers, state persistence, approval workflows, and real-time status dashboard',
    challenges: [
      'Handling partial failures and rollback scenarios',
      'Environment-specific configuration injection',
      'Approval gate timeout strategies'
    ],
    lessons: [
      'State machines simplify complex orchestration',
      'Observable deployment pipelines reduce firefighting',
      'Idempotent operations are non-negotiable'
    ],
    github: 'https://github.com/mohammedis271/release-hub',
    featured: true
  },
  {
    id: 'vcard-qr',
    title: 'VCard QR Generator',
    description: 'Generate scannable business card QR codes with vCard format for instant contact imports',
    status: 'COMPLETE',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'QR Code Generation'],
    problem: 'Exchanging contact information at conferences is tedious and error-prone',
    solution: 'Web app generating vCard-formatted QR codes that can be scanned and imported to any phone',
    github: 'https://github.com/mohammedis271/vcard-qr',
    demo: 'https://vcard.cyberninja.co.za',
    featured: true
  },
  {
    id: 'homelab',
    title: 'Personal Homelab',
    description: 'Self-hosted infrastructure running on Docker with Traefik reverse proxy, monitoring, and automation services',
    status: 'EXPERIMENT',
    tech: ['Docker', 'Traefik', 'Portainer', 'Grafana', 'Prometheus', 'Home Assistant'],
    problem: 'Learning cloud-native infrastructure without burning cash on cloud providers',
    solution: 'Local Kubernetes-style environment with service discovery, load balancing, metrics, and GitOps-style config',
    challenges: [
      'SSL certificate automation for local domains',
      'Service dependency orchestration',
      'Backup and disaster recovery strategies'
    ],
    featured: false
  }
]
