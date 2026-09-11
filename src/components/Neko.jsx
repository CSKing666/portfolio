import { useEffect } from 'react'

/**
 * A pixel cat that chases the cursor, using nekojs
 * (github.com/louisabraham/nekojs, a port of Neko98 — the same script the
 * reference site loads, so behaviour matches it exactly).
 *
 * The script is fetched from its author's host at runtime rather than bundled:
 * nekojs is GPL-3.0, and loading it this way keeps its code out of this repo.
 */
const NEKO_SRC = 'https://louisabraham.github.io/nekojs/neko.js'

const Neko = () => {
  useEffect(() => {
    // Pointer-driven and purely decorative: skip for touch input, and for
    // anyone who has asked for reduced motion.
    const canRun =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canRun) return undefined

    const script = document.createElement('script')
    script.src = NEKO_SRC
    script.async = true
    // neko.js looks for this attribute on document.currentScript as it loads,
    // and spawns the cat itself when present.
    script.setAttribute('data-autostart', '')
    document.body.appendChild(script)

    return () => {
      window.neko?.destroy?.()
      delete window.neko
      script.remove()
    }
  }, [])

  return null
}

export default Neko
