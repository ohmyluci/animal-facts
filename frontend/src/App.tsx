import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Splash from './components/Splash'
import AnimalCard from './components/AnimalCard'
import animals from './data/animals'
import './App.css'

export type Mode = 'libertad' | 'realidad'

export default function App() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [cardKey, setCardKey] = useState(0)
  const [mode, setMode] = useState<Mode>('libertad')

  const animal = animals[index]

  function next() {
    setIndex(i => (i + 1) % animals.length)
    setCardKey(k => k + 1)
  }

  function prev() {
    setIndex(i => (i - 1 + animals.length) % animals.length)
    setCardKey(k => k + 1)
  }

  return (
    <div className="app">
      <AnimatePresence>
        {!started && <Splash onContinue={() => setStarted(true)} />}
      </AnimatePresence>

      {started && (
        <div className="cards-view">
          <div className="card-stack">
            <AnimatePresence mode="wait">
              <AnimalCard
                key={cardKey}
                animal={animal}
                mode={mode}
                onSwipeLeft={next}
                onSwipeRight={prev}
              />
            </AnimatePresence>
          </div>

          <div className="dots">
            {animals.map((_, i) => (
              <span key={i} className={`dot${i === index ? ' active' : ''}`} />
            ))}
          </div>

          <div className="mode-toggle">
            <button
              className={`mode-btn${mode === 'libertad' ? ' active' : ''}`}
              onClick={() => setMode('libertad')}
            >
              🌿 Libertad
            </button>
            <button
              className={`mode-btn${mode === 'realidad' ? ' active' : ''}`}
              onClick={() => setMode('realidad')}
            >
              💀 Realidad
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
