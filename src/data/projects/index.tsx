import React from 'react'
import { CONSTANTS } from '../../shared'
import { ContractType, NetworkType } from '../../ethereum/utils'
import { BodyContentProps } from '../../pages/Projects/types'
import { BODY_CONTENT_BINKINGZ } from '../../pages/Projects/ProjectContent/BinKingz/content'
import { BINKINGZ_CONTRACT_ADDRESS } from '../../contracts'

const { projectImageRoot } = CONSTANTS

export type ProjectType = ContractType | string
export interface ProjectObject {
  key: string
  pathname: string
  title: string
  type: ProjectType
  year: string | number
  scope: string
  role: string[]
  responsibilities: string[]
  organisation: string
  url: string
  description: React.ReactFragment | string
  asset: string
  alt: string

  // site props
  body?: BodyContentProps[]
  eth?: {
    network?: NetworkType
    address: string
    opensea?: string
  }
}

// TO DO: look into possible better serialisation
export const PROJECTS: {
  [key: string]: ProjectObject
} = {
  artball: {
    key: 'artball',
    pathname: 'artball',
    title: 'AO ArtBall',
    type: 'ERC721',
    year: '2022 - 2023',
    scope: 'NFT Art Project',
    role: ['Lead Engineer', 'Project Manager', 'Front-end Lead'],
    responsibilities: [
      'Asset Assembley & Scripting',
      'Linking/Updating Assets with Live Data',
      'Website Building (AO23)',
      'Project Maintenance During Event',
      'API Integrations',
      'Quality Control & Assurance',
      'CI/CD',
    ],
    organisation: 'Tennis Australia / RIW / Pellar',
    url: 'https://ao.artball.io/',
    description:
      'NFT Project that links live tennis match data to randomly generated tennis artballs on the Ethereum Blockchain. Done in collaboration with Tennis Australia.',
    asset: `${projectImageRoot}/artball/artball.jpg`,
    alt: 'artball',
  },
  layers: {
    key: 'vhils',
    pathname: 'vhils',
    title: 'LAYERS by Vhils',
    type: 'multi',
    year: '2022 - 2023',
    scope: 'NFT Art Project',
    role: [
      'Lead Developer',
      'Lead Asset Engineer',
      'Project Manager',
      'Deployment',
    ],
    responsibilities: [
      'Asset Generation & Assembley',
      'Website Building',
      'Project Management',
      'Project Maintenance',
      'CI/CD',
    ],
    organisation: 'DRP / Vhils',
    url: 'https://drp.io/drops/vhils',
    description: 'Evolving Grafitti NFT Artwork',
    asset: `${projectImageRoot}/vhils/vhils.jpg`,
    alt: 'vhils',
  },
  shintaro: {
    key: 'shintaro',
    pathname: 'shintaro',
    title: 'Shintaro Kago',
    year: '2021 - 2023',
    type: 'multi',
    scope: 'NFT Art Project',
    role: [
      'Project Manager',
      'Front-end Lead',
      'Asset Management',
      'Deployment',
    ],
    responsibilities: ['Asset Generation & Assembley'],
    organisation: 'Shintaro Kago / DRP / Pellar',
    url: 'https://drp.io/artists/shintaro_kago',
    description: 'NFT Art Project with Ero-guro legend Shintaro Kago',
    asset: `${projectImageRoot}/shintaro/shintarokago.jpg`,
    alt: 'shintaro',
  },
  binkingz: {
    key: 'binkingz',
    pathname: 'binkingz',
    title: 'BinKingz',
    type: 'ERC721',
    year: '2022',
    scope: 'NFT Artwork',
    role: ['Project Manager', 'Front-end Lead'],
    responsibilities: ['Asset Engineer', 'Front-end Lead'],
    organisation: 'Scott Marsh / Visual Tonic / RIW / Pellar',
    url: 'https://binkingz.com/',
    description:
      'NFT Grafitti Artwork Project by Sydney based grafitti artist Scott Marsh',
    asset: `${projectImageRoot}//binkingz/binkingz.jpg`,
    alt: 'binkingz',
    body: BODY_CONTENT_BINKINGZ,
    eth: {
      address: BINKINGZ_CONTRACT_ADDRESS,
      opensea: 'https://opensea.io/collection/binkingz',
    },
  },
  redvillage: {
    key: 'redvillage',
    pathname: 'redvillage',
    title: 'The Red Village',
    type: 'ERC721',
    year: '2022 - Present',
    scope: 'NFT Turn-Based Battle Arena',
    role: [
      'Front-end Developer',
      'Project Manager',
      'Asset Handling',
      'Deployment',
    ],
    responsibilities: [],
    organisation: 'Big Kid Studios / Pellar',
    url: 'https://theredvillage.com/',
    description: 'Turn Based Battle Arena Game with Unique Characters',
    asset: `${projectImageRoot}//redvillage/redvillage.jpg`,
    alt: 'redvillage',
  },
  lushsux: {
    key: 'lushsux',
    pathname: 'lushsux',
    title: 'LushSux.io',
    type: 'ERC721',
    year: '2021',
    scope: 'NFT Artwork',
    role: ['Lead Asset Engineer', 'Asset Deployment'],
    responsibilities: [
      'Data Crawling',
      'Asset Generation',
      'Asset Assembley',
      'Asset Deployment',
    ],
    organisation: 'Lushsux / DRP / Pellar',
    url: 'https://drp.io/drops/lushsux',
    description:
      'Melbourne based street artist Lushsux creating a collection out of his instragram posts.',
    asset: `${projectImageRoot}/lushsux/lushsux.jpg`,
    alt: 'lushsux',
  },
  adot: {
    key: 'adot',
    pathname: 'adot',
    title: 'ADOTMarketplace',
    year: '2022 - Present',
    type: 'ERC20',
    scope: 'NFT Community Hub',
    role: ['Associate Project Manager', 'Associate Developer', 'Deployment'],
    responsibilities: [],
    organisation: 'T&B Global Media / Translucia / Pellar',
    url: 'https://adotmarketplace.io/',
    description:
      'NFT Community Hub that focuses around using Tokens to participate in activities like voting, staking and purchasing NFT\'s',
    asset: `${projectImageRoot}/adot/adotmarketplace.jpg`,
    alt: 'adot',
  },
  crown: {
    key: 'crown',
    pathname: 'crowntoken',
    title: 'Crown Token',
    type: 'ERC20',
    year: '2022 - Present',
    scope: 'NFT Community Hub',
    role: ['Associate Project Manager', 'Associate Developer', 'Deployment'],
    responsibilities: [],
    organisation: 'T&B Global Media / Translucia / Pellar',
    url: 'https://crowntoken.io/',
    description:
      'ERC20 Token created with utility in mind for the ADOTMarketplace community',
    asset: `${projectImageRoot}/crown/crowntoken.jpg`,
    alt: 'crown',
  },
}
