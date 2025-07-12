import React from 'react'

/**
 * Utility functions to handle zoom-safe interactions and prevent dragging/interaction limits at different zoom levels
 */

// Check if user is zoomed out beyond a certain threshold
export function isZoomedOut(): boolean {
  if (typeof window === 'undefined') return false
  
  const screenWidth = window.screen.width
  const windowWidth = window.innerWidth
  
  // If the window is much wider than expected, might be zoomed out
  const zoomRatio = screenWidth / windowWidth
  return zoomRatio < 0.8 // User is likely zoomed out significantly
}

// Get safe interaction bounds for the current zoom level
export function getSafeInteractionBounds() {
  if (typeof window === 'undefined') {
    return { width: 1200, height: 800 }
  }
  
  return {
    width: Math.max(320, window.innerWidth),
    height: Math.max(568, window.innerHeight)
  }
}

// Apply zoom-safe styles to an element
export function applyZoomSafeStyles(element: HTMLElement | null) {
  if (!element) return
  
  // Ensure minimum interaction area
  const minSize = isZoomedOut() ? '48px' : '44px'
  
  if (element.tagName === 'BUTTON' || element.tagName === 'A') {
    element.style.minHeight = minSize
    element.style.minWidth = minSize
  }
  
  // Improve transform performance
  element.style.willChange = 'transform'
  element.style.backfaceVisibility = 'hidden'
  
  // Ensure hardware acceleration
  if (element.style.transform && !element.style.transform.includes('translate3d')) {
    element.style.transform += ' translate3d(0, 0, 0)'
  }
}

// Hook to handle zoom changes
export function useZoomAwareInteractions() {
  const [zoomedOut, setZoomedOut] = React.useState(false)
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkZoom = () => {
      setZoomedOut(isZoomedOut())
    }
    
    // Check on resize and zoom
    window.addEventListener('resize', checkZoom)
    window.addEventListener('orientationchange', checkZoom)
    
    // Initial check
    checkZoom()
    
    return () => {
      window.removeEventListener('resize', checkZoom)
      window.removeEventListener('orientationchange', checkZoom)
    }
  }, [])
  
  // Return appropriate value for both SSR and client
  if (typeof window === 'undefined') {
    return { isZoomedOut: false }
  }
  
  return { isZoomedOut: zoomedOut }
}
