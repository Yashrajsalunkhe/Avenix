import { Link } from 'react-router-dom'

function Button({ children, href, onClick, variant = 'primary', external = false, className = '' }) {
  const classes = `button ${variant === 'secondary' ? 'button-secondary' : 'button-primary'} ${className}`.trim()

  if (href && href.startsWith('/')) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
