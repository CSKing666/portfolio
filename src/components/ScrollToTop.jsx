import { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500)

    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <a
      href='#top'
      aria-label='Back to top'
      className={`fixed z-40 right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:right-8 sm:bottom-8 w-12 h-12 inline-flex items-center justify-center rounded-full bg-surface border border-line shadow-lift text-fg transition-all duration-300 hover:(text-primary -translate-y-1) ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-3'
      }`}
    >
      <span className='i-lucide-arrow-up' aria-hidden='true' />
    </a>
  )
}

export default ScrollToTop
