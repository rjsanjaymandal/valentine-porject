import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import MemoryCarousel from './MemoryCarousel'

function fireConfetti() {
  const duration = 4000
  const end = Date.now() + duration
  const colors = ['#ff69b4', '#ff1493', '#ff4e8e', '#e8435a', '#ffb6c1', '#ffffff', '#ff6b6b']

  ;(function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.6 },
      colors,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.6 },
      colors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()

  setTimeout(() => {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.55 }, colors, scalar: 1.3 })
  }, 300)

  setTimeout(() => {
    confetti({ particleCount: 80, spread: 120, origin: { y: 0.45, x: 0.3 }, colors })
    confetti({ particleCount: 80, spread: 120, origin: { y: 0.45, x: 0.7 }, colors })
  }, 900)
}

function Celebration() {
  useEffect(() => {
    fireConfetti()
  }, [])

  return (
    <motion.div
      className="celebration-section"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="celebration-card glass">
        <motion.span
          className="big-heart"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
        >
          💖
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Yay! You said Yes!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          You've just made me the happiest person in the world! 🥰
          <br />
          I can't wait to spend this Valentine's Day with you.
          <br />
          Here's to us — to every moment, every smile, every heartbeat. 💕
        </motion.p>

        {/* Celebratory GIF */}
        <motion.img
          className="celebration-gif"
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXd6OGJ2cWxhMGFiamRkaDV6NDFqanlqNjI0N3J6NTh2cGFuY2V5NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M90mJvfWfd5mbUuULX/giphy.gif"
          alt="Celebration dance"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        style={{ width: '100%' }}
      >
        <MemoryCarousel />
      </motion.div>
    </motion.div>
  )
}

export default Celebration
