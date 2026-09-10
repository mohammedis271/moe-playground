import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootLayout } from '@/layouts/RootLayout'
import { Home } from '@/pages/Home'
import { Workshop } from '@/pages/Workshop'
import { Projects } from '@/pages/Projects'
import { Terminal } from '@/pages/Terminal'
import { Contact } from '@/pages/Contact'
import { DesktopMode } from '@/pages/DesktopMode'
import './index.css'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'workshop',
        element: <Workshop />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'terminal',
        element: <Terminal />
      },
      {
        path: 'contact',
        element: <Contact />
      }
    ]
  },
  {
    path: '/desktop/*',
    element: <DesktopMode />
  }
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
