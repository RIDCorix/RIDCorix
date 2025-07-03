import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}
