import Hero from '@/components/Hero'
import About from '@/components/About'
import Aspects from '@/components/Aspects'
import TransformationAnimation from '@/components/TransformationAnimation'
import Projects from '@/components/Projects'
import Articles from '@/components/Articles'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Aspects />
      <TransformationAnimation />
      <Projects />
      <Articles />
      <Contact />
      <Footer />
    </div>
  )
}
