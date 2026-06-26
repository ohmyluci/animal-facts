import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { Animal } from '../types'
import LifespanBar from './LifespanBar'
import SlaughterCounter from './SlaughterCounter'

interface Props {
  animal: Animal
  onSwipeLeft: () => void
  onSwipeRight: () => void
  // Solo para notificar a App la dirección del drag (back card opacity)
  onDrag?: (x: number) => void
  isBack?: boolean
}

export default function AnimalCard({
  animal, onSwipeLeft, onSwipeRight, onDrag, isBack,
}: Props) {
  // El front card siempre gestiona su propia posición — arranca en 0
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  function handleDrag() {
    onDrag?.(x.get())
  }

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    onDrag?.(x.get())
    if (info.offset.x < -80) {
      animate(x, -400, { duration: 0.3 }).then(onSwipeLeft)
    } else if (info.offset.x > 80) {
      animate(x, 400, { duration: 0.3 }).then(onSwipeRight)
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 })
    }
  }

  const cardContent = (
    <>
      <div className="card-header">
        <h2 className="card-name">{animal.name}</h2>
      </div>
      <div className="card-data-wrapper">
        <div className="card-data">
          <div className="card-image-wrapper" onPointerDown={e => e.stopPropagation()}>
            <div className="card-image">
              {animal.image
                ? <img src={animal.image} alt={animal.name} className="card-photo" />
                : <span className="card-emoji">{animal.emoji}</span>
              }
            </div>
            <div className="card-domains">
              {animal.domains.map(d => (
                <span key={d} className="card-domain-tag">{d}</span>
              ))}
            </div>
          </div>
          <div className="slaughter-section-title">Datos básicos</div>
          <div className="card-stat">
            <span className="card-stat-label">Vida en libertad</span>
            <span className="card-stat-value">{animal.lifeExpectancy.value}</span>
          </div>
          <div className="card-stat">
            <span className="card-stat-label">Edad de muerte</span>
            <span className="card-stat-value">{animal.ageAtKill.value}</span>
          </div>
          <div className="card-stat">
            <span className="card-stat-label">{animal.gender === 'f' ? 'Matadas' : 'Matados'} cada año en el mundo</span>
            <span className="card-stat-value">~{(animal.annualKillsWorldwide / 1e6).toLocaleString('es-ES', { maximumFractionDigits: 0 })} millones</span>
          </div>
          <LifespanBar
            maxYears={animal.lifeExpectancy.maxYears}
            killYears={animal.ageAtKill.years}
          />
          <SlaughterCounter annualKills={animal.annualKillsWorldwide} />
          <hr className="card-data-divider" />
          <div className="slaughter-section-title">Formas "humanas" de matar a este animal</div>
          {animal.slaughterMethods.map((sm, i) => (
            <div key={i} className="slaughter-method">
              <div className="slaughter-method-name">{sm.method}</div>
              {sm.description && <div className="slaughter-method-desc">{sm.description}</div>}
              {sm.legalBasis && <div className="slaughter-method-legal">{sm.legalBasis}</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  )

  if (isBack) {
    return (
      <motion.div className="card card--back">
        {cardContent}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="card"
      style={{ x, rotate, opacity, zIndex: 3 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      {cardContent}
    </motion.div>
  )
}
