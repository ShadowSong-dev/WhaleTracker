import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AuroraBackground } from './AuroraBackground'

describe('AuroraBackground', () => {
  it('renders a decorative aria-hidden container', () => {
    render(<AuroraBackground />)
    const bg = screen.getByTestId('aurora-background')
    expect(bg).toBeInTheDocument()
    expect(bg).toHaveAttribute('aria-hidden', 'true')
  })

  it('is positioned fixed behind the rest of the UI', () => {
    render(<AuroraBackground />)
    const bg = screen.getByTestId('aurora-background')
    expect(bg).toHaveClass('fixed')
    expect(bg).toHaveClass('-z-10')
  })

  it('uses the normal intensity opacity by default', () => {
    render(<AuroraBackground />)
    const bg = screen.getByTestId('aurora-background')
    expect(bg.innerHTML).toContain('opacity-35')
  })

  it('uses vivid opacity when intensity="vivid"', () => {
    render(<AuroraBackground intensity="vivid" />)
    const bg = screen.getByTestId('aurora-background')
    expect(bg.innerHTML).toContain('opacity-55')
  })

  it('uses subtle opacity when intensity="subtle"', () => {
    render(<AuroraBackground intensity="subtle" />)
    const bg = screen.getByTestId('aurora-background')
    expect(bg.innerHTML).toContain('opacity-20')
  })

  it('passes className through onto the root element', () => {
    render(<AuroraBackground className="custom-bg" />)
    expect(screen.getByTestId('aurora-background')).toHaveClass('custom-bg')
  })
})
