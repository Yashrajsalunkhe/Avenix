import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from './Button'
import logo from '../assets/avenix-logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/docs', label: 'Documentation' },
  { to: 'https://github.com/Yashrajsalunkhe/Avenix', label: 'GitHub', external: true },
]

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className="brand" aria-label="Go to home page">
          <motion.img
            src={logo}
            alt="Avenix logo"
            className="brand-mark"
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          />
          <span className="brand-name">Avenix</span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((item) => {
            const content = (
              <motion.span whileHover={{ y: -2, scale: 1.02 }} transition={{ duration: 0.2 }}>
                {item.label}
              </motion.span>
            )

            if (item.external) {
              return (
                <a key={item.label} href={item.href || item.to} className="nav-link" target="_blank" rel="noreferrer">
                  {content}
                </a>
              )
            }

            return (
              <NavLink key={item.label} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {({ isActive }) => (
                  <>
                    <motion.span whileHover={{ y: -2, scale: 1.02 }} transition={{ duration: 0.2 }}>
                      {item.label}
                    </motion.span>
                    <motion.span className="nav-link-indicator" layoutId="nav-indicator" animate={{ opacity: isActive ? 1 : 0 }} />
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="navbar-actions">
          <Button href="https://pypi.org/project/avenix/" variant="secondary" external className="nav-pypi">
            View on PyPI
          </Button>
          <button type="button" className="menu-toggle" onClick={() => setMobileOpen((prev) => !prev)} aria-label="Toggle navigation menu" aria-expanded={mobileOpen}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside className="mobile-menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
              <div className="mobile-menu-header">
                <span>Avenix</span>
                <button type="button" className="menu-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">×</button>
              </div>
              <nav className="mobile-nav-links">
                {links.map((item) => {
                  if (item.external) {
                    return (
                      <a key={item.label} href={item.to} target="_blank" rel="noreferrer" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </a>
                    )
                  }
                  return (
                    <NavLink key={item.label} to={item.to} end={item.to === '/'} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </NavLink>
                  )
                })}
                <a href="https://pypi.org/project/avenix/" target="_blank" rel="noreferrer" className="mobile-nav-link mobile-nav-cta" onClick={() => setMobileOpen(false)}>
                  View on PyPI
                </a>
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Navbar
