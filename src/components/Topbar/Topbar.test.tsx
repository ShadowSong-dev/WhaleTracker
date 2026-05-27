import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import i18n from '@/i18n'
import { Topbar } from './Topbar'

describe('Topbar', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh')
  })

  it('shows the live status label', () => {
    render(<Topbar />)
    expect(screen.getByText('实时')).toBeInTheDocument()
  })

  it('renders the search input with the localized placeholder', () => {
    render(<Topbar />)
    expect(
      screen.getByPlaceholderText('搜索地址或代币…'),
    ).toBeInTheDocument()
  })

  it('renders both the import and the add-whale actions', () => {
    render(<Topbar />)
    expect(
      screen.getByRole('button', { name: /导入 CSV/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /添加鲸鱼/ }),
    ).toBeInTheDocument()
  })

  it('fires onImportCsv when the import button is clicked', async () => {
    const user = userEvent.setup()
    const onImportCsv = vi.fn()
    render(<Topbar onImportCsv={onImportCsv} />)

    await user.click(screen.getByRole('button', { name: /导入 CSV/ }))

    expect(onImportCsv).toHaveBeenCalledTimes(1)
  })

  it('fires onAddWhale when the primary CTA is clicked', async () => {
    const user = userEvent.setup()
    const onAddWhale = vi.fn()
    render(<Topbar onAddWhale={onAddWhale} />)

    await user.click(screen.getByRole('button', { name: /添加鲸鱼/ }))

    expect(onAddWhale).toHaveBeenCalledTimes(1)
  })

  it('exposes the language toggle alongside the primary actions', () => {
    render(<Topbar />)
    expect(screen.getByRole('button', { name: '语言' })).toBeInTheDocument()
  })
})
