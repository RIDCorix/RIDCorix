'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import HydrationSafeDiv from './HydrationSafeDiv'
import { useLanguage } from '@/hooks/useLanguage'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceType: '',
    budget: '',
    timeline: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Replace this URL with your Google Apps Script web app URL
      const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzxqUXmEcQeOmQiEgDJZfsH5Gky-mWCpRdxvETOSDNBoMXrlqR2MK25zbi0BFR0m_Q/exec'
      
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Portfolio Website'
        })
      })

      // Since we're using no-cors mode, we can't read the response
      // We'll assume success if no error is thrown
      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', phone: '', serviceType: '', budget: '', timeline: '', subject: '', message: '' })
      
      // Show success message for 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      
      // Show error message for 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="contact">
      <HydrationSafeDiv className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <HydrationSafeDiv className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 scroll-fade-left">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.getInTouch')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {t('contact.getInTouchDesc')}
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('contact.email')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">ridcorix@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('contact.phone')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">+886 966188001</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('contact.location')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('contact.locationValue')}</p>
                </div>
              </motion.div>
            </div>

            <div className="pt-8">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('contact.responseTime')}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('contact.responseTimeDescription')}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="scroll-fade-right">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('contact.formTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 基本資訊 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact.form.nameRequired')}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact.form.emailRequired')}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact.form.company')}
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t('contact.form.companyPlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact.form.phone')}
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('contact.form.phonePlaceholder')}
                      />
                    </div>
                  </div>

                  {/* 服務類型 */}
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.serviceTypeRequired')}
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">{t('contact.form.serviceTypePlaceholder')}</option>
                      <option value="teaching">{t('contact.form.serviceTypes.teaching')}</option>
                      <option value="consulting">{t('contact.form.serviceTypes.consulting')}</option>
                      <option value="development">{t('contact.form.serviceTypes.development')}</option>
                      <option value="hybrid">{t('contact.form.serviceTypes.hybrid')}</option>
                      <option value="other">{t('contact.form.serviceTypes.other')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.form.subjectPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows={6}
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl ${
                        submitStatus === 'success' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : submitStatus === 'error'
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
                      }`}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting 
                        ? t('contact.form.submitting')
                        : submitStatus === 'success'
                        ? t('contact.form.success')
                        : submitStatus === 'error'
                        ? t('contact.form.error')
                        : t('contact.form.submit')
                      }
                    </Button>
                  </motion.div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 dark:text-green-400 text-sm text-center"
                    >
                      {t('contact.form.successMessage')}
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 dark:text-red-400 text-sm text-center"
                    >
                      {t('contact.form.errorMessage')}
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </HydrationSafeDiv>
      </HydrationSafeDiv>
    </section>
  )
}
