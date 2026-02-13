import { useRef, useState } from 'react'

function MusicToggle() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="/song.mp3"
      />
      <button
        className="music-toggle"
        onClick={toggle}
        title={playing ? 'Mute music' : 'Play music'}
        aria-label={playing ? 'Mute music' : 'Play music'}
      >
        {playing ? '🎵' : '🔇'}
      </button>
    </>
  )
}

export default MusicToggle
