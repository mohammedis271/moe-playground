import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootLayout } from '@/layouts/RootLayout'
import { Home } from '@/pages/Home'
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
        element: <Navigate to="/desktop/workshop" replace />
      },
      {
        path: 'projects',
        element: <Navigate to="/desktop/projects" replace />
      },
      {
        path: 'terminal',
        element: <Navigate to="/desktop/terminal" replace />
      },
      {
        path: 'contact',
        element: <Navigate to="/desktop/contact" replace />
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
