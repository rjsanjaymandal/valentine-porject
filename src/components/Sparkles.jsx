import { useMemo } from 'react'

function Sparkles() {
  const sparkles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 2,
      size: Math.random() * 4 + 3,
    }))
  }, [])

  return (
    <div className="sparkles-container">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Sparkles
