import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { GlassCard } from './GlassCard'

describe('GlassCard', () => {
  it('renders its children', () => {
    render(<GlassCard>Hello</GlassCard>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('uses the default glass tone when none is provided', () => {
    render(<GlassCard data-testid="card">x</GlassCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('glass-panel')
    expect(card).toHaveAttribute('data-tone', 'default')
  })

  it('switches to the strong glass tone when tone="strong"', () => {
    render(
      <GlassCard tone="strong" data-testid="card">
        x
      </GlassCard>,
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('glass-panel-strong')
    expect(card).toHaveAttribute('data-tone', 'strong')
  })

  it('does not apply the glow shadow by default', () => {
    render(<GlassCard data-testid="card">x</GlassCard>)
    expect(screen.getByTestId('card').className).not.toContain(
      'shadow-glow-primary',
    )
  })

  it('applies the glow shadow when glow={true}', () => {
    render(
      <GlassCard glow data-testid="card">
        x
      </GlassCard>,
    )
    expect(screen.getByTestId('card').className).toContain('shadow-')
  })

  it('forwards extra className while keeping base classes', () => {
    render(
      <GlassCard className="custom-card" data-testid="card">
        x
      </GlassCard>,
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-card')
    expect(card).toHaveClass('rounded-2xl')
  })
})
