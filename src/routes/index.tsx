export interface Path {
  [key: string]: {
    key: string
    pathname: string
  }
}

export const ROUTES: Path = {
  portfolio: {
    key: 'portfolio',
    pathname: '/',
  },
  home: {
    key: 'home',
    pathname: '/',
  },
  artball: {
    key: 'artball',
    pathname: 'artball',
  },
  layers: {
    key: 'vhils',
    pathname: 'vhils',
  },
  shintaro: {
    key: 'shintaro',
    pathname: 'shintaro',
  },
  binkingz: {
    key: 'binkingz',
    pathname: 'binkingz',
  },
  redvillage: {
    key: 'redvillage',
    pathname: 'redvillage',
  },
  lushsux: {
    key: 'lushsux',
    pathname: 'lushsux',
  },
  adot: {
    key: 'adot',
    pathname: 'adot',
  },
  crown: {
    key: 'crown',
    pathname: 'crowntoken',
  },
}
