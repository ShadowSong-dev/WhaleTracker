import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import i18n from '@/i18n'
import { LanguageToggle } from './LanguageToggle'

describe('LanguageToggle', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh')
  })

  it('shows the EN switch hint when the current language is Chinese', () => {
    render(<LanguageToggle />)
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('uses the localized aria-label for accessibility', () => {
    render(<LanguageToggle />)
    expect(screen.getByRole('button', { name: '语言' })).toBeInTheDocument()
  })

  it('switches to English when clicked once', async () => {
    const user = userEvent.setup()
    render(<LanguageToggle />)

    await user.click(screen.getByRole('button', { name: '语言' }))

    expect(i18n.resolvedLanguage).toBe('en')
    expect(screen.getByText('中文')).toBeInTheDocument()
  })

  it('toggles back to Chinese after two clicks', async () => {
    const user = userEvent.setup()
    render(<LanguageToggle />)
    const button = screen.getByRole('button')

    await user.click(button)
    await user.click(button)

    expect(i18n.resolvedLanguage).toBe('zh')
  })

  it('renders an accessible decorative icon', () => {
    render(<LanguageToggle />)
    const button = screen.getByRole('button')
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })
})
