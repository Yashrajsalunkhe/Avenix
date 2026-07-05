import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const sections = [
  { label: 'Introduction', icon: '◉' },
  { label: 'Installation', icon: '⬢' },
  { label: 'Requirements', icon: '◌' },
  { label: 'Quick Start', icon: '▶' },
  { label: '@trace Decorator', icon: '✦' },
  { label: 'Tracer Class', icon: '◎' },
  { label: 'TraceModel', icon: '◍' },
  { label: 'Supported Models', icon: '✧' },
  { label: 'Features', icon: '⚡' },
  { label: 'Architecture', icon: '▣' },
  { label: 'Examples', icon: '▹' },
  { label: 'Testing', icon: '✓' },
  { label: 'Error Handling', icon: '⚠' },
  { label: 'API Reference', icon: '⌘' },
  { label: 'Changelog', icon: '↺' },
  { label: 'Contributing', icon: '✚' },
  { label: 'License', icon: '⚖' },
]

function Sidebar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <button type="button" className="mobile-sidebar-toggle" onClick={() => setMobileOpen((prev) => !prev)}>
        {mobileOpen ? 'Close' : 'Sections'}
      </button>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.aside className="sidebar mobile-sidebar" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="sidebar-title">Documentation</div>
            <nav>
              {sections.map(({ label, icon }) => {
                const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                const isActive = activeSection === id
                return (
                  <Link key={label} to="/docs" className={isActive ? 'active' : ''} onClick={(event) => {
                    event.preventDefault()
                    setMobileOpen(false)
                    const target = document.getElementById(id)
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}>
                    <span className="sidebar-icon">{icon}</span>
                    <span>{label}</span>
                  </Link>
                )
              })}
            </nav>
          </motion.aside>
        ) : null}
      </AnimatePresence>
      <motion.aside className="sidebar desktop-sidebar" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
        <div className="sidebar-title">Documentation</div>
        <nav>
          {sections.map(({ label, icon }) => {
            const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            const isActive = activeSection === id
            return (
              <Link key={label} to="/docs" className={isActive ? 'active' : ''} onClick={(event) => {
                event.preventDefault()
                const target = document.getElementById(id)
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}>
                <span className="sidebar-icon">{icon}</span>
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>
      </motion.aside>
    </>
  )
}

export default Sidebar
