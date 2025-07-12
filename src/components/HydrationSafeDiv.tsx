'use client'

import { forwardRef } from 'react'

interface HydrationSafeDivProps extends React.HTMLAttributes<HTMLDivElement> {
  suppressHydrationWarning?: boolean
}

const HydrationSafeDiv = forwardRef<HTMLDivElement, HydrationSafeDivProps>(
  ({ suppressHydrationWarning = true, ...props }, ref) => {
    return <div ref={ref} suppressHydrationWarning={suppressHydrationWarning} {...props} />
  }
)

HydrationSafeDiv.displayName = 'HydrationSafeDiv'

export default HydrationSafeDiv
