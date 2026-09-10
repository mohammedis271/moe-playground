import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Terminal as TerminalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getMockSystemStatus } from '@/data/system'
import { motion } from 'framer-motion'

export function Home() {
  const status = getMockSystemStatus()

  const statusColors = {
    OPERATIONAL: 'text-green-400',
    BUILDING: 'text-yellow-400',
    DEGRADED: 'text-red-400'
  }

  return (
    <div className="min-h-screen grid-bg">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              MOE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-2">
            Senior Software Engineer
          </p>
          <p className="text-lg text-gray-500 font-mono">
            Builder • Tinkerer • Problem Solver
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button asChild size="lg" className="gap-2">
            <Link to="/workshop">
              <Zap className="w-5 h-5" />
              ENTER THE WORKSHOP
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/projects">
              VIEW PROJECTS
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-mono flex items-center gap-2">
                  <TerminalIcon className="w-6 h-6 text-cyan-400" />
                  MOE SYSTEM
                </CardTitle>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">
                  MOCK DATA
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-mono">STATUS</p>
                  <p className={`text-lg font-mono font-semibold ${statusColors[status.status]}`}>
                    {status.status}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-mono">UPTIME</p>
                  <p className="text-lg font-mono">{status.uptime}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-mono">PROJECTS</p>
                  <p className="text-2xl font-mono font-bold text-cyan-400">{status.projects}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-mono">SERVICES</p>
                  <p className="text-2xl font-mono font-bold text-blue-400">{status.services}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-mono">EXPERIMENTS</p>
                  <p className="text-2xl font-mono font-bold text-purple-400">{status.experiments}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-600 font-mono">
                  Last Updated: {new Date(status.lastUpdated).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm">
            Built with React 19, TypeScript, Vite, and Tailwind CSS
          </p>
        </motion.div>
      </div>
    </div>
  )
}
