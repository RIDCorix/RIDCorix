"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Frontend Development",
    subtitle: "More than 3 years",
    skills: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 },
      { name: "TypeScript", level: 70 },
      { name: "Next.js", level: 75 },
    ]
  },
  {
    title: "Backend Development", 
    subtitle: "More than 2 years",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Python", level: 75 },
      { name: "Database", level: 70 },
      { name: "MongoDB", level: 65 },
      { name: "PostgreSQL", level: 70 },
      { name: "API Design", level: 75 },
    ]
  },
  {
    title: "Tools & Technologies",
    subtitle: "Everyday tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 65 },
      { name: "AWS", level: 60 },
      { name: "Linux", level: 70 },
      { name: "VS Code", level: 90 },
      { name: "Figma", level: 60 },
    ]
  }
]

const technologies = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
  "HTML5", "CSS3", "Tailwind CSS", "MongoDB", "PostgreSQL", "Git",
  "Docker", "AWS", "Linux", "Figma", "VS Code", "Framer Motion"
]

export function SkillsSection() {
  const [visibleSkills, setVisibleSkills] = React.useState<Set<string>>(new Set())

  const handleSkillVisible = (skillName: string) => {
    setVisibleSkills(prev => new Set(prev).add(skillName))
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My Technical Level
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: (categoryIndex * 0.2) + (skillIndex * 0.1) 
                      }}
                      viewport={{ once: true }}
                      onViewportEnter={() => handleSkillVisible(skill.name)}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={visibleSkills.has(skill.name) ? skill.level : 0} 
                        className="h-2"
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technology Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant="secondary" 
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}