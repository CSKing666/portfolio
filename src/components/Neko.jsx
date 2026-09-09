import { useEffect } from 'react'

/**
 * A pixel cat that chases the cursor — a React port of oneko.js
 * (github.com/adryd325/oneko.js), itself a descendant of the 1989 Neko.
 *
 * Entirely client-side: a 32px div whose background-position steps through the
 * sprite sheet at 10fps. Nothing is fetched beyond the one GIF.
 */

const SPRITE_SIZE = 32
const SPEED = 10
// Below this distance the cat stops and starts idling, so it sits beside the
// cursor rather than jittering underneath it.
const REST_DISTANCE = 48

// Each entry is a list of [column, row] tiles in the sprite sheet; multi-tile
// sets animate by cycling on alternate frames.
const SPRITE_SETS = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
}

const Neko = () => {
  useEffect(() => {
    // Pointer-driven and purely decorative: skip it for touch input, and for
    // anyone who has asked for reduced motion.
    const canRun =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canRun) return undefined

    const el = document.createElement('div')
    el.id = 'oneko'
    el.setAttribute('aria-hidden', 'true')
    Object.assign(el.style, {
      width: `${SPRITE_SIZE}px`,
      height: `${SPRITE_SIZE}px`,
      position: 'fixed',
      pointerEvents: 'none',
      imageRendering: 'pixelated',
      left: '16px',
      top: '16px',
      zIndex: '60',
      backgroundImage: `url(${import.meta.env.BASE_URL}images/oneko.gif)`,
    })
    document.body.appendChild(el)

    let nekoX = 32
    let nekoY = 32
    let mouseX = 32
    let mouseY = 32
    let frameCount = 0
    let idleTime = 0
    let idleAnimation = null
    let idleAnimationFrame = 0
    let lastFrameTimestamp = null
    let rafId = null

    const setSprite = (name, frame) => {
      const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length]
      el.style.backgroundPosition = `${sprite[0] * SPRITE_SIZE}px ${
        sprite[1] * SPRITE_SIZE
      }px`
    }

    const resetIdleAnimation = () => {
      idleAnimation = null
      idleAnimationFrame = 0
    }

    const idle = () => {
      idleTime += 1

      // After a few seconds of stillness, occasionally start a little routine.
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
        const available = ['sleeping', 'scratchSelf']
        if (nekoX < 32) available.push('scratchWallW')
        if (nekoY < 32) available.push('scratchWallN')
        if (nekoX > window.innerWidth - 32) available.push('scratchWallE')
        if (nekoY > window.innerHeight - 32) available.push('scratchWallS')
        idleAnimation = available[Math.floor(Math.random() * available.length)]
      }

      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) {
            setSprite('tired', 0)
            break
          }
          setSprite('sleeping', Math.floor(idleAnimationFrame / 4))
          if (idleAnimationFrame > 192) resetIdleAnimation()
          break
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          setSprite(idleAnimation, idleAnimationFrame)
          if (idleAnimationFrame > 9) resetIdleAnimation()
          break
        default:
          setSprite('idle', 0)
          return
      }
      idleAnimationFrame += 1
    }

    const frame = () => {
      frameCount += 1
      const diffX = nekoX - mouseX
      const diffY = nekoY - mouseY
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2)

      if (distance < SPEED || distance < REST_DISTANCE) {
        idle()
        return
      }

      idleAnimation = null
      idleAnimationFrame = 0

      // A brief "!" before giving chase, as in the original.
      if (idleTime > 1) {
        setSprite('alert', 0)
        idleTime = Math.min(idleTime, 7)
        idleTime -= 1
        return
      }

      let direction = diffY / distance > 0.5 ? 'N' : ''
      direction += diffY / distance < -0.5 ? 'S' : ''
      direction += diffX / distance > 0.5 ? 'W' : ''
      direction += diffX / distance < -0.5 ? 'E' : ''
      setSprite(direction, frameCount)

      nekoX -= (diffX / distance) * SPEED
      nekoY -= (diffY / distance) * SPEED

      // Keep it on screen even if the cursor leaves the viewport.
      nekoX = Math.min(Math.max(16, nekoX), window.innerWidth - 16)
      nekoY = Math.min(Math.max(16, nekoY), window.innerHeight - 16)

      el.style.left = `${nekoX - 16}px`
      el.style.top = `${nekoY - 16}px`
    }

    // The sprite animation is designed for 10fps; rAF keeps it in step with the
    // display and pauses automatically in background tabs.
    const loop = (timestamp) => {
      if (lastFrameTimestamp == null) lastFrameTimestamp = timestamp
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp
        frame()
      }
      rafId = window.requestAnimationFrame(loop)
    }

    const handleMouseMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId = window.requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (rafId != null) window.cancelAnimationFrame(rafId)
      el.remove()
    }
  }, [])

  return null
}

export default Neko
