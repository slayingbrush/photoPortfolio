import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import Videos from './components/Videos.jsx'
import About from './components/About.jsx'
import ForHire from './components/ForHire.jsx'
import Footer from './components/Footer.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [page, setPage] = useState('home')
  const [pendingScroll, setPendingScroll] = useState(null)

  // Always load at the very top — don't let the browser restore a mid-page
  // scroll position on reload (the hero owns the first viewport).
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fire pending scroll once back on home
  useEffect(() => {
    if (page === 'home' && pendingScroll) {
      const el = document.getElementById(pendingScroll)
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
        return () => clearTimeout(t)
      }
      setPendingScroll(null)
    }
  }, [page, pendingScroll])

  function goHome() {
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goGallery() {
    setPage('gallery')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goProjects() {
    setPage('projects')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goAdmin() {
    setPage('admin')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goSection(id) {
    if (page === 'home') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setPendingScroll(id)
      setPage('home')
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  function pageLabel() {
    if (page === 'gallery') return 'Gallery page'
    if (page === 'projects') return 'Projects page'
    if (page === 'admin') return 'Admin page'
    return 'Home page'
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {pageLabel()}
      </div>
      <Nav
        scrolled={scrolled}
        page={page}
        onGallery={goGallery}
        onProjects={goProjects}
        onAdmin={goAdmin}
        onSection={goSection}
        onHome={goHome}
      />

      {page === 'gallery' && <GalleryPage />}
      {page === 'projects' && <ProjectsPage />}
      {page === 'admin' && <AdminPage />}
      {page === 'home' && (
        <main id="main-content" className="page-enter">
          <Hero />
          <Ticker />
          <Videos />
          <About />
          <ForHire />
        </main>
      )}

      <Footer onSection={goSection} />
    </>
  )
}
