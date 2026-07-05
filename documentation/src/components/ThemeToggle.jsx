import { motion } from 'framer-motion'

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-label="Toggle color theme">
      <motion.span
        className="theme-toggle-track"
        animate={{ background: isDark ? 'linear-gradient(90deg, #3b82f6, #22d3ee)' : 'linear-gradient(90deg, #cbd5e1, #94a3b8)' }}
      >
        <motion.span className="theme-toggle-thumb" animate={{ x: isDark ? 20 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 24 }} />
      </motion.span>
    </button>
  )
}

export default ThemeToggle
