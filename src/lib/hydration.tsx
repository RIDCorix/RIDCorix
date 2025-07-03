'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to handle hydration safely and prevent hydration mismatches
 * Returns true only after the component has hydrated on the client
 */
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
}

/**
 * Component that only renders its children after hydration is complete
 * Useful for components that might have hydration mismatches due to browser extensions
 */
interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isHydrated = useIsHydrated()

  if (!isHydrated) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
