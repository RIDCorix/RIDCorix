'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Zap, Code, Palette, Settings } from 'lucide-react'

export default function TransformationAnimation() {
  const [isTransforming, setIsTransforming] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      // Reset states
      setCurrentStep(0)
      setProgress(0)
      
      // Wait a bit then start transformation
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsTransforming(true)
      
      // Animate progress bar and steps - slower, more premium timing
      const stepDuration = 1200 // 1.2 seconds per step
      const totalDuration = 4000 // 4 seconds total
      
      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + (100 / (totalDuration / 30)) // Update every 30ms for smoother animation
        })
      }, 30)
      
      // Step animations
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          setCurrentStep(i)
        }, i * stepDuration + 300)
      }
      
      // Start circuit animation - slower, more elegant
      await controls.start({
        pathLength: 1,
        transition: { duration: 2.2, ease: "easeInOut" }
      })
      
      // Reset after animation completes
      setTimeout(() => {
        setIsTransforming(false)
        setCurrentStep(0)
        setProgress(0)
        controls.set({ pathLength: 0 })
      }, totalDuration + 500)
    }

    sequence()
    
    // Repeat animation every 8 seconds for more premium feel
    const interval = setInterval(sequence, 8000)
    return () => clearInterval(interval)
  }, [controls])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden relative">
      <div 
        className="container mx-auto px-6"
        style={{
          // Ensure proper interaction at all zoom levels
          minWidth: 0,
          maxWidth: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Digital Transformation
          </h2>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-blue-300 font-medium">Transformation Progress</span>
              <span className="text-sm text-blue-300 font-mono">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-blue-500/20">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-slate-600 rounded-full relative overflow-hidden"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Subtle shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Circuit SVG Background */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main circuit path flowing left to right */}
            <motion.path
              d="M0 200 L100 200 L100 150 L200 150 L200 180 L300 180 L300 120 L400 120 L400 200 L500 200 L500 160 L600 160 L600 220 L700 220 L700 180 L800 180 L800 200 L1000 200"
              stroke="url(#circuitGradient)"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={controls}
              className="drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]"
            />
            
            {/* Secondary circuit branches */}
            <motion.path
              d="M150 150 L150 100 L250 100 L250 140 M400 120 L400 80 L500 80 L500 110 M600 160 L600 120 L700 120 M700 220 L700 260 L800 260 L800 240"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={controls}
              transition={{ delay: 0.3 }}
              className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            />

            {/* Tertiary micro-circuits */}
            <motion.path
              d="M200 180 L200 200 L220 200 M300 120 L320 120 L320 140 M500 200 L520 200 L520 180 M600 220 L580 220 L580 240"
              stroke="url(#circuitGradient)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={controls}
              transition={{ delay: 0.6 }}
              className="drop-shadow-[0_0_4px_rgba(59,130,246,0.3)]"
            />

            {/* Circuit nodes with staggered animation */}
            {[
              { x: 100, y: 150 },
              { x: 200, y: 150 },
              { x: 300, y: 120 },
              { x: 400, y: 120 },
              { x: 500, y: 160 },
              { x: 600, y: 160 },
              { x: 700, y: 220 },
              { x: 800, y: 180 }
            ].map((node, index) => (
              <motion.circle
                key={index}
                cx={node.x}
                cy={node.y}
                r="8"
                fill="url(#nodeGradient)"
                initial={{ scale: 0, opacity: 0 }}
                animate={isTransforming ? { 
                  scale: [0, 1.8, 1], 
                  opacity: [0, 1, 1] 
                } : { scale: 0, opacity: 0 }}
                transition={{ 
                  delay: index * 0.15 + 0.8,
                  duration: 0.6 
                }}
                className="drop-shadow-[0_0_12px_rgba(34,197,94,1)]"
              />
            ))}

            {/* Data flow particles */}
            {isTransforming && Array.from({ length: 5 }).map((_, i) => (
              <motion.circle
                key={`particle-${i}`}
                r="3"
                fill="#06B6D4"
                initial={{ 
                  cx: 0,
                  cy: 200,
                  opacity: 0
                }}
                animate={{
                  cx: [0, 250, 500, 750, 1000],
                  cy: [200, 150, 180, 220, 200],
                  opacity: [0, 1, 1, 1, 0]
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.3 + 0.5,
                  ease: "easeInOut"
                }}
                className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
              />
            ))}

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#06B6D4" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#10B981" stopOpacity="1" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="1" />
              </linearGradient>
              <radialGradient id="nodeGradient">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="50%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#15803D" />
              </radialGradient>
            </defs>
          </svg>

          {/* Overlapping Systems - Same Position */}
          <div className="relative z-10 flex justify-center items-center">
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Old System - Base layer */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 relative overflow-hidden shadow-inner">
                {/* Static noise overlay */}
                <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-gray-600 via-transparent to-gray-600"></div>
                
                {/* Scanlines effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-500/3 to-transparent bg-[length:100%_4px]"></div>
                
                <div className="text-red-400 mb-4 relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
                    <span className="text-sm font-mono tracking-wider">LEGACY SYSTEM v1.2.3</span>
                    <div className="text-xs text-red-300 ml-2 font-mono">[DEPRECATED]</div>
                  </div>
                  <div className="text-xs text-red-300 font-mono opacity-75">
                    Last updated: 2015-03-14 | Runtime: 2847 days
                  </div>
                </div>
                
                <div className="space-y-3 relative z-10">
                  {/* Glitchy loading bars */}
                  <div className="bg-gray-700 h-8 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-900/10"></div>
                    <div className="absolute left-2 top-2 text-xs text-gray-400 font-mono">Loading...</div>
                    <div className="absolute right-2 top-2 text-xs text-red-400 font-mono opacity-80">ERROR</div>
                  </div>
                  
                  {/* Broken progress indicators */}
                  <div className="flex space-x-2">
                    <div className="bg-gray-700 h-4 rounded w-1/2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-yellow-900/20"></div>
                      <div className="w-1/3 h-full bg-yellow-600/50"></div>
                    </div>
                    <div className="bg-gray-700 h-4 rounded w-1/4 relative">
                      <div className="absolute inset-0 bg-red-900/30"></div>
                      <div className="text-xs text-red-400 absolute inset-0 flex items-center justify-center font-mono">!</div>
                    </div>
                  </div>
                  
                  {/* Old-style interface elements */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-gray-600 h-16 rounded border border-gray-500 relative">
                      <div className="absolute inset-1 bg-gray-700 rounded border-2 border-gray-500 border-t-gray-400 border-l-gray-400"></div>
                      <div className="absolute top-2 left-2 text-xs text-gray-400 font-mono">Module A</div>
                      <div className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full opacity-70"></div>
                    </div>
                    <div className="bg-gray-600 h-16 rounded border border-gray-500 relative">
                      <div className="absolute inset-1 bg-gray-700 rounded border-2 border-gray-500 border-t-gray-400 border-l-gray-400"></div>
                      <div className="absolute top-2 left-2 text-xs text-gray-400 font-mono">Module B</div>
                      <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-500 rounded-full opacity-70"></div>
                    </div>
                  </div>
                  
                  {/* Terminal-style error messages */}
                  <div className="bg-black/50 rounded p-2 font-mono text-xs border border-gray-600">
                    <div className="text-green-400">C:\legacy_system&gt;</div>
                    <div className="text-red-400 opacity-80">WARN: Memory leak detected in module A</div>
                    <div className="text-yellow-400">INFO: Attempting reconnection...</div>
                    <div className="text-red-400">ERROR: Connection timeout (30s)</div>
                    <div className="text-gray-500">Last login: Mon Mar 14 09:32:15 2015</div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 mt-4 font-mono relative z-10 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <span className="text-yellow-500">OUTDATED</span>
                    <span>•</span>
                    <span className="text-orange-500">PERFORMANCE ISSUES</span>
                    <span>•</span>
                    <span className="text-red-500">MAINTENANCE OVERHEAD</span>
                  </span>
                  <span className="text-red-400 font-bold">SYSTEM UPGRADE REQUIRED</span>
                </div>
                
                {/* Flickering effect for the entire old system */}
                <div className="absolute inset-0 bg-gray-800/5 opacity-10"></div>
              </div>

              {/* Modern System - Overlay with clip-path animation */}
              <motion.div
                className="z-100 absolute inset-0 bg-gradient-to-br from-slate-50/95 via-white/95 to-blue-50/95 dark:from-slate-900/95 dark:via-gray-800/95 dark:to-blue-900/95 border border-blue-200/50 dark:border-blue-400/30 rounded-xl p-6 backdrop-blur-xl overflow-hidden shadow-2xl"
                style={{
                  clipPath: isTransforming 
                    ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                    : "polygon(0 0, 0 0, 0 100%, 0 100%)"
                }}
                animate={{
                  clipPath: isTransforming
                    ? [
                        "polygon(0 0, 0 0, 0 100%, 0 100%)",
                        "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                        "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                      ]
                    : "polygon(0 0, 0 0, 0 100%, 0 100%)"
                }}
                transition={{
                  duration: 2,
                  delay: 1,
                  ease: "easeInOut"
                }}
              >
                {/* Modern header with status indicators */}
                <div className="text-emerald-500 dark:text-emerald-400 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50">
                        <div className="w-full h-full bg-emerald-300 rounded-full animate-ping"></div>
                      </div>
                      <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-white">NEXT-GEN PLATFORM</span>
                      <div className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full font-medium">
                        v2.0.0
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    Deployed: {new Date().toLocaleDateString()} | Status: Optimal | Uptime: 99.99%
                  </div>
                </div>
                
                {/* Modern interface elements */}
                <div className="space-y-4">
                  {/* Dashboard Header with Navigation */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-semibold text-gray-800 dark:text-white">Dashboard</div>
                      <div className="flex items-center space-x-2">
                        <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">
                          Overview
                        </div>
                        <div className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                          Analytics
                        </div>
                        <div className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                          Reports
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Admin</div>
                    </div>
                  </div>
                  
                  {/* KPI Cards Row */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Revenue</div>
                      <div className="text-sm font-bold text-gray-800 dark:text-white">$24.5K</div>
                      <div className="text-xs text-green-600 dark:text-green-400">+12%</div>
                    </div>
                    <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Users</div>
                      <div className="text-sm font-bold text-gray-800 dark:text-white">1,284</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">+8%</div>
                    </div>
                    <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Orders</div>
                      <div className="text-sm font-bold text-gray-800 dark:text-white">892</div>
                      <div className="text-xs text-green-600 dark:text-green-400">+5%</div>
                    </div>
                    <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Conversion</div>
                      <div className="text-sm font-bold text-gray-800 dark:text-white">3.24%</div>
                      <div className="text-xs text-cyan-500 dark:text-cyan-400">+2%</div>
                    </div>
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-800 dark:text-white">Performance Overview</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Last 7 days</div>
                    </div>
                    <div className="h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 to-cyan-900/20 rounded relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-1/4 w-1 h-6 bg-blue-500 rounded-full"></div>
                      <div className="absolute bottom-0 left-2/4 w-1 h-8 bg-cyan-500 rounded-full"></div>
                      <div className="absolute bottom-0 left-3/4 w-1 h-4 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Data Table */}
                  <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    {/* Table Header */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-sm font-medium text-gray-800 dark:text-white">Recent Transactions</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer">View all</div>
                    </div>
                    
                    {/* Table Content */}
                    <div className="space-y-0">
                      {/* Table Row 1 */}
                      <div className="flex items-center justify-between p-2 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="text-xs text-gray-800 dark:text-white font-medium">John Doe</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">$149.99</div>
                          <div className="text-xs text-green-600 dark:text-green-400">Complete</div>
                        </div>
                      </div>
                      
                      {/* Table Row 2 */}
                      <div className="flex items-center justify-between p-2 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <div className="text-xs text-gray-800 dark:text-white font-medium">Sarah Wilson</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">$89.50</div>
                          <div className="text-xs text-blue-600 dark:text-blue-400">Processing</div>
                        </div>
                      </div>
                      
                      {/* Table Row 3 */}
                      <div className="flex items-center justify-between p-2 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <div className="text-xs text-gray-800 dark:text-white font-medium">Mike Chen</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">$299.00</div>
                          <div className="text-xs text-green-600 dark:text-green-400">Complete</div>
                        </div>
                      </div>
                      
                      {/* Table Row 4 */}
                      <div className="flex items-center justify-between p-2 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <div className="text-xs text-gray-800 dark:text-white font-medium">Emma Davis</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">$67.25</div>
                          <div className="text-xs text-yellow-600 dark:text-yellow-400">Pending</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Action Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-4 bg-blue-500 rounded-sm"></div>
                      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
                      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Showing 1-4 of 247 entries
                    </div>
                  </div>
                </div>
                
                {/* Modern status footer */}
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-6 font-medium flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-4 h-4 text-emerald-500" />
                    <span>Lightning Fast</span>
                    <span>•</span>
                    <span>Beautiful</span>
                    <span>•</span>
                    <span>🔒 Secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-80"></div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">LIVE</span>
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
              </motion.div>

            </div>
          </div>

          {/* Transformation Icons */}
          <motion.div
            className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ scale: 0, rotate: 0 }}
            animate={isTransforming ? { 
              scale: [0, 1.5, 1], 
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            } : { scale: 0, rotate: 0, opacity: 0 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-full shadow-2xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Floating particles during transformation */}
          {isTransforming && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Transformation Process
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines between steps */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-slate-500/30"></div>
            
            {[
              {
                icon: <Code className="w-8 h-8" />,
                title: "Design & Craft",
                description: "Infrastructure assessment and architecture planning with modern DevOps practices",
                technologies: ["Python/Django", "React/NextJS", "Python/FastAPI"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Monitor & Optimize", 
                description: "Full-stack development with robust monitoring and error tracking systems",
                technologies: ["Sentry", "K6", "CloudWatch"],
                color: "from-cyan-500 to-slate-700"
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Deploy & Scale",
                description: "Database optimization and cloud deployment for high-performance applications",
                technologies: ["Kubernetes", "AWS ECS", "Terraform"],
                color: "from-green-500 to-emerald-500"
              }
            ].map((step, index) => {
              const isActive = currentStep >= index && isTransforming
              const isCompleted = currentStep > index && isTransforming
              
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  {/* Step number indicator */}
                  <div className="absolute -top-2 -right-2 z-10">
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        isCompleted 
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' 
                          : isActive 
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                            : 'bg-gray-600 text-gray-300'
                      }`}
                      animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                      transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </motion.div>
                  </div>
                  
                  {/* Icon container with enhanced lighting */}
                  <motion.div
                    className={`inline-flex p-6 rounded-full border-2 mb-6 relative overflow-hidden transition-all duration-500 ${
                      isActive || isCompleted
                        ? `bg-gradient-to-r ${step.color} border-white/50 shadow-2xl`
                        : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-cyan-400/30'
                    }`}
                    animate={isActive ? { 
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 40px rgba(59, 130, 246, 0.8)",
                        "0 0 20px rgba(59, 130, 246, 0.5)"
                      ],
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                  >
                    {/* Pulsing background for active state */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/20"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    <div className={`relative z-10 transition-colors duration-500 ${
                      isActive || isCompleted ? 'text-white' : 'text-blue-200'
                    }`}>
                      {step.icon}
                    </div>
                  </motion.div>
                  
                  <motion.h4 
                    className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
                      isActive || isCompleted ? 'text-white' : 'text-gray-300'
                    }`}
                    animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                    transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                  >
                    {step.title}
                  </motion.h4>
                  
                  <p className={`mb-4 transition-colors duration-500 ${
                    isActive || isCompleted ? 'text-blue-100' : 'text-blue-200'
                  }`}>
                    {step.description}
                  </p>
                  
                  {/* Technology Stack */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {step.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-500 ${
                          isActive || isCompleted
                            ? 'bg-white/20 text-white border-white/30 shadow-lg'
                            : 'bg-blue-500/10 text-blue-300 border-blue-400/30'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isActive ? { 
                          opacity: 1, 
                          scale: 1,
                          boxShadow: [
                            "0 0 10px rgba(255, 255, 255, 0.2)",
                            "0 0 20px rgba(255, 255, 255, 0.4)",
                            "0 0 10px rgba(255, 255, 255, 0.2)"
                          ]
                        } : { opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: techIndex * 0.1,
                          repeat: isActive ? Infinity : 0,
                          repeatType: "reverse",
                          repeatDelay: 2
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                    <p className='text-blue-300'>and more...</p>
                  
                  {/* Progress indicator for current step */}
                  {isActive && (
                    <motion.div
                      className="mt-4 w-full bg-gray-600/50 rounded-full h-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
