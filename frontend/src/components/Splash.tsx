import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const FULL_TEXT = 'Hay vidas que empiezan y terminan en la oscuridad. No porque la naturaleza lo haya querido así, sino porque nosotros lo hemos permitido. No es que no lo sepamos, es que no queremos verlo.'
const TYPING_SPEED = 28

interface Props {
  onContinue: () => void
}

export default function Splash({ onContinue }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, TYPING_SPEED)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="splash"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="splash-content">
        <div className="splash-logo">🌿</div>
        <h1 className="splash-title">Animal Facts</h1>
        <p className="splash-message">
          {displayed}
          {!done && <span className="splash-cursor">|</span>}
        </p>
        <motion.button
          className="splash-btn"
          onClick={onContinue}
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          Quiero verlo
        </motion.button>
      </div>
    </motion.div>
  )
}
