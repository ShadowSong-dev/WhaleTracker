import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { RootLayout } from './RootLayout'

function renderWithRouter() {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        Component: RootLayout,
        children: [{ index: true, Component: () => <div>Home content</div> }],
      },
    ],
    { initialEntries: ['/'] },
  )
  return render(<RouterProvider router={router} />)
}

describe('RootLayout', () => {
  it('renders the Aurora background', () => {
    renderWithRouter()
    expect(screen.getByTestId('aurora-background')).toBeInTheDocument()
  })

  it('renders the matched child route via Outlet', () => {
    renderWithRouter()
    expect(screen.getByText('Home content')).toBeInTheDocument()
  })

  it('Outlet content stays above the decorative background', () => {
    const { container } = renderWithRouter()
    const wrapper = container.querySelector('div.relative')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('min-h-svh')
  })
})
