import { Link } from 'react-router-dom'
import { Code2, Server, Cpu, Wrench } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

const categories = [
  {
    id: 'software',
    title: 'Software Engineering',
    description: 'Full-stack applications, APIs, and system architecture',
    icon: Code2,
    color: 'text-cyan-400',
    link: '/projects'
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Homelab, Docker, CI/CD, and deployment pipelines',
    icon: Server,
    color: 'text-blue-400',
    link: '/projects'
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    description: 'Specialized AI agents and workflow automation',
    icon: Cpu,
    color: 'text-purple-400',
    link: '/projects'
  },
  {
    id: 'hardware',
    title: 'Hardware & IoT',
    description: '3D printing, garage automation, and embedded systems',
    icon: Wrench,
    color: 'text-green-400',
    link: '/projects'
  }
]

export function Workshop() {
  return (
    <div className="min-h-screen grid-bg">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to the Workshop
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            This is where I build, break, and occasionally fix things. 
            Explore projects across software, infrastructure, AI, and hardware.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={category.link}>
                  <Card className="glass hover:bg-white/10 transition-all cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-8 h-8 ${category.color}`} />
                        <CardTitle className="text-2xl">{category.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-cyan-400 font-mono">
                        VIEW PROJECTS →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
