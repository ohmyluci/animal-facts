import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { Animal } from '../types'
import type { Mode } from '../App'

interface Props {
  animal: Animal
  mode: Mode
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

export default function AnimalCard({ animal, mode, onSwipeLeft, onSwipeRight }: Props) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    if (info.offset.x < -80) {
      animate(x, -400, { duration: 0.3 }).then(onSwipeLeft)
    } else if (info.offset.x > 80) {
      animate(x, 400, { duration: 0.3 }).then(onSwipeRight)
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 })
    }
  }

  const isRealidad = mode === 'realidad'

  return (
    <motion.div
      className="card"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="card-header">
        <h2 className="card-name">{animal.name}</h2>
      </div>

      <div className="card-image-wrapper">
        <motion.div
          className="card-image"
          animate={{ backgroundColor: isRealidad ? '#1a0a0a' : '#1e2a1a' }}
          transition={{ duration: 0.4 }}
        >
          <span className="card-emoji">{animal.emoji}</span>
        </motion.div>
        <div className="card-domains">
          {animal.domains.map(d => (
            <span key={d} className="card-domain-tag">{d}</span>
          ))}
        </div>
      </div>

      <div className={`card-data ${isRealidad ? 'card-data--realidad' : ''}`}>
        <div className="card-stat">
          <span className="card-stat-icon">🌿</span>
          <div>
            <div className="card-stat-label">Vida en libertad</div>
            <div className="card-stat-value">{animal.lifeExpectancy.value}</div>
          </div>
        </div>
        <div className="card-stat">
          <span className="card-stat-icon">💀</span>
          <div>
            <div className="card-stat-label">Edad de sacrificio</div>
            <div className="card-stat-value">{animal.ageAtKill.value}</div>
          </div>
        </div>
        {animal.facts[0] && (
          <div className="card-stat">
            <span className="card-stat-icon">📋</span>
            <div>
              <div className="card-stat-label">{animal.facts[0].statement}</div>
              <div className="card-stat-value">{animal.facts[0].value}</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
