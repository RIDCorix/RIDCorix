'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import HydrationSafeDiv from './HydrationSafeDiv'
import { useLanguage } from '@/hooks/useLanguage'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <HydrationSafeDiv className="container mx-auto px-6">
        <HydrationSafeDiv className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <HydrationSafeDiv>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">{t('footer.brand')}</h3>
              <p className="text-gray-400 mb-4">
                {t('footer.tagline')}
              </p>
              <HydrationSafeDiv className="flex space-x-4">
                <motion.a
                  href="https://github.com/RIDCorix"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/ray-yang-84b071276/"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="mailto:ridcorix@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail size={20} />
                </motion.a>
              </HydrationSafeDiv>
            </motion.div>
          </HydrationSafeDiv>

          {/* Quick Links */}
          <HydrationSafeDiv>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    {t('footer.about')}
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                    {t('footer.projects')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    {t('footer.contact')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {t('footer.blog')}
                  </a>
                </li>
              </ul>
            </motion.div>
          </HydrationSafeDiv>

          {/* Services */}
          <HydrationSafeDiv>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-400">{t('footer.webDevelopment')}</span>
                </li>
                <li>
                  <span className="text-gray-400">{t('footer.architectureDesigning')}</span>
                </li>
                <li>
                  <span className="text-gray-400">{t('footer.consulting')}</span>
                </li>
              </ul>
            </motion.div>
          </HydrationSafeDiv>
        </HydrationSafeDiv>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <HydrationSafeDiv className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {t('footer.copyright')}
            </p>
            <HydrationSafeDiv className="flex items-center text-gray-400 text-sm">
              <span>{t('footer.madeWith')}</span>
            </HydrationSafeDiv>
          </HydrationSafeDiv>
        </motion.div>
      </HydrationSafeDiv>
    </footer>
  )
}
