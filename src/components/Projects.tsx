'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'
import { useLanguage } from '@/hooks/useLanguage'
import { useState, useEffect } from 'react'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import SyntaxHighlighter from 'react-syntax-highlighter'

const projects = [
  {
    title: 'Skellar',
    description: 'A skill tree platform for both online courses and in-person workshops, designed to help users track their learning progress and achievements.',
    images: [
      '/projects/skellar/skellar-0.png',
      '/projects/skellar/skellar-1.png',
      '/projects/skellar/skellar-2.png',
      '/projects/skellar/skellar-3.png',
      '/projects/skellar/skellar-4.png',
    ],
    technologies: ['Next.js', 'Django', 'Stripe', 'PostgreSQL', 'Tailwind CSS', 'Amazon SQS', 'Redis', 'MCP'],
    liveUrl: 'https://skellar.rn-ws.com/',
    githubUrl: null,
    featured: true
  },
  {
    title: 'Network The Game',
    description: 'Code to define your units. Gather, build, and conquer in this multiplayer strategy game where you can create your own units and battle against others.',
    images: ['/projects/network.png'],
    technologies: ['Vite', 'Node.js', 'Monaco Editor', 'Shadcn UI', 'Material-UI'],
    liveUrl: 'https://network-the-game.vercel.app/',
    githubUrl: null,
    featured: true
  },
  {
    title: 'Unfired Studio Official Website',
    description: 'A creative studio website showcasing portfolio, lessons, and resources, with a modern design and smooth animations.',
    images: ['/projects/unfired-studio.png'],
    technologies: ['Next.js', 'Apps Script', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://unfiredstudio.com/',
    githubUrl: null,
    featured: false
  },
]

const openSourceProjects = [
  {
    title: 'Modern Next.js Django Jumpstarter',
    description: {
      en: 'A comprehensive template for modern full-stack applications with Next.js frontend and Django backend, complete with authentication, API integration, and deployment configurations.',
      zh: '現代化全端應用程式範本，整合 Next.js 前端與 Django 後端，包含認證系統、API 整合和部署配置。'
    },
    url: 'https://github.com/Starscribers/modern-nextjs-django-jumpstarter-template',
    technologies: ['Next.js', 'Django', 'TypeScript', 'PostgreSQL', 'Docker'],
    category: 'fullstack',
    codeSnippet: `# Clone the repository
git clone https://github.com/Starscribers/modern-nextjs-django-jumpstarter-template
cd modern-nextjs-django-jumpstarter-template

# Start with Docker Compose
docker-compose up -d

# Your full-stack app is ready at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Admin Panel: http://localhost:8000/admin`,
    screenshot: '/projects/nextjs-django-template.png'
  },
  {
    title: 'Django Synced Seeders',
    description: {
      en: 'Intelligent database seeding tool for Django that manages dependencies and ensures consistent data across environments.',
      zh: 'Django 智慧型資料庫填充工具，管理相依性並確保跨環境的資料一致性。'
    },
    url: 'https://github.com/Starscribers/django-synced-seeders',
    technologies: ['Django', 'Python', 'Database', 'DevOps'],
    category: 'python',
    screenshot: '',
    codeSnippetFileName: 'seeders.py',
    codeSnippet: `from seeds import seeder_registry, Seeder
from .models import Category

@seeder_registry.register()
class CategorySeeder(Seeder):
    seed_slug = "categories"
    exporting_querysets = (Category.objects.all(),)`
  },
  {
    title: 'Django Notification Hub',
    description: {
      en: 'Centralized notification system for Django applications supporting multiple channels (email, SMS, push notifications) with template management.',
      zh: 'Django 應用程式的集中式通知系統，支援多種通道（電子郵件、簡訊、推播通知）與範本管理。'
    },
    url: 'https://github.com/Starscribers/django-notification-hub',
    technologies: ['Django', 'Python', 'Email', 'SMS', 'Push Notifications'],
    category: 'python',
    codeSnippetFileName: 'settings.py',
    screenshot: '/projects/django-notification-hub.png',
    codeSnippet: `INSTALLED_APPS = [
    # ... your other apps
    'notification_hub',
]

# Notification backend configurations
NOTIFICATION_BACKENDS = {
    'email': {
        # Uses Django's email configuration
    },
    'slack': {
        'webhook_url': 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK',
        # OR use bot token
        'bot_token': 'xoxb-your-bot-token',
    },
    'sms': {
        'account_sid': 'your_twilio_sid',
        'auth_token': 'your_twilio_token',
        'from_phone': '+1234567890',
    }
}`
  },
  {
    title: 'Django Missions',
    description: {
      en: 'Educational gamification framework for Django, enabling developers to create interactive learning experiences with missions, achievements, and progress tracking.',
      zh: 'Django 教育遊戲化框架，讓開發者能創建互動學習體驗，包含任務系統、成就系統和進度追蹤。'
    },
    url: 'https://github.com/Starscribers/django-missions',
    technologies: ['Django', 'Python', 'Gamification', 'Education'],
    category: 'education',
    screenshot: 'projects/django-missions.png',
    codeSnippet: `from django_missions import Mission, Achievement

class FirstLoginMission(Mission):
    name = "First Steps"
    points = 10
    
    def check_completion(self, user):
        return user.last_login is not None

# Award achievement
user.complete_mission(FirstLoginMission)
user.progress  # Track learning progress`
  },
  {
    title: 'Python Interactive Textbook',
    description: {
      en: 'Interactive Python learning platform with hands-on exercises, real-time code execution, and progressive skill development for programming education.',
      zh: '互動式 Python 學習平台，提供實作練習、即時程式碼執行和漸進式技能發展，專為程式設計教育而設計。'
    },
    url: 'https://github.com/RIDCorix/python-interactive-textbook',
    screenshot: 'projects/python-interactive-textbook.png',
    technologies: ['Python', 'Jupyter', 'Education', 'Interactive Learning'],
    category: 'education',
    codeSnippet: `# Interactive code cells with instant feedback
def fibonacci(n):
    """Generate Fibonacci sequence"""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Students write code and see results immediately
list(fibonacci(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`
  }
]

export default function Projects() {
  const { t, language } = useLanguage()
  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)
  
  // Carousel state for featured projects (main slides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Image carousel state for each project
  const [projectImageIndex, setProjectImageIndex] = useState<{[key: number]: number}>({})
  
  // State for each category's active tab
  const [pythonTab, setPythonTab] = useState(0)
  const [educationTab, setEducationTab] = useState(0)

  // Auto-play main carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredProjects.length])

  // Auto-play images within each project
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = []
    featuredProjects.forEach((project, projectIdx) => {
      if (project.images.length > 1) {
        const interval = setInterval(() => {
          setProjectImageIndex(prev => ({
            ...prev,
            [projectIdx]: ((prev[projectIdx] || 0) + 1) % project.images.length
          }))
        }, 3000) // Change image every 3 seconds
        intervals.push(interval)
      }
    })
    return () => intervals.forEach(interval => clearInterval(interval))
  }, [featuredProjects])

  const handlePrevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const handleNextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentSlide(index)
  }

  const getCurrentProjectImage = (projectIndex: number) => {
    const project = featuredProjects[projectIndex]
    const imageIndex = projectImageIndex[projectIndex] || 0
    return project.images[imageIndex]
  }

  const handlePrevImage = (projectIndex: number) => {
    const project = featuredProjects[projectIndex]
    setProjectImageIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + project.images.length) % project.images.length
    }))
  }

  const handleNextImage = (projectIndex: number) => {
    const project = featuredProjects[projectIndex]
    setProjectImageIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % project.images.length
    }))
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-800" id="projects">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('projects.featuredTitle')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('projects.featuredSubtitle')}
          </p>
        </motion.div>

        {/* Featured Projects - Carousel */}
        <div className="relative mb-16">
          <div className="relative h-[600px] lg:h-[700px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Card className="h-full border-0 bg-transparent">
                  <div className="grid lg:grid-cols-2 h-full">
                    {/* Left: Image with auto-cycling */}
                    <div className="relative h-[300px] lg:h-full overflow-hidden group">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${currentSlide}-${projectImageIndex[currentSlide] || 0}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={getAssetPath(getCurrentProjectImage(currentSlide))}
                            alt={`${featuredProjects[currentSlide].title} - Image ${(projectImageIndex[currentSlide] || 0) + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/90 to-transparent dark:from-gray-900/90 dark:to-transparent"></div>
                      
                      {/* Image navigation buttons - show on hover if multiple images */}
                      {featuredProjects[currentSlide].images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePrevImage(currentSlide)
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNextImage(currentSlide)
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                          </button>
                        </>
                      )}
                      
                      {/* Image indicators */}
                      {featuredProjects[currentSlide].images.length > 1 && (
                        <div className="absolute bottom-4 left-4 flex gap-1.5 z-10">
                          {featuredProjects[currentSlide].images.map((_, imgIdx) => (
                            <button
                              key={imgIdx}
                              onClick={(e) => {
                                e.stopPropagation()
                                setProjectImageIndex(prev => ({
                                  ...prev,
                                  [currentSlide]: imgIdx
                                }))
                              }}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                (projectImageIndex[currentSlide] || 0) === imgIdx
                                  ? 'w-8 bg-white shadow-lg'
                                  : 'w-1.5 bg-white/50 hover:bg-white/70'
                              }`}
                              aria-label={`Go to image ${imgIdx + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Content */}
                    <div className="relative flex flex-col justify-center p-8 lg:p-12">
                      <div className="space-y-6">
                        <div>
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full mb-4">
                            Featured Project
                          </span>
                          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-mono">
                            {">"} {featuredProjects[currentSlide].title} _
                          </h3>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                          {featuredProjects[currentSlide].description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {featuredProjects[currentSlide].technologies.map((tech) => (
                            <Badge key={tech} variant="default" className="text-sm px-3 py-1">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button 
                            size="lg"
                            onClick={() => window.open(featuredProjects[currentSlide].liveUrl, '_blank')}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            {t('projects.liveDemo')}
                          </Button>
                          {featuredProjects[currentSlide].githubUrl && (
                            <Button 
                              variant="outline" 
                              size="lg"
                              onClick={() => {
                                if (featuredProjects[currentSlide].githubUrl) {
                                  window.open(featuredProjects[currentSlide].githubUrl, '_blank');
                                }
                              }}
                            >
                              <Github className="w-5 h-5 mr-2" />
                              {t('projects.viewCode')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10">
              <button
                onClick={handlePrevSlide}
                className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-200 border border-gray-200 dark:border-gray-600"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>

              {/* Dots */}
              <div className="flex gap-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-gray-200 dark:border-gray-600">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'w-10 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg' 
                        : 'w-2.5 bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-200 border border-gray-200 dark:border-gray-600"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
            </div>

            {/* Auto-play toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-8 right-8 px-4 py-2 rounded-lg font-medium text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-600"
            >
              {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
          </div>
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {t('projects.otherTitle')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <Card className="hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Image
                        src={getAssetPath(project.images[0])}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                     {">"} {project.title} _
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.liveUrl, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      {project.githubUrl && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.githubUrl) {
                              window.open(project.githubUrl, '_blank');
                            }
                          }}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Source & Community Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('projects.openSource.title')}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('projects.openSource.subtitle')}
            </p>
          </div>
          
          {/* Full Stack Template - Hero Banner */}
          <div className="mb-16">
            {(() => {
              const fullstackProject = openSourceProjects.find(p => p.category === 'fullstack')
              if (!fullstackProject) return null
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden bg-gray-900 dark:bg-gray-950 border-gray-700">
                    {/* Header */}
                    <CardContent className="p-8 pb-0">
                      <div className="mb-4">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                          Full Stack Template
                        </span>
                      </div>
                      
                      <h4 className="text-3xl font-bold text-white mb-4 font-mono">
                        {"> "}{fullstackProject.title} _
                      </h4>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                        {fullstackProject.description[language]}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {fullstackProject.technologies.map((tech) => (
                          <span 
                            key={fullstackProject.title + tech}
                            className="text-xs px-3 py-1.5 bg-gray-800 text-cyan-400 rounded border border-gray-700 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    
                    {/* Screenshot - Full Width */}
                    <div className="relative w-full bg-gradient-to-br from-gray-800 to-gray-900 p-8">
                      <div className="relative w-full h-[500px] lg:h-[600px]">
                        <Image
                          src={getAssetPath('/projects/django-nextjs-template.png')}
                          alt={fullstackProject.title}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Button */}
                    <CardContent className="p-8 pt-6">
                      <Button 
                        size="lg"
                        variant="outline"
                        className="bg-gray-800 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400 font-mono"
                        onClick={() => window.open(fullstackProject.url, '_blank')}
                      >
                        <Github className="w-5 h-5 mr-2" />
                        {t('projects.openSource.viewCode')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })()}
          </div>
          
          {/* Python & Django */}
          <div className="mb-16">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Python & Django
            </h4>
            {(() => {
              const pythonProjects = openSourceProjects.filter(p => p.category === 'python')
              return (
                <Card className="overflow-hidden bg-gray-900 dark:bg-gray-950 border-gray-700">
                  <div className="flex h-[700px]">
                    {/* Left: Tabs */}
                    <div className="bg-gray-800 dark:bg-gray-900 border-r border-gray-700 w-100 shrink-0">
                      {pythonProjects.map((project, idx) => (
                        <button
                          key={project.title}
                          onClick={() => setPythonTab(idx)}
                          className={`transition-all duration-200 ease  cursor-pointer w-full text-left px-6 py-4 border-b border-gray-700 transition-colors ${
                            pythonTab === idx
                              ? 'bg-gray-900 dark:bg-gray-950 text-cyan-400 border-l-4 border-l-cyan-400'
                              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                          }`}
                        >
                          <div className="font-mono text-sm font-semibold mb-1">
                           {">"} {project.title} _
                          </div>
                          <div className="text-xs text-gray-500">
                            [{project.technologies[0]}]
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Right: Content */}
                    <CardContent className="p-6">
                      {pythonProjects[pythonTab] && (
                        <div>
                          {/* Description */}
                          <p className="text-gray-300 mb-6 leading-relaxed">
                            {pythonProjects[pythonTab].description[language]}
                          </p>
                          
                          {/* Code Snippet */}
                          <div className="mb-6">
                            <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700 rounded-t">
                              <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              </div>
                              <div className="text-xs text-gray-400 font-mono ml-2">
                                {pythonProjects[pythonTab].codeSnippetFileName || 'example.py'}
                              </div>
                            </div>
                            <SyntaxHighlighter language="python" style={vscDarkPlus} className="bg-black/30 p-6 rounded-b text-sm font-mono text-gray-300 overflow-x-auto border border-gray-800 border-t-0">
                              {pythonProjects[pythonTab].codeSnippet}
                            </SyntaxHighlighter>
                          </div>
                          
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {pythonProjects[pythonTab].technologies.map((tech) => (
                              <span 
                                key={tech}
                                className="text-xs px-3 py-1 bg-gray-800 text-cyan-400 rounded border border-gray-700 font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {/* Button */}
                          <Button 
                            variant="outline"
                            className="bg-gray-800 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400 font-mono"
                            onClick={() => window.open(pythonProjects[pythonTab].url, '_blank')}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            {t('projects.openSource.viewCode')}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              )
            })()}
          </div>
          
          {/* Education & Playground */}
          <div className="mb-16">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Education & Playground
            </h4>
            {(() => {
              const educationProjects = openSourceProjects.filter(p => p.category === 'education')
              return (
                <Card className="overflow-hidden bg-gray-900 dark:bg-gray-950 border-gray-700">
                  <div className="flex h-[50vh]">
                    {/* Left: Tabs */}
                    <div className="bg-gray-800 dark:bg-gray-900 border-r border-gray-700 w-100 shrink-0">
                      {educationProjects.map((project, idx) => (
                        <button
                          key={project.title}
                          onClick={() => setEducationTab(idx)}
                          className={`transition-all duration-200 ease cursor-pointer w-full text-left px-6 py-4 border-b border-gray-700 transition-colors ${
                            educationTab === idx
                              ? 'bg-gray-900 dark:bg-gray-950 text-cyan-400 border-l-4 border-l-cyan-400'
                              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                          }`}
                        >
                          <div className="font-mono text-sm font-semibold mb-1">
                           {">"} {project.title} _
                          </div>
                          <div className="text-xs text-gray-500">
                            [{project.technologies[0]}]
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Right: Content */}
                    <CardContent className="p-6">
                      {educationProjects[educationTab] && (
                        <div>
                          {/* Description */}
                          <p className="text-gray-300 mb-6 leading-relaxed">
                            {educationProjects[educationTab].description[language]}
                          </p>
                          
                          {/* Image */}
                          <div className="mb-6">
                            <div className="relative w-full h-90 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg">
                              <Image
                                src={educationProjects[educationTab].screenshot}
                                alt={educationProjects[educationTab].title}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                              />
                            </div>
                          </div>
                          
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {educationProjects[educationTab].technologies.map((tech) => (
                              <span 
                                key={tech}
                                className="text-xs px-3 py-1 bg-gray-800 text-cyan-400 rounded border border-gray-700 font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {/* Button */}
                          <Button 
                            variant="outline"
                            className="bg-gray-800 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400 font-mono"
                            onClick={() => window.open(educationProjects[educationTab].url, '_blank')}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            {t('projects.openSource.viewCode')}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              )
            })()}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
