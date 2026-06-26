import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onContinue: () => void
}

const LINES = [
  { text: 'No es que no lo sepamos...', className: 'splash-line' },
  { text: 'es que no queremos verlo.', className: 'splash-line splash-line--em' },
]

const CHAR_DELAY = 70   // ms per character
const LINE_PAUSE = 400  // pause between lines
const END_PAUSE = 2000  // pause after last line before dismiss

export default function Splash({ onContinue }: Props) {
  const [displayed, setDisplayed] = useState<{ lineIdx: number; charIdx: number }>({ lineIdx: 0, charIdx: 0 })
  const [done, setDone] = useState(false)

  useEffect(() => {
    let lineIdx = 0
    let charIdx = 0
    let timeout: ReturnType<typeof setTimeout>

    function tick() {
      const line = LINES[lineIdx]
      if (charIdx < line.text.length) {
        charIdx++
        setDisplayed({ lineIdx, charIdx })
        timeout = setTimeout(tick, CHAR_DELAY)
      } else if (lineIdx < LINES.length - 1) {
        lineIdx++
        charIdx = 0
        timeout = setTimeout(tick, LINE_PAUSE)
      } else {
        setDone(true)
        timeout = setTimeout(onContinue, END_PAUSE)
      }
    }

    timeout = setTimeout(tick, 400)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <motion.div
      className="splash"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="splash-content">
        <h1 className="splash-title">Animal Facts</h1>
        <div className="splash-lines">
        {LINES.map((line, i) => {
          const isActive = i === displayed.lineIdx
          const isPast = i < displayed.lineIdx
          const visibleText = isPast
            ? line.text
            : isActive
            ? line.text.slice(0, displayed.charIdx)
            : ''
          return (
            <span key={i} className={line.className} style={{ visibility: visibleText ? 'visible' : 'hidden' }}>
              {visibleText || line.text}
              {isActive && !done && <span className="splash-cursor">|</span>}
            </span>
          )
        })}
        </div>
      </div>
    </motion.div>
  )
}
