'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Users, Code2, ExternalLink, Settings } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export default function Services() {
  const { t } = useLanguage()
  
  const services = [
    {
      title: t('services.teaching.title'),
      icon: <GraduationCap className="w-8 h-8" />,
      description: t('services.teaching.description'),
      content: t('services.teaching.content'),
      features: [
        t('services.teaching.features.0'),
        t('services.teaching.features.1'),
        t('services.teaching.features.2'),
        t('services.teaching.features.3')
      ],
      link: {
        text: t('services.teaching.link'),
        url: '#contact',
        description: t('services.teaching.linkDesc')
      },
      color: 'from-blue-600 to-cyan-500',
      highlight: t('services.teaching.highlight')
    },
    {
      title: t('services.consulting.title'),
      icon: <Users className="w-8 h-8" />,
      description: t('services.consulting.description'),
      content: t('services.consulting.content'),
      features: [
        t('services.consulting.features.0'),
        t('services.consulting.features.1'),
        t('services.consulting.features.2'),
        t('services.consulting.features.3')
      ],
      link: {
        text: t('services.consulting.link'),
        url: '#contact',
        description: t('services.consulting.linkDesc')
      },
      color: 'from-cyan-600 to-blue-800',
      highlight: t('services.consulting.highlight')
    },
    {
      title: t('services.development.title'),
      icon: <Code2 className="w-8 h-8" />,
      description: t('services.development.description'),
      content: t('services.development.content'),
      features: [
        t('services.development.features.0'),
        t('services.development.features.1'),
        t('services.development.features.2'),
        t('services.development.features.3')
      ],
      link: {
        text: t('services.development.link'),
        url: 'https://skellar.rn-ws.com/',
        description: t('services.development.linkDesc')
      },
      color: 'from-slate-600 to-cyan-500',
      highlight: t('services.development.highlight')
    }
  ]
  return (
    <section className="py-20 bg-white dark:bg-gray-800" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 scroll-stagger">
          {services.map((service) => (
            <div
              key={service.title}
              className="scroll-rotate-scale transition-transform duration-300 hover:-translate-y-3 hover:scale-[1.02]"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.color} opacity-10 rounded-bl-full`}></div>
                
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <div className={`relative px-4 py-2 font-mono text-xs font-bold tracking-wider transition-all duration-300 group-hover:scale-105`}>
                      <span className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-5 rounded`}></span>
                      <span className={`absolute left-0 top-1/2 -translate-y-1/2 text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        [
                      </span>
                      <span className={`relative z-10 mx-4 bg-gradient-to-r ${service.color} bg-clip-text text-transparent uppercase`}>
                        {service.highlight}
                      </span>
                      <span className={`absolute right-0 top-1/2 -translate-y-1/2 text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        ]
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {service.content}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      {t('services.serviceContent')}
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
                          <span className={`font-mono font-bold mr-2 bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200`}>
                            &gt;
                          </span>
                          <span className="font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.link && (
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full group/btn border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:shadow-md transition-all duration-200"
                        asChild
                      >
                        <a 
                          href={service.link.url} 
                          target={service.link.url.startsWith('http') ? "_blank" : undefined}
                          rel={service.link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="flex items-center justify-center gap-2"
                        >
                          {service.link.text}
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </a>
                      </Button>
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        {service.link.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 scroll-fade-in">
          <div className="bg-gradient-to-r from-white to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8 border border-slate-200 dark:border-slate-500">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.customTitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {t('services.customSubtitle')}
            </p>
            <Button 
              size="lg" 
              className="relative bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 overflow-hidden group border-2 border-cyan-500/20"
              asChild
            >
              <a href="#contact" className="flex items-center">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-lg text-white/80 group-hover:text-white transition-colors duration-200">
                  [
                </span>
                <span className="mx-8 font-semibold tracking-wide text-white">
                  {t('services.customButton')}
                </span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono font-bold text-lg text-white/80 group-hover:text-white transition-colors duration-200">
                  ]
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
