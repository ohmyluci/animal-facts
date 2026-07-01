function LeafLargeIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c9 0 13-8 13-15-1.05 1.65-2.07 2.88-4 4z" />
    </svg>
  )
}

export default function AlimentosView() {
  return (
    <div className="alimentos-view">
      <div className="alimentos-empty">
        <LeafLargeIcon />
        <p className="alimentos-empty-title">Alternativas vegetales</p>
        <p className="alimentos-empty-desc">
          Próximamente: encuentra sustitutos plant-based de cualquier producto de origen animal.
        </p>
      </div>
    </div>
  )
}
