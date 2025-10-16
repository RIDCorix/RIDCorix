import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import TransformationAnimation from '@/components/TransformationAnimation'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Services />
      <TransformationAnimation />
      <Contact />
      <Footer />
    </div>
  )
}
