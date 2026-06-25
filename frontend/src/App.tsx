import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Splash from './components/Splash'
import AnimalCard from './components/AnimalCard'
import animals from './data/animals'
import './App.css'

export default function App() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [cardKey, setCardKey] = useState(0)

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

          <div className="nav-hint">← desliza para navegar →</div>
        </div>
      )}
    </div>
  )
}
