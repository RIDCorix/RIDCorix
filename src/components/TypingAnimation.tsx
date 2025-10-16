'use client'

import { useState, useEffect, useCallback } from 'react'

interface TypingAnimationProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export default function TypingAnimation({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = '',
  onComplete 
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [randomSeed, setRandomSeed] = useState(0.5) // Fixed seed during SSR

  // Ensure client-side only rendering to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    // Only generate random seed after mounting
    setRandomSeed(Math.random())
  }, [])

  // Function to get variable typing speed with quintic ease-in timing
  const getTypingSpeed = useCallback((char: string, index: number) => {
    // Return consistent speed during SSR
    if (!isMounted) return speed

    // Calculate quintic ease-in timing based on progress through the text
    const progress = Math.min(index / Math.max(text.length - 1, 1), 1) // Ensure 0 to 1 range
    // Quintic ease-in: extremely slow start with explosive acceleration
    const quintEase = progress * progress * progress * progress * progress
    const baseSpeedMultiplier = 0.05 + quintEase * 2.95 // Range from 0.05x to 3.0x speed

    // Character-specific timing adjustments
    let characterMultiplier = 1
    if (['.', ',', '!', '?', ';', ':'].includes(char)) {
      characterMultiplier = 2.5 // Longer pause after punctuation
    } else if (char === ' ') {
      characterMultiplier = 1.3 // Medium pause after spaces
    }

    // Use deterministic variation based on character index and stable seed
    const variation = (Math.sin(index * 0.7 + randomSeed * 10) * 0.1)
    const finalMultiplier = baseSpeedMultiplier * characterMultiplier * (1 + variation)

    return Math.max(speed * finalMultiplier, 10) // Ensure minimum speed
  }, [isMounted, speed, text.length, randomSeed])

  // Reset animation when text changes
  useEffect(() => {
    if (!isMounted) return
    
    // Reset all state when text changes
    setDisplayedText('')
    setCurrentIndex(0)
    setIsTyping(false)
    
    // Start typing after delay
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      setIsTyping(true)
    }
  }, [text, delay, isMounted]) // Add text as dependency

  useEffect(() => {
    if (!isTyping || !isMounted) return

    if (currentIndex < text.length) {
      const currentChar = text[currentIndex]
      const typingSpeed = getTypingSpeed(currentChar, currentIndex)
      
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + currentChar)
        setCurrentIndex(prev => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timer)
    } else if (currentIndex === text.length && onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, isTyping, onComplete, isMounted, getTypingSpeed])

  // Render placeholder during SSR with the same structure
  if (!isMounted) {
    return (
      <span className={className} suppressHydrationWarning>
        {/* Empty placeholder to match client structure */}
      </span>
    )
  }

  return (
    <span className={className}>
      {displayedText}
      {isTyping && currentIndex < text.length && (
        <span className="animate-blink text-blue-500 dark:text-blue-400 ml-1">|</span>
      )}
    </span>
  )
}
