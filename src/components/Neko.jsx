import { useEffect } from 'react'

/**
 * A pixel cat that chases the cursor.
 *
 * Sprite sheet and behaviour follow oneko.js (github.com/adryd325/oneko.js),
 * descended from the 1989 Neko. The motion, however, is decoupled from the
 * sprite clock: oneko moves 10px once per animation frame at 10fps, which reads
 * as teleporting. Here the position advances every rendered frame using elapsed
 * time, while the sprite still flips at a retro 10fps.
 */

const SPRITE_SIZE = 32
// Pixels per second. oneko's 10px every 100ms works out to the same speed —
// it just delivered it in ten visible jumps.
const SPEED = 120
const SPRITE_INTERVAL = 100
// Below this distance the cat settles beside the cursor rather than sitting
// underneath it and jittering.
const REST_DISTANCE = 48

// [column, row] tiles in the sheet; multi-tile sets alternate as frames advance.
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
    // Purely decorative and pointer-driven: skip for touch and reduced motion.
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
      top: '0',
      left: '0',
      pointerEvents: 'none',
      imageRendering: 'pixelated',
      zIndex: '60',
      backgroundImage: `url(${import.meta.env.BASE_URL}images/oneko.gif)`,
      // transform keeps movement on the compositor; left/top would force layout
      // on every frame.
      willChange: 'transform',
    })
    document.body.appendChild(el)

    let nekoX = 32
    let nekoY = 32
    let mouseX = 32
    let mouseY = 32

    let spriteFrame = 0
    let spriteAccumulator = 0
    let idleTicks = 0
    let alertTicks = 0
    let idleAnimation = null
    let idleAnimationFrame = 0
    let direction = 'idle'

    let lastTimestamp = null
    let rafId = null

    const setSprite = (name, frame) => {
      const set = SPRITE_SETS[name] || SPRITE_SETS.idle
      const [col, row] = set[frame % set.length]
      el.style.backgroundPosition = `${col * SPRITE_SIZE}px ${row * SPRITE_SIZE}px`
    }

    const resetIdleAnimation = () => {
      idleAnimation = null
      idleAnimationFrame = 0
    }

    const idle = () => {
      idleTicks += 1

      if (idleTicks > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
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

    // Runs at 10fps — sprite selection and the idle routines only.
    const spriteTick = () => {
      spriteFrame += 1

      if (direction === 'idle') {
        idle()
        return
      }

      resetIdleAnimation()

      // A beat of surprise before giving chase, as in the original.
      if (alertTicks > 0) {
        alertTicks -= 1
        setSprite('alert', 0)
        return
      }

      idleTicks = 0
      setSprite(direction, spriteFrame)
    }

    // Runs every rendered frame — position only.
    const move = (delta) => {
      const diffX = mouseX - nekoX
      const diffY = mouseY - nekoY
      const distance = Math.hypot(diffX, diffY)

      if (distance <= REST_DISTANCE) {
        if (direction !== 'idle') {
          direction = 'idle'
          idleTicks = 0
        }
        return
      }

      // Coming out of a rest, freeze briefly on the alert frame.
      if (direction === 'idle') {
        alertTicks = 3
        resetIdleAnimation()
      }

      const unitX = diffX / distance
      const unitY = diffY / distance

      let next = 'E'
      if (unitY < -0.5) next = 'N'
      else if (unitY > 0.5) next = 'S'
      else next = ''
      if (unitX > 0.5) next += 'E'
      else if (unitX < -0.5) next += 'W'
      direction = next || (unitX > 0 ? 'E' : 'W')

      if (alertTicks > 0) return

      // Stop at the rest ring rather than overshooting into a jitter.
      const step = Math.min((SPEED * delta) / 1000, distance - REST_DISTANCE)
      nekoX += unitX * step
      nekoY += unitY * step

      nekoX = Math.min(Math.max(16, nekoX), window.innerWidth - 16)
      nekoY = Math.min(Math.max(16, nekoY), window.innerHeight - 16)

      el.style.transform = `translate3d(${Math.round(nekoX - 16)}px, ${Math.round(
        nekoY - 16
      )}px, 0)`
    }

    const loop = (timestamp) => {
      if (lastTimestamp == null) lastTimestamp = timestamp
      // Clamp so a backgrounded tab does not resume with one enormous jump.
      const delta = Math.min(timestamp - lastTimestamp, 100)
      lastTimestamp = timestamp

      move(delta)

      spriteAccumulator += delta
      while (spriteAccumulator >= SPRITE_INTERVAL) {
        spriteAccumulator -= SPRITE_INTERVAL
        spriteTick()
      }

      rafId = window.requestAnimationFrame(loop)
    }

    const handleMouseMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    el.style.transform = `translate3d(${nekoX - 16}px, ${nekoY - 16}px, 0)`
    setSprite('idle', 0)
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
