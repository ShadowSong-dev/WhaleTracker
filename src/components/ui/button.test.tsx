import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders its label as accessible name', () => {
    render(<Button>Add whale</Button>)
    expect(
      screen.getByRole('button', { name: 'Add whale' }),
    ).toBeInTheDocument()
  })

  it('defaults to type=button so it does not submit forms accidentally', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('invokes onClick once on click', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await user.click(screen.getByRole('button', { name: 'Click' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is non-interactive when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies the destructive variant styles', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass(
      'from-destructive/90',
    )
  })

  it('applies the icon size when size="icon"', () => {
    render(
      <Button size="icon" aria-label="Refresh">
        <svg data-testid="icon" />
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Refresh' })
    expect(button).toHaveClass('size-10')
  })

  it('renders as anchor when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/whales">Whales</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Whales' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('data-slot', 'button')
  })

  it('forwards additional class names while keeping variant classes', () => {
    render(<Button className="custom-class">Tagged</Button>)
    const button = screen.getByRole('button', { name: 'Tagged' })
    expect(button).toHaveClass('custom-class')
    expect(button.className).toContain('rounded-xl')
  })
})
