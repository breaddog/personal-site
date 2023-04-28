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
    scope: 'NFT ArtWork',
    organisation: 'Tennis Australia / RIW',
    url: 'https://ao.artball.io/',
    description: 'NFT ArtBall Description',
    asset: './images/projects/suisei-placeholder.png',
  },
  {
    title: 'Test 2',
    year: '2022 - 2023',
    scope: 'NFT ArtWork',
    organisation: 'Tennis Australia / RIW',
    url: 'https://ao.artball.io/',
    description: 'NFT ArtBall Description',
    asset: './images/projects/suisei-placeholder.png',
  },
  {
    title: 'Test 3',
    year: '2022 - 2023',
    scope: 'NFT ArtWork',
    organisation: 'Tennis Australia / RIW',
    url: 'https://ao.artball.io/',
    description: 'NFT ArtBall Description',
    asset: './images/projects/suisei-placeholder.png',
  },
  {
    title: 'Test 4',
    year: '2022 - 2023',
    scope: 'NFT ArtWork',
    organisation: 'Tennis Australia / RIW',
    url: 'https://ao.artball.io/',
    description: 'NFT ArtBall Description',
    asset: './images/projects/suisei-placeholder.png',
  },
  {
    title: 'Test 3',
    year: '2022 - 2023',
    scope: 'NFT ArtWork',
    organisation: 'Tennis Australia / RIW',
    url: 'https://ao.artball.io/',
    description: 'NFT ArtBall Description',
    asset: './images/projects/suisei-placeholder.png',
  },
]
