'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import TypingAnimation from './TypingAnimation'
import { getAssetPath } from '@/lib/utils'
import { useLanguage } from '@/hooks/useLanguage'

export default function Hero() {
  const { t, language } = useLanguage()
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100 dark:from-slate-900 dark:via-blue-950 dark:to-cyan-950">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800">
                <Image
                  src={getAssetPath('/avatar.png')}
                  alt="Ray's Avatar"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            className="mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg blur-xl"></div>
              <blockquote className="font-mono relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-blue-200/30 dark:border-blue-400/30 rounded-lg p-6 text-center">
                <div className="inline-block text-4xl text-blue-500/30 dark:text-blue-400/30 mb-2">&ldquo;</div>
                <p className="inline-block text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 italic min-h-[1.5em] flex items-center justify-center">
                  <TypingAnimation 
                    key={`quote1-${language}`}
                    text={t('hero.quote')}
                    speed={40}
                    delay={1000}
                    className="inline-block"
                  /><TypingAnimation 
                    key={`quote2-${language}`}
                    text={t('hero.quoteSecond')}
                    speed={100}
                    delay={3000}
                    className="inline-block"
                  />
                </p>
                <div className="inline-block text-4xl text-blue-500/30 dark:text-blue-400/30 mt-2">&rdquo;</div>
                <cite className="block text-sm text-gray-500 dark:text-gray-400 font-medium not-italic">— {t('hero.quoteAuthor')}</cite>
              </blockquote>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="#services">
              <Button size="lg" className="relative bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 cursor-pointer overflow-hidden group text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-200">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono font-bold text-lg text-white/80 group-hover:text-white transition-colors duration-200">
                  [
                </span>
                <span className="mx-6 font-semibold tracking-wide text-white">
                  {t('hero.buttonServices')}
                </span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono font-bold text-lg text-white/80 group-hover:text-white transition-colors duration-200">
                  ]
                </span>
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline" size="lg" className="relative cursor-pointer overflow-hidden group border-2 border-slate-300 dark:border-slate-500 hover:border-blue-500 dark:hover:border-blue-400 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm transition-all duration-200 text-gray-900 dark:text-white font-medium hover:shadow-lg">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono font-bold text-lg text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                  &gt;
                </span>
                <span className="mx-6 font-semibold tracking-wide">
                  {t('hero.buttonContact')}
                </span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono font-bold text-lg text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                  _
                </span>
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.a
              href="https://github.com/RIDCorix"
              target='_blank'
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ray-yang-84b071276/"
              target='_blank'
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:ridcorix@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.a
          href="#about"
          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ArrowDown size={32} />
        </motion.a>
      </motion.div>
    </section>
  )
}
