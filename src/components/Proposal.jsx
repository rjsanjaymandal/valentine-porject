import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NO_MESSAGES = [
  "No 😢",
  "Are you sure? 🥺",
  "Really really? 💔",
  "Think again! 😭",
  "Pleeease? 🥹",
  "Don't do this... 😿",
  "I'll cry! 😭😭",
  "Look at those eyes! 🐶",
  "My heart is breaking 💔",
  "Fine... just kidding! 🙃",
]

const BURST_EMOJIS = ['💕', '💗', '✨', '💖', '🩷', '💘', '😍', '🥰']

function Proposal({ onAccept }) {
  const [hoverCount, setHoverCount] = useState(0)
  const [noPos, setNoPos] = useState(null)
  const [noVisible, setNoVisible] = useState(true)
  const [emojiBursts, setEmojiBursts] = useState([])

  // Yes grows, No shrinks
  const yesScale = Math.min(1 + hoverCount * 0.2, 2.5)
  const noScale = Math.max(1 - hoverCount * 0.12, 0.25)

  // Love meter fill %
  const loveMeterPct = Math.min(hoverCount * 12, 100)

  const spawnEmojiBurst = useCallback(() => {
    const newEmojis = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      emoji: BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
      dx: (Math.random() - 0.5) * 160,
      dy: -(Math.random() * 120 + 40),
    }))
    setEmojiBursts((prev) => [...prev, ...newEmojis])
    setTimeout(() => {
      setEmojiBursts((prev) => prev.filter((e) => !newEmojis.find((n) => n.id === e.id)))
    }, 1100)
  }, [])

  const moveNoButton = useCallback(() => {
    setHoverCount((c) => c + 1)
    spawnEmojiBurst()

    // Briefly vanish
    setNoVisible(false)
    setTimeout(() => setNoVisible(true), 320)

    // Random position within safe viewport bounds
    const vw = window.innerWidth
    const vh = window.innerHeight
    const padX = 50
    const padY = 70
    const newX = Math.random() * Math.max(vw - padX * 2, 60) + padX
    const newY = Math.random() * Math.max(vh - padY * 2, 60) + padY
    setNoPos({ x: newX, y: newY })
  }, [spawnEmojiBurst])

  const currentNoText = NO_MESSAGES[Math.min(hoverCount, NO_MESSAGES.length - 1)]

  return (
    <>
      {/* Emoji bursts */}
      {emojiBursts.map((e) => (
        <span
          key={e.id}
          className="emoji-burst"
          style={{
            left: `${e.x}px`,
            top: `${e.y}px`,
            '--dx': `${e.dx}px`,
            '--dy': `${e.dy}px`,
          }}
        >
          {e.emoji}
        </span>
      ))}

      <motion.div
        className="proposal-section"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.92 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="proposal-card glass">
          {/* Puppy begging GIF */}
          <motion.img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnM0cTRuMW5iYWF5NTQ1d2RqMnl2bDNra3g0OG0xOWdwYmw2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ExayQDzrI2xOb8A/giphy.gif"
            alt="Pleading puppy"
            className="proposal-gif"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Will you be my Valentine?
          </motion.h1>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            Pretty please? 🥺💌
          </motion.p>

          {/* Love Meter — fills as No is hovered */}
          {hoverCount > 0 && (
            <motion.div
              className="love-meter"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="meter-label">
                {loveMeterPct < 100 ? `Love meter: ${loveMeterPct}% 💗` : `MAXIMUM LOVE! 💖🔥`}
              </div>
              <div className="meter-track">
                <div className="meter-fill" style={{ width: `${loveMeterPct}%` }} />
              </div>
            </motion.div>
          )}

          <div className="button-area">
            {/* Yes Button — grows with each No hover */}
            <motion.button
              className="btn btn-yes"
              whileHover={{ scale: yesScale * 1.06 }}
              whileTap={{ scale: yesScale * 0.94 }}
              animate={{ scale: yesScale }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={onAccept}
            >
              Yes! 💖
            </motion.button>

            {/* No Button — vanishes + teleports on hover */}
            <AnimatePresence mode="wait">
              {noVisible && (
                <motion.button
                  key={hoverCount}
                  className="btn btn-no"
                  onMouseEnter={moveNoButton}
                  onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: noScale }}
                  exit={{ opacity: 0, scale: 0, rotate: 120 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  style={{
                    position: noPos ? 'fixed' : 'relative',
                    left: noPos ? `${noPos.x}px` : undefined,
                    top: noPos ? `${noPos.y}px` : undefined,
                    transform: noPos ? 'translate(-50%, -50%)' : undefined,
                    zIndex: 50,
                    pointerEvents: noScale <= 0.3 ? 'none' : 'auto',
                  }}
                >
                  {currentNoText}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {hoverCount > 0 && hoverCount < 5 && (
            <motion.p
              className="hover-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Psst... just click Yes already 😏
            </motion.p>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default Proposal
