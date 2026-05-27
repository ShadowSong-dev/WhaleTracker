import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/layouts/RootLayout'
import { RouteErrorBoundary } from '@/components/ErrorBoundary/RouteErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      {
        index: true,
        lazy: async () => {
          const mod = await import('@/pages/Dashboard')
          return { Component: mod.default }
        },
      },
    ],
  },
])
