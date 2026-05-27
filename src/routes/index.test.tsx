import { describe, it, expect } from 'vitest'
import { router } from './index'

describe('router', () => {
  it('mounts the root layout at the / path', () => {
    const root = router.routes[0]
    expect(root.path).toBe('/')
    expect(root.children).toBeDefined()
  })

  it('declares an index child route for the dashboard', () => {
    const root = router.routes[0]
    const index = root.children?.find((c) => c.index)
    expect(index).toBeDefined()
  })

  it('lazily resolves the dashboard component on the index route', async () => {
    const root = router.routes[0]
    const index = root.children?.find((c) => c.index)
    expect(index?.lazy).toBeDefined()
    const lazyFn = index?.lazy as (() => Promise<{ Component: unknown }>)
    const resolved = await lazyFn()
    expect(resolved.Component).toBeDefined()
  })
})
