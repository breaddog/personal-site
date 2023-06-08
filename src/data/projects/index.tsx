import React from 'react'
import { CONSTANTS } from '../../shared'
import { ContractType, NetworkType } from '../../ethereum/utils'
import { BodyContentProps } from '../../pages/Projects/types'
import {
  BINKINGZ_CONTRACT_ADDRESS,
  CROWN_TOKEN_CONTRACT_ADDRESS,
  CROWN_TOKEN_DECIMALS,
  CROWN_TOKEN_SYMBOL,
  LAYERS_CONTRACT_ADDRESS
} from '../../contracts'

import {
  BODY_CONTENT_BINKINGZ,
  BODY_CONTENT_REDVILLAGE,
  BODY_CONTENT_DRP,
  BODY_CONTENT_ADOT
} from '../../pages/Projects/ProjectContent'
import { REDVILLAGE_GENESIS_CONTRACT_ADDRESS } from '../../contracts/RedVillage'

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
    decimals?: number
    symbol?: string
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
  drp: {
    key: 'drp',
    pathname: 'drp',
    title: 'DRP Gallery',
    type: 'partnership',
    year: '2021 - 2023',
    scope: 'NFT Art Gallery',
    role: ['Associate Developer', 'Lead Engineer'],
    responsibilities: [
      'Lead Engineer and Developer',
      'Project Manager',
      'Discuss Development Specificiations',
      'Develop Bespoke Websites',
      'Assemble and upload assets',
      'Site Maintenance',
      'Smart Contract Building',
      'Infrastructure Maintenance',
    ],
    organisation: 'DRP / Pellar',
    url: 'https://drp.gallery',
    description: 'Melbourne\'s First NFT focused Art Gallery Organisation',
    asset: `${projectImageRoot}/drp/drp.jpg`,
    alt: 'drp main page',
    body: BODY_CONTENT_DRP,
  },
  layers: {
    key: 'layers',
    pathname: 'layers',
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
      'Lead Engineer',
      'Asset Generation & Assembley',
      'Website Building',
      'Project Management',
      'Project Maintenance',
      'CI/CD',
    ],
    organisation: 'Vhils / DRP / Pellar',
    url: 'https://drp.io/drops/vhils',
    description:
      'Interactive Billboard styled artwork by Portugese Street Artist Vhils',
    asset: `${projectImageRoot}/layers/layers.png`,
    alt: 'layers',
    eth: {
      address: LAYERS_CONTRACT_ADDRESS,
      opensea: 'https://opensea.io/collection/drp-vhils',
    },
  },
  binkingz: {
    key: 'binkingz',
    pathname: 'binkingz',
    title: 'BinKingz',
    type: 'ERC721',
    year: '2021 - 2022',
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
  // shintaro: {
  //   key: 'shintaro',
  //   pathname: 'shintaro',
  //   title: 'Shintaro Kago',
  //   year: '2021 - 2023',
  //   type: 'multi',
  //   scope: 'NFT Art Project',
  //   role: [
  //     'Project Manager',
  //     'Front-end Lead',
  //     'Asset Management',
  //     'Deployment',
  //   ],
  //   responsibilities: ['Asset Generation & Assembley'],
  //   organisation: 'Shintaro Kago / DRP / Pellar',
  //   url: 'https://drp.io/artists/shintaro_kago',
  //   description: 'NFT Art Project with Ero-guro legend Shintaro Kago',
  //   asset: `${projectImageRoot}/shintaro/shintarokago.png`,
  //   alt: 'shintaro',
  // },
  redvillage: {
    key: 'redvillage',
    pathname: 'redvillage',
    title: 'The Red Village',
    type: 'ERC721',
    year: '2021 - 2023',
    scope: 'NFT Turn-Based Battle Arena',
    role: [
      'Front-end Developer',
      'Project Manager',
      'Asset Handling',
      'Deployment',
    ],
    responsibilities: [
      'Front-end Developer',
      'Lead Engineer',
      'Project Planning and Specifications',
      'Quality Control',
      'Game Integration',
      'Project Management',
      'Asset Deployment',
      'CI/CD',
    ],
    organisation: 'Big Kid Studios / Pellar',
    url: 'https://theredvillage.com/',
    description:
      'A revolutionary Play and Earn Turn Based Dark-Fantasy Battle Arena Game hosted on Polygon.',
    asset: `${projectImageRoot}/redvillage/redvillage.jpg`,
    alt: 'redvillage',
    body: BODY_CONTENT_REDVILLAGE,
    eth: {
      address: REDVILLAGE_GENESIS_CONTRACT_ADDRESS,
      opensea: 'https://opensea.io/collection/theredvillagechampions',
    },
  },
  adot: {
    key: 'adot',
    pathname: 'adot',
    title: 'ADOT Marketplace',
    year: '2022 - 2023',
    type: 'ERC20',
    scope: 'NFT Community Hub',
    role: ['Associate Project Manager', 'Associate Developer', 'Deployment'],
    responsibilities: [
      'Project and Team Management',
      'Lead Engineer',
      'Front-end Lead',
      'Asset Deployment',
      'Client Liaisoning',
    ],
    organisation: 'T&B Global Media / VUCA Digital / Pellar',
    url: 'https://adotmarketplace.io/',
    description:
      'NFT Community Hub that focuses around using Tokens to participate in activities like voting, staking and purchasing NFT\'s',
    asset: `${projectImageRoot}/adot/adotmarketplace.jpg`,
    alt: 'adot',
    body: BODY_CONTENT_ADOT,
    eth: {
      address: CROWN_TOKEN_CONTRACT_ADDRESS,
      decimals: CROWN_TOKEN_DECIMALS,
      symbol: CROWN_TOKEN_SYMBOL,
    },
  },
}
