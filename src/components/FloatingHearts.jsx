import { motion } from 'framer-motion'
import { useMemo } from 'react'

const HEART_EMOJIS = ['❤️', '💕', '💖', '💗', '💘', '💝', '🩷', '♥️']

function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
      size: Math.random() * 24 + 14,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 10,
      drift: (Math.random() - 0.5) * 120,
    }))
  }, [])

  return (
    <div className="floating-hearts">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, h.drift],
            opacity: [0, 1, 1, 0],
            rotate: [0, h.drift > 0 ? 25 : -25],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingHearts
