import type { Animal } from '../types'
import polloEngorde from '../../../data/animals/pollo-engorde.json'
import gallinaPonedora from '../../../data/animals/gallina-ponedora.json'
import pollitoChacho from '../../../data/animals/pollito-macho.json'
import cerdoEngorde from '../../../data/animals/cerdo-engorde.json'
import vacaLechera from '../../../data/animals/vaca.json'
import conejo from '../../../data/animals/conejo.json'
import cordero from '../../../data/animals/cordero.json'
import pavo from '../../../data/animals/pavo.json'
import salmon from '../../../data/animals/salmon.json'
import ganso from '../../../data/animals/ganso.json'

const animals: Animal[] = [
  polloEngorde as Animal,
  gallinaPonedora as Animal,
  pollitoChacho as Animal,
  cerdoEngorde as Animal,
  vacaLechera as Animal,
  conejo as Animal,
  cordero as Animal,
  pavo as Animal,
  salmon as Animal,
  ganso as Animal,
]

export default animals
