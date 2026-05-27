import { Outlet } from 'react-router'
import { AuroraBackground } from '@/components/AuroraBackground/AuroraBackground'

/** Root layout providing the Aurora background and a base full-height shell. */
export function RootLayout() {
  return (
    <>
      <AuroraBackground />
      <div className="relative flex min-h-svh flex-col text-foreground">
        <Outlet />
      </div>
    </>
  )
}
