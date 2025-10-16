'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Palette, Smartphone, Database, Server, Brain } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import AIMindMap from './AIMindMap'
import { fadeInUp, staggerContainer, staggerItem, scaleIn, scrollViewport } from '@/lib/scroll-animations'

export default function About() {
  const { t, language } = useLanguage()
  
  const skills = [
    {
      category: t('about.skills.frontend'),
      icon: <Code className="w-6 h-6" />,
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      color: 'from-blue-600 to-cyan-500'
    },
    {
      category: t('about.skills.backend'),
      icon: <Server className="w-6 h-6" />,
      skills: ['Node.js', 'Python Django', 'PostgreSQL', 'MongoDB', 'REST APIs'],
      color: 'from-cyan-600 to-blue-800'
    },
    {
      category: t('about.skills.cloud'),
      icon: <Palette className="w-6 h-6" />,
      skills: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'GitHub Actions'],
      color: 'from-slate-600 to-cyan-500'
    },
    {
      category: t('about.skills.data'),
      icon: <Smartphone className="w-6 h-6" />,
      skills: ['Airbyte', 'ETL', 'Great Expectations', 'Amazon Redshift'],
      color: 'from-blue-700 to-slate-800'
    },
    {
      category: t('about.skills.ai'),
      icon: <Smartphone className="w-6 h-6" />,
      skills: ['LangGraph', 'MCP Tooling', 'Context Engineering', 'LLM Applications'],
      color: 'from-cyan-600 to-blue-900'
    }
  ]
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="about">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="scroll-fade-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.journey')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('about.journeyContent1')}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {t('about.journeyContent2')}
            </p>
          </div>

          <div className="scroll-fade-right space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('about.experience')}</h4>
              <p className="text-gray-600 dark:text-gray-300">{t('about.experienceValue')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('about.projects')}</h4>
              <p className="text-gray-600 dark:text-gray-300">{t('about.projectsValue')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('about.focus')}</h4>
              <p className="text-gray-600 dark:text-gray-300">{t('about.focusValue')}</p>
            </div>
            <div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 scroll-fade-in">
            {t('about.skillsTitle')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-stagger">
            {skills.map((skillGroup, index) => (
              <div
                key={skillGroup.category}
                className="scroll-card-lift transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${skillGroup.color} text-white mb-4`}>
                      {skillGroup.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <div 
                          key={`${index}-${skillIndex}-${skill}`} 
                          className="relative group cursor-default"
                        >
                          <span className={`absolute left-0 top-1/2 -translate-y-1/2 font-mono font-bold text-sm bg-gradient-to-r ${skillGroup.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200`}>
                            [
                          </span>
                          <span className="px-4 py-1 font-mono text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200 uppercase tracking-wide">
                            {skill}
                          </span>
                          <span className={`absolute right-0 top-1/2 -translate-y-1/2 font-mono font-bold text-sm bg-gradient-to-r ${skillGroup.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200`}>
                            ]
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
