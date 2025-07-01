'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Code, Users, BookOpen, ExternalLink } from 'lucide-react'

const aspects = [
  {
    title: 'Developer',
    icon: <Code className="w-8 h-8" />,
    description: 'Building innovative solutions with cutting-edge technology',
    content: 'I create robust, scalable applications that solve real-world problems. From frontend interfaces to backend architectures, I bring ideas to life through code.',
    link: {
      text: 'Check out Skellar',
      url: 'https://skellar-mvp-frontend.vercel.app/',
      description: 'A modern platform showcasing my development capabilities'
    },
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Manager',
    icon: <Users className="w-8 h-8" />,
    description: 'Leading teams and orchestrating successful project delivery',
    content: 'I guide cross-functional teams through complex projects, ensuring alignment between technical execution and business objectives while fostering innovation and growth.',
    image: '/manager-image.jpg', // You'll need to add this image to the public folder
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Thinker',
    icon: <BookOpen className="w-8 h-8" />,
    description: 'Exploring ideas and sharing insights through writing and reflection',
    content: 'I believe in continuous learning and knowledge sharing. Through deep thinking and analysis, I contribute to the broader conversation about technology, leadership, and personal growth.',
    link: {
      text: 'Read Self-Engineering',
      url: 'https://pitch-legal-fa4.notion.site/Self-Engineering-The-Main-Questline-11a8e50846bf801caefaf512379866ed?pvs=74',
      description: 'My book exploring the intersection of personal development and systematic thinking'
    },
    color: 'from-purple-500 to-pink-500'
  }
]

export default function Aspects() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800" id="aspects">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Three Aspects of Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I bring a unique combination of technical expertise, leadership experience, 
            and thoughtful reflection to everything I do.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {aspects.map((aspect, index) => (
            <motion.div
              key={aspect.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${aspect.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {aspect.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {aspect.title}
                  </h3>
                  
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                    {aspect.description}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {aspect.content}
                  </p>

                  {aspect.image && (
                    <div className="mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <div className="w-full h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <div className="text-center">
                          <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Management & Leadership</p>
                          <p className="text-xs opacity-75">Add your professional image here</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {aspect.link && (
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full group/btn"
                        asChild
                      >
                        <a 
                          href={aspect.link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          {aspect.link.text}
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </a>
                      </Button>
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        {aspect.link.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
