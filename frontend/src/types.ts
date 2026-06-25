export interface Animal {
  id: string
  name: string
  emoji: string
  domains: string[]
  lifeExpectancy: {
    value: string
    source: Source
    verified: boolean
  }
  ageAtKill: {
    value: string
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
