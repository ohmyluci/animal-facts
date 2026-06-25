import type { Animal } from '../types'

const modules = import.meta.glob('../../data/animals/*.json', { eager: true })

const animals: Animal[] = Object.entries(modules)
  .filter(([path]) => !path.includes('_schema'))
  .map(([, mod]) => (mod as { default: Animal }).default)

export default animals
