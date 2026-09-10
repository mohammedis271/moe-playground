import { GitBranch, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import type { ProjectStatus } from '@/types'
import { motion } from 'framer-motion'

const statusConfig: Record<ProjectStatus, { color: string; bg: string }> = {
  ACTIVE: { color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/50' },
  COMPLETE: { color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/50' },
  EXPERIMENT: { color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/50' },
  BROKEN: { color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/50' },
  ARCHIVED: { color: 'text-gray-400', bg: 'bg-gray-400/10 border-gray-400/50' }
}

function ReleaseHubArchitecture() {
  const nodes = [
    { id: 'jira', label: 'Jira', x: 50, y: 50 },
    { id: 'github', label: 'GitHub', x: 200, y: 50 },
    { id: 'ci', label: 'CI/CD', x: 350, y: 50 },
    { id: 'octopus', label: 'Octopus', x: 500, y: 50 },
    { id: 'dev', label: 'Dev', x: 650, y: 20 },
    { id: 'sit', label: 'SIT', x: 750, y: 50 },
    { id: 'uat', label: 'UAT', x: 850, y: 80 },
    { id: 'prod', label: 'Production', x: 950, y: 50 }
  ]

  return (
    <div className="relative w-full overflow-x-auto py-8">
      <svg
        viewBox="0 0 1050 150"
        className="w-full min-w-[800px]"
        style={{ minHeight: '150px' }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="rgb(34, 211, 238)"
            />
          </marker>
        </defs>

        {/* Connections */}
        <line x1="110" y1="60" x2="190" y2="60" stroke="rgb(34, 211, 238)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="260" y1="60" x2="340" y2="60" stroke="rgb(34, 211, 238)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="410" y1="60" x2="490" y2="60" stroke="rgb(34, 211, 238)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="560" y1="60" x2="640" y2="30" stroke="rgb(34, 211, 238)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="710" y1="30" x2="740" y2="55" stroke="rgb(34, 211, 238)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="810" y1="60" x2="840" y2="85" stroke="rgb(34, 211, 238)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="910" y1="85" x2="940" y2="65" stroke="rgb(34, 211, 238)" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width="60"
              height="30"
              rx="4"
              fill="rgba(34, 211, 238, 0.1)"
              stroke="rgb(34, 211, 238)"
              strokeWidth="1.5"
            />
            <text
              x={node.x + 30}
              y={node.y + 20}
              textAnchor="middle"
              fill="rgb(34, 211, 238)"
              fontSize="12"
              fontFamily="JetBrains Mono, monospace"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="text-center text-xs text-gray-500 font-mono mt-4">
        Automated Release Pipeline: Jira → GitHub → CI/CD → Octopus → Dev → SIT → UAT → Production
      </p>
    </div>
  )
}

export function Projects() {
  return (
    <div className="min-h-screen grid-bg">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of things I've built, experiments I'm running, and systems I maintain.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-3xl">{project.title}</CardTitle>
                        <Badge className={statusConfig[project.status].bg}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <Button asChild variant="outline" size="icon">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </Button>
                      )}
                      {project.demo && (
                        <Button asChild variant="outline" size="icon">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 font-mono">TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-mono">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {project.problem && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 font-mono">PROBLEM</h4>
                      <p className="text-gray-300">{project.problem}</p>
                    </div>
                  )}

                  {project.solution && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 font-mono">SOLUTION</h4>
                      <p className="text-gray-300">{project.solution}</p>
                    </div>
                  )}

                  {project.id === 'release-hub' && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 font-mono flex items-center gap-2">
                        <GitBranch className="w-4 h-4" />
                        ARCHITECTURE OVERVIEW
                      </h4>
                      <Card className="bg-black/20 border-cyan-400/20">
                        <CardContent className="p-4">
                          <ReleaseHubArchitecture />
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {project.challenges && project.challenges.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 font-mono">CHALLENGES</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {project.challenges.map((challenge, i) => (
                          <li key={i}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.lessons && project.lessons.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 font-mono">LESSONS LEARNED</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {project.lessons.map((lesson, i) => (
                          <li key={i}>{lesson}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
