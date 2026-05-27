import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import i18n from '@/i18n'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh')
  })

  it('renders every nav item with its localized label', () => {
    render(<Sidebar />)
    expect(screen.getByRole('button', { name: /总览/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /鲸鱼列表/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /交易流/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /告警/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /设置/ })).toBeInTheDocument()
  })

  it('marks the active item with aria-current="page"', () => {
    render(<Sidebar activeKey="whales" />)
    expect(screen.getByRole('button', { name: /鲸鱼列表/ })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('button', { name: /总览/ })).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('falls back to the overview as the active item by default', () => {
    render(<Sidebar />)
    expect(screen.getByRole('button', { name: /总览/ })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('invokes onSelect with the chosen item key when clicked', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()
    render(<Sidebar onSelect={handleSelect} />)

    await user.click(screen.getByRole('button', { name: /告警/ }))

    expect(handleSelect).toHaveBeenCalledWith('alerts')
  })

  it('renders the app brand name and tagline once', () => {
    render(<Sidebar />)
    expect(screen.getByText('WhaleTracker')).toBeInTheDocument()
    expect(screen.getByText('鲸鱼钱包实时监控')).toBeInTheDocument()
  })
})
