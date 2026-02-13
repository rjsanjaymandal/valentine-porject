import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts'
import Sparkles from './components/Sparkles'
import MusicToggle from './components/MusicToggle'
import Proposal from './components/Proposal'
import Celebration from './components/Celebration'

function App() {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="app">
      <FloatingHearts />
      <Sparkles />
      <MusicToggle />
      <AnimatePresence mode="wait">
        {!accepted ? (
          <Proposal key="proposal" onAccept={() => setAccepted(true)} />
        ) : (
          <Celebration key="celebration" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
