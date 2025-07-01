'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'Skellar',
    description: 'A skill tree platform for both online courses and in-person workshops, designed to help users track their learning progress and achievements.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://skellar-mvp-frontend.vercel.app/',
    githubUrl: null,
    featured: true
  },
  {
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates, file sharing, and team communication features.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.',
    image: '/api/placeholder/600/400',
    technologies: ['Vue.js', 'OpenWeather API', 'Chart.js', 'SCSS'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false
  },
  {
    title: 'Portfolio Website',
    description: 'Modern, responsive portfolio website with smooth animations and dark mode support.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'MDX'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management with data visualization and scheduling features.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'D3.js', 'Express.js', 'Redis', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false
  },
  {
    title: 'Learning Management System',
    description: 'Educational platform with course creation, progress tracking, and interactive learning modules.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Prisma', 'Supabase', 'Stripe', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false
  }
]

export default function Projects() {
  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

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
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in full-stack development, 
            UI/UX design, and problem-solving.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">Project Image</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button asChild size="sm">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Other Projects
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
              >
                <Card className="hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative h-32 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                      <span className="text-white text-sm">Project Image</span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                      {project.title}
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
                      <Button asChild size="sm" variant="ghost" className="p-2">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="ghost" className="p-2">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
