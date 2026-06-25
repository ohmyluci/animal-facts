import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { Animal } from '../types'

const EMOJIS: Record<string, string> = {
  gallina: '🐔',
  cerdo: '🐷',
  vaca: '🐄',
}

interface Props {
  animal: Animal
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

export default function AnimalCard({ animal, onSwipeLeft, onSwipeRight }: Props) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
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

  return (
    <motion.div
      className="card"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="card-image">
        {EMOJIS[animal.id] ?? '🐾'}
      </div>
      <div className="card-info">
        <div className="card-name">{animal.name}</div>
        <div className="card-scientific">{animal.scientificName}</div>
        {animal.lifeExpectancy?.wild?.range && (
          <div className="card-life">
            Vida en libertad: {animal.lifeExpectancy.wild.range}
          </div>
        )}
      </div>
    </motion.div>
  )
}
