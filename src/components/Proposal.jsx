import { useState, useCallback, useRef } from 'react'
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

function Proposal({ onAccept }) {
  const [hoverCount, setHoverCount] = useState(0)
  const [noPos, setNoPos] = useState(null)
  const [noVisible, setNoVisible] = useState(true)
  const containerRef = useRef(null)

  // Yes grows, No shrinks
  const yesScale = Math.min(1 + hoverCount * 0.22, 3.5)
  const noScale = Math.max(1 - hoverCount * 0.1, 0.3)

  const moveNoButton = useCallback(() => {
    setHoverCount((c) => c + 1)

    // Briefly disappear for dramatic effect
    setNoVisible(false)
    setTimeout(() => setNoVisible(true), 180)

    // Jump to random position within viewport
    const vw = window.innerWidth
    const vh = window.innerHeight
    const pad = 80
    const newX = Math.random() * (vw - pad * 2) + pad
    const newY = Math.random() * (vh - pad * 2) + pad
    setNoPos({ x: newX, y: newY })
  }, [])

  const currentNoText = NO_MESSAGES[Math.min(hoverCount, NO_MESSAGES.length - 1)]

  return (
    <motion.div
      className="proposal-section"
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="proposal-card glass">
        {/* Puppy begging GIF */}
        <motion.img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnM0cTRuMW5iYWF5NTQ1d2RqMnl2bDNra3g0OG0xOWdwYmw2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ExayQDzrI2xOb8A/giphy.gif"
          alt="Pleading puppy"
          className="proposal-gif"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Will you be my Valentine?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Pretty please? 🥺💌
        </motion.p>

        <div className="button-area" ref={containerRef}>
          {/* Yes Button — grows with each No hover */}
          <motion.button
            className="btn btn-yes"
            whileHover={{ scale: yesScale * 1.06 }}
            whileTap={{ scale: yesScale * 0.94 }}
            animate={{ scale: yesScale }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            onClick={onAccept}
            style={{ zIndex: 10 }}
          >
            Yes! 💖
          </motion.button>

          {/* No Button — jumps & disappears on hover */}
          <AnimatePresence>
            {noVisible && (
              <motion.button
                className="btn btn-no"
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                initial={{ opacity: 1, scale: noScale }}
                animate={{ opacity: 1, scale: noScale }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                style={{
                  position: noPos ? 'fixed' : 'relative',
                  left: noPos ? `${noPos.x}px` : 'auto',
                  top: noPos ? `${noPos.y}px` : 'auto',
                  zIndex: 50,
                  pointerEvents: noScale <= 0.35 ? 'none' : 'auto',
                }}
              >
                {currentNoText}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default Proposal
