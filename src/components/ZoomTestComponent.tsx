'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ZoomIn, ZoomOut, Monitor } from 'lucide-react'

export default function ZoomTestComponent() {
  const [zoomLevel, setZoomLevel] = useState(100)

  useEffect(() => {
    const updateZoomLevel = () => {
      // Calculate zoom level based on window.outerWidth vs window.innerWidth
      const zoom = Math.round((window.outerWidth / window.innerWidth) * 100)
      setZoomLevel(zoom)
    }

    updateZoomLevel()
    window.addEventListener('resize', updateZoomLevel)
    
    return () => window.removeEventListener('resize', updateZoomLevel)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-3 text-sm">
        <Monitor className="w-4 h-4" />
        <span className="font-medium">Zoom Level:</span>
        <span className="text-blue-600 dark:text-blue-400 font-mono">{zoomLevel}%</span>
      </div>
      
      <div className="flex gap-2 mt-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            // Trigger browser zoom out
            document.body.style.zoom = '0.8'
          }}
          className="flex items-center gap-1"
        >
          <ZoomOut className="w-3 h-3" />
          Test Zoom Out
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            // Reset zoom
            document.body.style.zoom = '1'
          }}
          className="flex items-center gap-1"
        >
          <ZoomIn className="w-3 h-3" />
          Reset
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Try zooming with Cmd/Ctrl + or - to test interactions
      </p>
    </div>
  )
}
