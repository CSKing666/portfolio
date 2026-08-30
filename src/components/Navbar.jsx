import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../contexts/theme'
import { projects, skills, contact } from '../portfolio'

const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    projects.length && { href: '#projects', label: 'Projects' },
    skills.length && { href: '#skills', label: 'Skills' },
    contact.email && { href: '#contact', label: 'Contact' },
  ].filter(Boolean)

  // While the mobile sheet is open, lock the page behind it and let Escape close it.
  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  // Anything wider than a phone gets the inline list, so the sheet must not
  // linger if the viewport is resized while it is open.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const handleChange = (event) => {
      if (event.matches) setIsMenuOpen(false)
    }

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return (
    <nav className='flex items-center gap-1'>
      {links.length > 0 && (
        <ul className='hidden md:flex items-center gap-8 mr-4'>
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className='link-nav text-sm'>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <button
        type='button'
        onClick={toggleTheme}
        className='icon-btn'
        aria-label={`Switch to ${themeName === 'dark' ? 'light' : 'dark'} theme`}
      >
        <span
          className={themeName === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'}
          aria-hidden='true'
        />
      </button>

      {links.length > 0 && (
        <button
          type='button'
          onClick={() => setIsMenuOpen(true)}
          className='icon-btn md:hidden'
          aria-label='Open navigation'
          aria-expanded={isMenuOpen}
        >
          <span className='i-lucide-menu' aria-hidden='true' />
        </button>
      )}

      {isMenuOpen && (
        <div className='fixed inset-0 z-50 md:hidden bg-bg'>
          <div className='shell flex items-center justify-end h-16'>
            <button
              type='button'
              onClick={() => setIsMenuOpen(false)}
              className='icon-btn'
              aria-label='Close navigation'
            >
              <span className='i-lucide-x' aria-hidden='true' />
            </button>
          </div>

          <ul className='flex flex-col items-center justify-center gap-8 h-[calc(100%-4rem)] pb-16'>
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className='text-2xl font-600 text-fg-strong transition-colors hover:text-primary'
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
