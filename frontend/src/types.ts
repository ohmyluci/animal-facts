export interface Animal {
  id: string
  name: string
  namePlural: string
  gender: 'm' | 'f'
  emoji: string
  image?: string
  domains: string[]
  annualKillsWorldwide: number
  lifeExpectancy: {
    value: string
    maxYears: number
    source: Source
    verified: boolean
  }
  ageAtKill: {
    value: string
    years: number
    context: string
    source: Source
    verified: boolean
  }
  slaughterMethods: SlaughterMethod[]
  facts: Fact[]
  media: Media[]
}

export interface SlaughterMethod {
  method: string
  legalBasis?: string
  scope?: string
  description?: string
  video?: { youtubeId: string; start?: number; end?: number }
  source?: Source
  verified?: boolean
}

export interface Fact {
  statement: string
  value?: string | null
  source?: Source
  scope?: string
  verified?: boolean
}

export interface Media {
  type: string
  platform?: string
  title?: string
  url?: string
  verified?: boolean
}

export interface Source {
  name: string
  url?: string
  accessedDate?: string
}
