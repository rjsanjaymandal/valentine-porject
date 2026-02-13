import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ——— Escalating No button text ——— */
const NO_MESSAGES = [
  "No 😢",
  "Are you sure? 🥺",
  "Really?! 💔",
  "Think again! 😭",
  "Pleeease? 🥹",
  "I'll be sad forever 😿",
  "I'm literally begging 😭😭",
  "LOOK AT THE PUPPY 🐶😭",
  "My heart can't take it 💔",
  "OK fine... jk you can't click me 🙃",
  "...",
]

/* ——— Yes button text gets more enticing ——— */
const YES_MESSAGES = [
  "Yes! �",
  "Yes! 💖",
  "Yessss! 🥰",
  "Say YES! 😍",
  "C'mon, YES! 🤩",
  "YES PLEASE! 💕",
  "ABSOLUTELY YES! 💍",
  "YES YES YES! 🎉",
  "👉 YES 👈",
  "✨ YES ✨",
  "💖 Y E S 💖",
]

/* ——— Funny persuasion reasons ——— */
const REASONS = [
  "I'll share my fries with you 🍟",
  "I'll let you pick the movie 🎬",
  "Free hugs for life 🤗",
  "I'll never steal the blanket 🛏️",
  "Unlimited piggyback rides �",
  "I'll pretend to like your playlists 🎵",
  "I come with free WiFi 📶",
  "I'll always save you the last slice 🍕",
  "My dog already loves you 🐕",
  "I'll laugh at all your jokes, even bad ones �",
]

const BURST_EMOJIS = ['💕', '💗', '✨', '💖', '🩷', '💘', '😍', '🥰', '🌹', '💐']

/* ——— Puppy GIFs that get progressively sadder ——— */
const PUPPY_GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnM0cTRuMW5iYWF5NTQ1d2RqMnl2bDNra3g0OG0xOWdwYmw2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ExayQDzrI2xOb8A/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGhxZHVwc2p1MXJzZ2VjeTd2OGNyeGIydXp4NjdyczlsN2t5ZGdhaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Oc8lIQHZsXqDu/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ283NTR6emExcWRibXh2NjBvZW16OTlkOHp6cGI2aTdlcnRkNGE1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BEob5qwFkSJ7G/giphy.gif",
]

function Proposal({ onAccept }) {
  const [hoverCount, setHoverCount] = useState(0)
  const [noPos, setNoPos] = useState(null)
  const [noVisible, setNoVisible] = useState(true)
  const [emojiBursts, setEmojiBursts] = useState([])
  const [currentReason, setCurrentReason] = useState(0)
  const [shakeScreen, setShakeScreen] = useState(false)

  // Cycle through persuasion reasons
  useEffect(() => {
    if (hoverCount < 2) return
    const timer = setInterval(() => {
      setCurrentReason((c) => (c + 1) % REASONS.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [hoverCount])

  // Scale factors
  const yesScale = Math.min(1 + hoverCount * 0.22, 2.8)
  const noScale = Math.max(1 - hoverCount * 0.1, 0.15)
  const loveMeterPct = Math.min(hoverCount * 11, 100)

  // Pick GIF based on desperation level
  const gifIndex = hoverCount >= 6 ? 2 : hoverCount >= 3 ? 1 : 0
  const currentGif = PUPPY_GIFS[gifIndex]

  // Pick yes/no text
  const yesText = YES_MESSAGES[Math.min(hoverCount, YES_MESSAGES.length - 1)]
  const noText = NO_MESSAGES[Math.min(hoverCount, NO_MESSAGES.length - 1)]

  // No button completely gone after many attempts
  const noButtonGone = hoverCount >= 10

  const spawnEmojiBurst = useCallback(() => {
    const newEmojis = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      emoji: BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)],
      x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
      y: Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.2,
      dx: (Math.random() - 0.5) * 180,
      dy: -(Math.random() * 140 + 50),
    }))
    setEmojiBursts((prev) => [...prev, ...newEmojis])
    setTimeout(() => {
      setEmojiBursts((prev) => prev.filter((e) => !newEmojis.find((n) => n.id === e.id)))
    }, 1100)
  }, [])

  const moveNoButton = useCallback(() => {
    setHoverCount((c) => c + 1)
    spawnEmojiBurst()

    // Screen shake!
    setShakeScreen(true)
    setTimeout(() => setShakeScreen(false), 400)

    // Vanish + teleport
    setNoVisible(false)
    setTimeout(() => setNoVisible(true), 350)

    // Keep button fully inside the visible viewport
    const btnW = 160
    const btnH = 50
    const margin = 20
    const minX = margin + btnW / 2
    const maxX = window.innerWidth - margin - btnW / 2
    const minY = margin + btnH / 2
    const maxY = window.innerHeight - margin - btnH / 2
    const newX = Math.max(minX, Math.min(maxX, Math.random() * window.innerWidth))
    const newY = Math.max(minY, Math.min(maxY, Math.random() * window.innerHeight))
    setNoPos({ x: newX, y: newY })
  }, [spawnEmojiBurst])

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
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: shakeScreen ? [0, -6, 6, -4, 4, -2, 2, 0] : 0,
        }}
        exit={{ opacity: 0, y: -40, scale: 0.92 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="proposal-card glass">
          {/* Puppy GIF — changes based on desperation */}
          <motion.img
            key={gifIndex}
            src={currentGif}
            alt="Pleading puppy"
            className="proposal-gif"
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Will you be my Valentine?
          </motion.h1>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {hoverCount === 0 && "Pretty please? 🥺💌"}
            {hoverCount > 0 && hoverCount < 5 && "You know you want to say yes... 😏💕"}
            {hoverCount >= 5 && hoverCount < 8 && "THE PUPPY IS GETTING SADDER 🐶😭"}
            {hoverCount >= 8 && !noButtonGone && "Just give in already!! 💖💖💖"}
            {noButtonGone && "The No button gave up. Take the hint! 😂💖"}
          </motion.p>

          {/* Love Meter */}
          {hoverCount > 0 && (
            <motion.div
              className="love-meter"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="meter-label">
                {loveMeterPct < 50 && `Love-o-meter: ${loveMeterPct}% 💗`}
                {loveMeterPct >= 50 && loveMeterPct < 100 && `Love-o-meter: ${loveMeterPct}% 🔥`}
                {loveMeterPct >= 100 && `💖 OVERFLOWING WITH LOVE 💖`}
              </div>
              <div className="meter-track">
                <motion.div
                  className="meter-fill"
                  animate={{ width: `${loveMeterPct}%` }}
                  transition={{ type: 'spring', stiffness: 120 }}
                />
              </div>
            </motion.div>
          )}

          {/* Persuasion ticker — appears after a few hovers */}
          <AnimatePresence mode="wait">
            {hoverCount >= 2 && (
              <motion.div
                key={currentReason}
                className="reason-ticker"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                💡 Reason #{currentReason + 1}: {REASONS[currentReason]}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="button-area">
            {/* Yes Button */}
            <motion.button
              className="btn btn-yes"
              whileHover={{ scale: yesScale * 1.06 }}
              whileTap={{ scale: yesScale * 0.94 }}
              animate={{ scale: yesScale }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={onAccept}
            >
              {yesText}
            </motion.button>

            {/* No Button — or its ghost */}
            {!noButtonGone ? (
              <AnimatePresence mode="wait">
                {noVisible && (
                  <motion.button
                    key={hoverCount}
                    className="btn btn-no"
                    onMouseEnter={moveNoButton}
                    onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    animate={{ opacity: 1, scale: noScale, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    style={{
                      position: noPos ? 'fixed' : 'relative',
                      left: noPos ? `${noPos.x}px` : undefined,
                      top: noPos ? `${noPos.y}px` : undefined,
                      transform: noPos ? 'translate(-50%, -50%)' : undefined,
                      zIndex: 50,
                    }}
                  >
                    {noText}
                  </motion.button>
                )}
              </AnimatePresence>
            ) : (
              /* No button is gone — show funny tombstone */
              <motion.span
                className="no-tombstone"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
              >
                🪦 RIP "No" Button
              </motion.span>
            )}
          </div>

          {/* Cheeky hints */}
          {hoverCount > 0 && hoverCount < 4 && (
            <motion.p
              className="hover-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Psst... just click Yes already 😏
            </motion.p>
          )}
          {hoverCount >= 4 && hoverCount < 8 && (
            <motion.p
              className="hover-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              The Yes button is RIGHT THERE ➡️💖
            </motion.p>
          )}
          {hoverCount >= 8 && !noButtonGone && (
            <motion.p
              className="hover-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Resistance is futile 🤖�
            </motion.p>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default Proposal
