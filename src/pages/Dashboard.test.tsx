import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import i18n from '@/i18n'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh')
  })

  it('renders the overview heading as the primary h1', () => {
    render(<Dashboard />)
    const heading = screen.getByRole('heading', { level: 1, name: '总览' })
    expect(heading).toBeInTheDocument()
  })

  it('renders the four metric cards', () => {
    render(<Dashboard />)
    expect(screen.getByText('监控钱包')).toBeInTheDocument()
    expect(screen.getByText('今日告警')).toBeInTheDocument()
    expect(screen.getByText('24h 链上流量')).toBeInTheDocument()
    expect(screen.getByText('活跃代币')).toBeInTheDocument()
  })

  it('shows the empty-state copy in both side panels', () => {
    render(<Dashboard />)
    expect(screen.getAllByText('暂无数据')).toHaveLength(2)
  })

  it('switches the active sidebar item when another nav button is clicked', async () => {
    const user = userEvent.setup()
    render(<Dashboard />)

    expect(screen.getByRole('button', { name: /总览/ })).toHaveAttribute(
      'aria-current',
      'page',
    )

    await user.click(screen.getByRole('button', { name: /鲸鱼列表/ }))

    expect(screen.getByRole('button', { name: /鲸鱼列表/ })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('button', { name: /总览/ })).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('exposes the primary CTA "Add whale" in the topbar', () => {
    render(<Dashboard />)
    expect(
      screen.getByRole('button', { name: /添加鲸鱼/ }),
    ).toBeInTheDocument()
  })
})
