import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { Animal } from '../types'
import LifespanBar from './LifespanBar'
import SlaughterCounter from './SlaughterCounter'
import YoutubeEmbed from './YoutubeEmbed'

interface Props {
  animal: Animal
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onDrag?: (x: number) => void
  isBack?: boolean
  showHint?: boolean
  hintDelay?: number
  onHintShown?: () => void
}

export default function AnimalCard({
  animal, onSwipeLeft, onSwipeRight, onDrag, isBack, showHint, hintDelay = 800, onHintShown,
}: Props) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  useEffect(() => {
    if (!showHint) return
    onHintShown?.()
    const timer = setTimeout(() => {
      animate(x, -55, { duration: 0.4, ease: 'easeOut' }).then(() =>
        animate(x, 0, { type: 'spring', stiffness: 200, damping: 18 })
      )
    }, hintDelay)
    return () => clearTimeout(timer)
  }, [])

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
      <div className="card-data-wrapper">
        <div className="card-data">
          <div className="card-image-wrapper" onPointerDown={e => e.stopPropagation()}>
            <div className="card-image">
              {animal.image
                ? <img src={animal.image} alt={animal.name} className="card-photo" />
                : <span className="card-emoji">{animal.emoji}</span>
              }
            </div>
            <div className="card-image-overlay">
              <div className="card-name-row">
                <h2 className="card-name">{animal.name}</h2>
                {!isBack && (
                  <button
                    className="card-share-btn"
                    onPointerDown={e => e.stopPropagation()}
                    onClick={e => {
                      e.stopPropagation()
                      navigator.share?.({
                        title: `${animal.name} — Animal Facts`,
                        url: 'https://animal-facts.vercel.app',
                      })
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="slaughter-section-title">Datos básicos</div>
          <div className="card-stats">
            <div className="card-stat">
              <span className="card-stat-label">Vida en libertad</span>
              <span className="card-stat-value">{animal.lifeExpectancy.value}</span>
            </div>
            <div className="card-stat">
              <span className="card-stat-label">Edad al sacrificio</span>
              <span className="card-stat-value">{animal.ageAtKill.value}</span>
            </div>
            <div className="card-stat">
              <span className="card-stat-label">{animal.gender === 'f' ? 'Sacrificadas' : 'Sacrificados'} cada año</span>
              <span className="card-stat-value">~{(animal.annualKillsWorldwide / 1e6).toLocaleString('es-ES', { maximumFractionDigits: 0 })} millones</span>
            </div>
          <SlaughterCounter annualKills={animal.annualKillsWorldwide} gender={animal.gender} />
          </div>
          <LifespanBar
            maxYears={animal.lifeExpectancy.maxYears}
            killYears={animal.ageAtKill.years}
          />
          <div className="slaughter-section-title">Formas "humanas" de matar a este animal</div>
          {animal.slaughterMethods.map((sm, i) => (
            <div key={i} className="slaughter-method">
              <div className="slaughter-method-name">{sm.method}</div>
              {sm.description && <div className="slaughter-method-desc">{sm.description}</div>}
              {sm.legalBasis && <div className="slaughter-method-legal">{sm.legalBasis}</div>}
              {sm.video && <YoutubeEmbed youtubeId={sm.video.youtubeId} start={sm.video.start} end={sm.video.end} />}
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
