import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false)
      window.setTimeout(() => navigate('/'), 220)
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [navigate])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <motion.div
            className="splash-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="splash-mark"
              animate={{ boxShadow: ['0 0 0 rgba(34,211,238,0)', '0 0 28px rgba(34,211,238,0.45)', '0 0 0 rgba(34,211,238,0)'] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: 'mirror' }}
            >
              A
            </motion.span>
            <span className="splash-name">Avenix</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default SplashScreen
