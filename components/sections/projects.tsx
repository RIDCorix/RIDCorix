"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Modern Web Application",
    description: "A full-stack web application built with modern technologies, featuring responsive design and clean user interface.",
    image: "https://via.placeholder.com/400x250/4a90e2/ffffff?text=Project+1",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    demoUrl: "#",
    codeUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Mobile-First Design",
    description: "A responsive website with mobile-first approach, optimized for performance and user experience.",
    image: "https://via.placeholder.com/400x250/4a90e2/ffffff?text=Project+2",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    demoUrl: "#",
    codeUrl: "#",
    featured: false
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.",
    image: "https://via.placeholder.com/400x250/4a90e2/ffffff?text=Project+3",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    demoUrl: "#",
    codeUrl: "#",
    featured: true
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates and team collaboration features.",
    image: "https://via.placeholder.com/400x250/4a90e2/ffffff?text=Project+4",
    technologies: ["React", "Firebase", "Material-UI", "WebSocket"],
    demoUrl: "#",
    codeUrl: "#",
    featured: false
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with location-based forecasts and interactive charts.",
    image: "https://via.placeholder.com/400x250/4a90e2/ffffff?text=Project+5",
    technologies: ["Vue.js", "Chart.js", "Weather API", "PWA"],
    demoUrl: "#",
    codeUrl: "#",
    featured: false
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js and shadcn/ui components, featuring dark mode and animations.",
    image: "https://via.placeholder.com/400x250/4a90e2/ffffff?text=Project+6",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    codeUrl: "#",
    featured: true
  }
]

export function ProjectsSection() {
  const [filter, setFilter] = React.useState<"all" | "featured">("all")

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.featured)

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Featured Work
          </p>
          
          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Projects
            </Button>
            <Button
              variant={filter === "featured" ? "default" : "outline"}
              onClick={() => setFilter("featured")}
            >
              Featured
            </Button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {project.featured && (
                    <Badge className="absolute top-4 right-4">
                      Featured
                    </Badge>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-0">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/RIDCorix" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View More on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}