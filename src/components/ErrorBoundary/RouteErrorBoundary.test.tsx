import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router'
import i18n from '@/i18n'
import { RouteErrorBoundary } from './RouteErrorBoundary'

function renderWithError(loaderError: unknown) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        loader: () => {
          throw loaderError
        },
        Component: () => <div>Page</div>,
        ErrorBoundary: RouteErrorBoundary,
      },
    ],
    { initialEntries: ['/'] },
  )
  return render(<RouterProvider router={router} />)
}

describe('RouteErrorBoundary', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh')
  })

  it('shows a friendly title for a regular Error instance', async () => {
    renderWithError(new Error('Boom'))
    expect(await screen.findByText('Unexpected error')).toBeInTheDocument()
    expect(screen.getByText('Boom')).toBeInTheDocument()
  })

  it('renders an alert role for assistive tech', async () => {
    renderWithError(new Error('Boom'))
    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })

  it('shows a refresh button labeled by the common namespace', async () => {
    renderWithError(new Error('Boom'))
    expect(
      await screen.findByRole('button', { name: '刷新' }),
    ).toBeInTheDocument()
  })

  it('shows status + statusText when the error is a Response', async () => {
    renderWithError(new Response('Page is missing', { status: 404 }))
    expect(await screen.findByText(/404/)).toBeInTheDocument()
    expect(screen.getByText('Page is missing')).toBeInTheDocument()
  })
})
