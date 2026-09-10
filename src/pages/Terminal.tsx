import { Terminal as TerminalComponent } from '@/components/terminal/Terminal'
import { motion } from 'framer-motion'

export function Terminal() {
  return (
    <div className="min-h-screen grid-bg">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Interactive Terminal</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A retro-style terminal interface. Type <code className="text-cyan-400 font-mono">help</code> to get started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-[600px]"
        >
          <TerminalComponent />
        </motion.div>
      </div>
    </div>
  )
}
