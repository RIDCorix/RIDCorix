'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Palette, Server, Smartphone } from 'lucide-react'

const skills = [
  {
    category: 'Frontend',
    icon: <Code className="w-6 h-6" />,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    category: 'Backend',
    icon: <Server className="w-6 h-6" />,
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    category: 'Design',
    icon: <Palette className="w-6 h-6" />,
    skills: ['Figma', 'Adobe XD', 'UI/UX Design', 'Prototyping', 'Design Systems'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    category: 'Mobile',
    icon: <Smartphone className="w-6 h-6" />,
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Cross-platform'],
    color: 'from-orange-500 to-red-500'
  }
]

export default function About() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="about">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm a passionate full-stack developer with over 5 years of experience creating 
            digital solutions that combine beautiful design with robust functionality. 
            I love turning complex problems into simple, elegant interfaces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              My Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Started as a curious student fascinated by how websites work, I've evolved 
              into a seasoned developer who bridges the gap between design and development. 
              My journey has taken me through various industries, from startups to enterprise solutions.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community through 
              blog posts and speaking engagements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Experience</h4>
              <p className="text-gray-600 dark:text-gray-300">5+ Years in Web Development</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Projects</h4>
              <p className="text-gray-600 dark:text-gray-300">50+ Completed Projects</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Focus</h4>
              <p className="text-gray-600 dark:text-gray-300">User-Centered Design & Performance</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Education</h4>
              <p className="text-gray-600 dark:text-gray-300">B.S. Computer Science</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Skills & Technologies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${skillGroup.color} text-white mb-4`}>
                      {skillGroup.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
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
