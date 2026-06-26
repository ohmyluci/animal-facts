import { useState, useRef } from 'react'
import { AnimatePresence, useMotionValue, useTransform, motion } from 'framer-motion'
import Splash from './components/Splash'
import AnimalCard from './components/AnimalCard'
import animals from './data/animals'
import './App.css'

export default function App() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [cardKey, setCardKey] = useState(0)
  const hintShown = useRef(false)

  // Solo para controlar la opacidad de las back cards — no controla posición del front
  const dragX = useMotionValue(0)
  const nextOpacity = useTransform(dragX, [0, -120], [0, 1])
  const prevOpacity = useTransform(dragX, [0, 120], [0, 1])

  const animal = animals[index]
  const nextAnimal = animals[(index + 1) % animals.length]
  const prevAnimal = animals[(index - 1 + animals.length) % animals.length]

  function handleDrag(x: number) {
    dragX.set(x)
  }

  function next() {
    dragX.set(-400) // mantiene la back card correcta visible mientras anima la salida
    setIndex(i => (i + 1) % animals.length)
    setCardKey(k => k + 1)
  }

  function prev() {
    dragX.set(400)
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
            <motion.div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: prevOpacity }}>
              <AnimalCard
                key={`prev-${cardKey}`}
                animal={prevAnimal}
                isBack
                onSwipeLeft={next}
                onSwipeRight={prev}
              />
            </motion.div>
            <motion.div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: nextOpacity }}>
              <AnimalCard
                key={`next-${cardKey}`}
                animal={nextAnimal}
                isBack
                onSwipeLeft={next}
                onSwipeRight={prev}
              />
            </motion.div>
            <AnimalCard
              key={cardKey}
              animal={animal}
              onSwipeLeft={next}
              onSwipeRight={prev}
              onDrag={handleDrag}
              showHint={!hintShown.current && (hintShown.current = true)}
            />
          </div>

          <div className="cards-overlay">
            <div className="dots">
              {animals.map((_, i) => (
                <span key={i} className={`dot${i === index ? ' active' : ''}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
