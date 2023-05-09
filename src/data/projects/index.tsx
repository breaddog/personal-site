import React from 'react'

export interface ProjectProps {
  title?: string
  year?: string | number
  scope?: string
  organisation?: string
  url?: string
  description?: React.ReactFragment | string
  asset?: string
}

export const PROJECTS: ProjectProps[] = [
  {
    title: 'AO ArtBall',
    year: '2022 - 2023',
    scope: 'NFT Art Project',
    organisation: 'Tennis Australia / RIW / Pellar',
    url: 'https://ao.artball.io/',
    description: 'NFT ArtBall Description',
    asset: './images/projects/artball.jpg',
  },
  {
    title: 'LAYERS by Vhils',
    year: '2022 - 2023',
    scope: 'NFT Art Project',
    organisation: 'DRP / Vhils',
    url: 'https://drp.io/drops/vhils',
    description: 'Evolving Grafitti NFT Artwork',
    asset: './images/projects/vhils.jpg',
  },
  {
    title: 'Shintaro Kago',
    year: '2021 - 2023',
    scope: 'NFT Art Project',
    organisation: 'Shintaro Kago / DRP / Pellar',
    url: 'https://drp.io/artists/shintaro_kago',
    description: 'NFt Art Project with Ero-guro legend Shintaro Kago',
    asset: './images/projects/shintarokago.jpg',
  },
  {
    title: 'Lushsux',
    year: '2021',
    scope: 'NFT ArtWork',
    organisation: 'Lushsux / DRP / Pellar',
    url: 'https://drp.io/drops/lushsux',
    description: 'NFT Artwork turning his instagram posts into NFT\'s',
    asset: './images/projects/lushsux.jpg',
  },
  {
    title: 'BinKingz',
    year: '2022',
    scope: 'NFT Artwork',
    organisation: 'Scott Marsh / RIW / Pellar',
    url: 'https://ao.artball.io/',
    description: 'NFT Grafitti Art by Sydney based artist Scott Marsh',
    asset: './images/projects/binkingz.jpg',
  },
  {
    title: 'The Red Village',
    year: '2022 - Present',
    scope: 'NFT Turn-Based Battle Arena',
    organisation: 'Big Kid Studios / Pellar',
    url: 'https://theredvillage.com/',
    description: 'Turn Based Battle Arena Game with Unique Characters',
    asset: './images/projects/redvillage.jpg',
  },
  {
    title: 'ADOTMarketplace',
    year: '2022 - Present',
    scope: 'NFT Community Hub',
    organisation: 'T&B Global Media / Translucia / Pellar',
    url: 'https://ao.artball.io/',
    description:
      'NFT Community Hub that focuses around using Tokens to participate in activities like voting, staking and purchasing NFT\'s',
    asset: './images/projects/adotmarketplace.jpg',
  },
  {
    title: 'Crown Token',
    year: '2022 - Present',
    scope: 'NFT Community Hub',
    organisation: 'T&B Global Media / Translucia / Pellar',
    url: 'https://ao.artball.io/',
    description:
      'ERC20 Token created with utility in mind for the ADOTMarketplace community',
    asset: './images/projects/crowntoken.jpg',
  },
]
