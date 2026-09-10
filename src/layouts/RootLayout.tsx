import { Link, Outlet, useLocation } from 'react-router-dom'
import { Home as HomeIcon, Briefcase, Terminal as TerminalIcon, Mail, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Workshop', href: '/workshop', icon: Briefcase },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Terminal', href: '/terminal', icon: TerminalIcon },
  { name: 'Contact', href: '/contact', icon: Mail }
]

export function RootLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center font-bold text-black">
                M
              </div>
              <span className="text-xl font-bold">MOE</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            <div className="flex md:hidden">
              <button className="text-gray-400 hover:text-white">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Moe. Built with React, TypeScript, and Vite.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/mohammedis271"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mohammedis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
