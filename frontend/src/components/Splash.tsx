import { motion } from 'framer-motion'

interface Props {
  onContinue: () => void
}

export default function Splash({ onContinue }: Props) {
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
          Hay vidas que empiezan y terminan en la oscuridad. No porque la naturaleza lo haya querido así, sino porque nosotros lo hemos permitido. No es que no lo sepamos, es que no queremos verlo.
        </p>
        <button className="splash-btn" onClick={onContinue}>
          Quiero verlo
        </button>
      </div>
    </motion.div>
  )
}
