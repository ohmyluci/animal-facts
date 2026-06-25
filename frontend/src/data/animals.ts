import type { Animal } from '../types'
import polloEngorde from '../../../data/animals/pollo-engorde.json'
import gallinaPonedora from '../../../data/animals/gallina-ponedora.json'
import pollitoChacho from '../../../data/animals/pollito-macho.json'
import cerdoEngorde from '../../../data/animals/cerdo-engorde.json'

const animals: Animal[] = [
  polloEngorde as Animal,
  gallinaPonedora as Animal,
  pollitoChacho as Animal,
  cerdoEngorde as Animal,
]

export default animals
