export interface Animal {
  id: string
  name: string
  scientificName: string
  lifeExpectancy?: {
    wild?: { range?: string; value?: string }
  }
  domains: Domain[]
}

export interface Domain {
  domain: string
  uses: Use[]
}

export interface Use {
  use: string
  lifeExpectancy?: { wild?: { value?: string; note?: string } }
  slaughter?: {
    typicalAgeAtKill?: { value?: string; context?: string }
    methods?: SlaughterMethod[]
  }
  facts?: Fact[]
  media?: Media[]
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
