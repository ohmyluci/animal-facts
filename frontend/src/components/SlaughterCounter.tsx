import { useState, useEffect, useRef } from 'react'

interface Props {
  annualKills: number
  namePlural: string
  gender: 'm' | 'f'
}

export default function SlaughterCounter({ annualKills, namePlural, gender }: Props) {
  const [count, setCount] = useState(0)
  const perSecond = annualKills / 31_557_600
  const startTime = useRef(Date.now())

  useEffect(() => {
    startTime.current = Date.now()
    setCount(0)
    const id = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000
      setCount(Math.floor(elapsed * perSecond))
    }, 100)
    return () => clearInterval(id)
  }, [annualKills, perSecond])

  return (
    <div className="slaughter-counter">
      <div className="slaughter-counter-label">Muertes desde que abriste esta tarjeta</div>
      <div className="slaughter-counter-value">{count.toLocaleString('es-ES')}</div>
    </div>
  )
}
