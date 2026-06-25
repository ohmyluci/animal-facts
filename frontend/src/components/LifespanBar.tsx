interface Props {
  maxYears: number
  killYears: number
}

export default function LifespanBar({ maxYears, killYears }: Props) {
  const killPct = Math.min((killYears / maxYears) * 100, 100)

  return (
    <div className="lifespan-bar-wrapper">
      <div className="lifespan-bar-labels">
        <span>0</span>
        <span>{maxYears} años</span>
      </div>
      <div className="lifespan-bar">
        <div className="lifespan-bar-fill" style={{ width: `${killPct}%` }} />
        <div className="lifespan-bar-skull" style={{ left: `${killPct}%` }}>
          💀
        </div>
      </div>
      <div className="lifespan-bar-caption">{killPct < 1 ? '<1' : Math.round(killPct)}% de vida vivida</div>
    </div>
  )
}
