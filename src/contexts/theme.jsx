import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

const readSavedTheme = () => {
  try {
    const saved = localStorage.getItem('themeName')
    return saved === 'dark' || saved === 'light' ? saved : null
  } catch (e) {
    // Private mode or blocked storage — treat as "no preference saved".
    return null
  }
}

const getInitialTheme = () =>
  readSavedTheme() ??
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(getInitialTheme)

  // The `dark` class lives on <html>: the CSS variables in styles.css and every
  // UnoCSS `dark:` variant key off it.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeName === 'dark')
  }, [themeName])

  // Track the OS setting, but only until the visitor picks a theme themselves.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => {
      if (!readSavedTheme()) setThemeName(event.matches ? 'dark' : 'light')
    }

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeName((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('themeName', next)
      } catch (e) {
        // Preference simply will not persist; the toggle still works.
      }
      return next
    })
  }, [])

  const value = useMemo(
    () => [{ themeName, toggleTheme }],
    [themeName, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ThemeProvider, ThemeContext }
