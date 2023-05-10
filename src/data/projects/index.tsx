import React from 'react'

export interface ProjectProps {
  title: string
  year: string | number
  scope: string
  organisation: string
  url: string
  description: React.ReactFragment | string
  asset: string
  alt: string
}

export interface ProjectObject {
  key: string
  pathname: string
  project: ProjectProps
}

export const PROJECTS: {
  [key: string]: ProjectObject
} = {
  artball: {
    key: 'artball',
    pathname: 'artball',
    project: {
      title: 'AO ArtBall',
      year: '2022 - 2023',
      scope: 'NFT Art Project',
      organisation: 'Tennis Australia / RIW / Pellar',
      url: 'https://ao.artball.io/',
      description: 'NFT ArtBall Description',
      asset: './images/projects/artball.jpg',
      alt: 'artball',
    },
  },
  layers: {
    key: 'vhils',
    pathname: 'vhils',
    project: {
      title: 'LAYERS by Vhils',
      year: '2022 - 2023',
      scope: 'NFT Art Project',
      organisation: 'DRP / Vhils',
      url: 'https://drp.io/drops/vhils',
      description: 'Evolving Grafitti NFT Artwork',
      asset: './images/projects/vhils.jpg',
      alt: 'vhils',
    },
  },
  shintaro: {
    key: 'shintaro',
    pathname: 'shintaro',
    project: {
      title: 'Shintaro Kago',
      year: '2021 - 2023',
      scope: 'NFT Art Project',
      organisation: 'Shintaro Kago / DRP / Pellar',
      url: 'https://drp.io/artists/shintaro_kago',
      description: 'NFT Art Project with Ero-guro legend Shintaro Kago',
      asset: './images/projects/shintarokago.jpg',
      alt: 'shintaro',
    },
  },
  binkingz: {
    key: 'binkingz',
    pathname: 'binkingz',
    project: {
      title: 'BinKingz',
      year: '2022',
      scope: 'NFT Artwork',
      organisation: 'Scott Marsh / RIW / Pellar',
      url: 'https://ao.artball.io/',
      description: 'NFT Grafitti Art by Sydney based artist Scott Marsh',
      asset: './images/projects/binkingz.jpg',
      alt: 'binkingz',
    },
  },
  redvillage: {
    key: 'redvillage',
    pathname: 'redvillage',
    project: {
      title: 'The Red Village',
      year: '2022 - Present',
      scope: 'NFT Turn-Based Battle Arena',
      organisation: 'Big Kid Studios / Pellar',
      url: 'https://theredvillage.com/',
      description: 'Turn Based Battle Arena Game with Unique Characters',
      asset: './images/projects/redvillage.jpg',
      alt: 'redvillage',
    },
  },
  lushsux: {
    key: 'lushsux',
    pathname: 'lushsux',
    project: {
      title: 'Lushsux',
      year: '2021',
      scope: 'NFT ArtWork',
      organisation: 'Lushsux / DRP / Pellar',
      url: 'https://drp.io/drops/lushsux',
      description: 'NFT Artwork turning his instagram posts into NFT\'s',
      asset: './images/projects/lushsux.jpg',
      alt: 'lushsux',
    },
  },
  adot: {
    key: 'adot',
    pathname: 'adot',
    project: {
      title: 'ADOTMarketplace',
      year: '2022 - Present',
      scope: 'NFT Community Hub',
      organisation: 'T&B Global Media / Translucia / Pellar',
      url: 'https://ao.artball.io/',
      description:
        'NFT Community Hub that focuses around using Tokens to participate in activities like voting, staking and purchasing NFT\'s',
      asset: './images/projects/adotmarketplace.jpg',
      alt: 'adot',
    },
  },
  crown: {
    key: 'crown',
    pathname: 'crowntoken',
    project: {
      title: 'Crown Token',
      year: '2022 - Present',
      scope: 'NFT Community Hub',
      organisation: 'T&B Global Media / Translucia / Pellar',
      url: 'https://ao.artball.io/',
      description:
        'ERC20 Token created with utility in mind for the ADOTMarketplace community',
      asset: './images/projects/crowntoken.jpg',
      alt: 'crown',
    },
  },
}
