import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders the label and the formatted value', () => {
    render(<StatCard label="Tracked wallets" value="128" />)
    expect(screen.getByText('Tracked wallets')).toBeInTheDocument()
    expect(screen.getByTestId('stat-value')).toHaveTextContent('128')
  })

  it('does not render the trend chip when trend is omitted', () => {
    render(<StatCard label="Active tokens" value="42" />)
    expect(screen.queryByText(/%/)).not.toBeInTheDocument()
  })

  it('renders a positive trend with a plus sign and one decimal', () => {
    render(
      <StatCard
        label="Volume"
        value="$1.2M"
        trend={4.27}
        trendLabel="vs yesterday"
      />,
    )
    expect(screen.getByText('+4.3%')).toBeInTheDocument()
    expect(screen.getByText('vs yesterday')).toBeInTheDocument()
  })

  it('renders a negative trend without a leading plus sign', () => {
    render(<StatCard label="Alerts" value="9" trend={-2.5} />)
    expect(screen.getByText('-2.5%')).toBeInTheDocument()
  })

  it('renders the optional icon hidden from assistive tech', () => {
    render(
      <StatCard
        label="Volume"
        value="$1.2M"
        icon={<svg data-testid="metric-icon" />}
      />,
    )
    expect(screen.getByTestId('metric-icon')).toBeInTheDocument()
  })

  it('renders inside a strong glass tone when emphasis={true}', () => {
    render(<StatCard label="Volume" value="$1.2M" emphasis />)
    const surface = screen
      .getByText('Volume')
      .closest('[data-slot="glass-card"]')
    expect(surface).toHaveAttribute('data-tone', 'strong')
  })
})
