type Tab = 'animales' | 'alimentos'

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
}

function PawIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="6.5" cy="8.5" r="2.5" />
      <circle cx="12" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="8.5" r="2.5" />
      <ellipse cx="4.5" cy="13.5" rx="1.8" ry="2.2" />
      <ellipse cx="19.5" cy="13.5" rx="1.8" ry="2.2" />
      <path d="M12 11.5c-3.6 0-6.5 2.3-6.5 5.2C5.5 19.4 7.5 21.5 10 21.5h4c2.5 0 4.5-2.1 4.5-4.8 0-2.9-2.9-5.2-6.5-5.2z" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c9 0 13-8 13-15-1.05 1.65-2.07 2.88-4 4z" />
    </svg>
  )
}

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="bottom-nav">
      <button
        className={`bottom-nav-tab${active === 'animales' ? ' active' : ''}`}
        onClick={() => onChange('animales')}
        aria-label="Animales"
      >
        <PawIcon />
        <span>Animales</span>
      </button>
      <button
        className={`bottom-nav-tab${active === 'alimentos' ? ' active' : ''}`}
        onClick={() => onChange('alimentos')}
        aria-label="Alimentos"
      >
        <LeafIcon />
        <span>Alimentos</span>
      </button>
    </nav>
  )
}
