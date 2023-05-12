import React from 'react'
import { CONSTANTS } from '../../shared/constants'

const { projectImageRoot } = CONSTANTS

export interface ProjectObject {
  key: string
  pathname: string
  title: string
  year: string | number
  scope: string
  role: string[]
  organisation: string
  url: string
  description: React.ReactFragment | string
  asset: string
  alt: string
}

export const PROJECTS: {
  [key: string]: ProjectObject
} = {
  artball: {
    key: 'artball',
    pathname: 'artball',
    title: 'AO ArtBall',
    year: '2022 - 2023',
    scope: 'NFT Art Project',
    role: ['Lead Asset Engineer', 'Project Manager', 'Front-end Lead'],
    organisation: 'Tennis Australia / RIW / Pellar',
    url: 'https://ao.artball.io/',
    description: 'NFT ArtBall Description',
    asset: `${projectImageRoot}/artball/artball.jpg`,
    alt: 'artball',
  },
  layers: {
    key: 'vhils',
    pathname: 'vhils',
    title: 'LAYERS by Vhils',
    year: '2022 - 2023',
    scope: 'NFT Art Project',
    role: [
      'Lead Developer',
      'Lead Asset Engineer',
      'Project Manager',
      'Deployment',
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
    scope: 'NFT Art Project',
    role: [
      'Project Manager',
      'Front-end Lead',
      'Asset Management',
      'Deployment',
    ],
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
    year: '2022',
    scope: 'NFT Artwork',
    role: ['Project Manager', 'Front-end Lead'],
    organisation: 'Scott Marsh / RIW / Pellar',
    url: 'https://ao.artball.io/',
    description: 'NFT Grafitti Art by Sydney based artist Scott Marsh',
    asset: `${projectImageRoot}//binkingz/binkingz.jpg`,
    alt: 'binkingz',
  },
  redvillage: {
    key: 'redvillage',
    pathname: 'redvillage',
    title: 'The Red Village',
    year: '2022 - Present',
    scope: 'NFT Turn-Based Battle Arena',
    role: [
      'Front-end Developer',
      'Project Manager',
      'Asset Handling',
      'Deployment',
    ],
    organisation: 'Big Kid Studios / Pellar',
    url: 'https://theredvillage.com/',
    description: 'Turn Based Battle Arena Game with Unique Characters',
    asset: `${projectImageRoot}//redvillage/redvillage.jpg`,
    alt: 'redvillage',
  },
  lushsux: {
    key: 'lushsux',
    pathname: 'lushsux',
    title: 'Lushsux',
    year: '2021',
    scope: 'NFT ArtWork',
    role: ['Lead Asset Engineer', 'Deployment'],
    organisation: 'Lushsux / DRP / Pellar',
    url: 'https://drp.io/drops/lushsux',
    description: 'NFT Artwork turning his instagram posts into NFT\'s',
    asset: `${projectImageRoot}/lushsux/lushsux.jpg`,
    alt: 'lushsux',
  },
  adot: {
    key: 'adot',
    pathname: 'adot',
    title: 'ADOTMarketplace',
    year: '2022 - Present',
    scope: 'NFT Community Hub',
    role: ['Associate Project Manager', 'Associate Developer', 'Deployment'],
    organisation: 'T&B Global Media / Translucia / Pellar',
    url: 'https://ao.artball.io/',
    description:
      'NFT Community Hub that focuses around using Tokens to participate in activities like voting, staking and purchasing NFT\'s',
    asset: `${projectImageRoot}/adot/adotmarketplace.jpg`,
    alt: 'adot',
  },
  crown: {
    key: 'crown',
    pathname: 'crowntoken',
    title: 'Crown Token',
    year: '2022 - Present',
    scope: 'NFT Community Hub',
    role: ['Associate Project Manager', 'Associate Developer', 'Deployment'],
    organisation: 'T&B Global Media / Translucia / Pellar',
    url: 'https://ao.artball.io/',
    description:
      'ERC20 Token created with utility in mind for the ADOTMarketplace community',
    asset: `${projectImageRoot}/crown/crowntoken.jpg`,
    alt: 'crown',
  },
}
