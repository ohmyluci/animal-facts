import { useState } from 'react'
import { AnimatePresence, useMotionValue, useTransform, motion } from 'framer-motion'
import Splash from './components/Splash'
import AnimalCard from './components/AnimalCard'
import animals from './data/animals'
import './App.css'

export default function App() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [cardKey, setCardKey] = useState(0)

  // MotionValue compartido: AnimalCard lo actualiza sin pasar por React state
  const dragX = useMotionValue(0)

  // z-index reactivo a dragX sin re-renders de React
  const nextZ = useTransform(dragX, v => v <= 0 ? 2 : 1)
  const prevZ = useTransform(dragX, v => v > 0 ? 2 : 1)

  const animal = animals[index]
  const nextAnimal = animals[(index + 1) % animals.length]
  const prevAnimal = animals[(index - 1 + animals.length) % animals.length]

  function next() {
    setIndex(i => (i + 1) % animals.length)
    setCardKey(k => k + 1)
    dragX.set(0)
  }

  function prev() {
    setIndex(i => (i - 1 + animals.length) % animals.length)
    setCardKey(k => k + 1)
    dragX.set(0)
  }

  return (
    <div className="app">
      <AnimatePresence>
        {!started && <Splash onContinue={() => setStarted(true)} />}
      </AnimatePresence>

      {started && (
        <div className="cards-view">
          <div className="card-stack">
            {/* Back card anterior — visible al arrastrar a la derecha */}
            <motion.div style={{ position: 'absolute', inset: 0, zIndex: prevZ }}>
              <AnimalCard
                key={`prev-${cardKey}`}
                animal={prevAnimal}
                isBack
                onSwipeLeft={next}
                onSwipeRight={prev}
              />
            </motion.div>
            {/* Back card siguiente — visible al arrastrar a la izquierda */}
            <motion.div style={{ position: 'absolute', inset: 0, zIndex: nextZ }}>
              <AnimalCard
                key={`next-${cardKey}`}
                animal={nextAnimal}
                isBack
                onSwipeLeft={next}
                onSwipeRight={prev}
              />
            </motion.div>
            <AnimatePresence mode="wait">
              <AnimalCard
                key={cardKey}
                animal={animal}
                onSwipeLeft={next}
                onSwipeRight={prev}
                dragX={dragX}
              />
            </AnimatePresence>
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
