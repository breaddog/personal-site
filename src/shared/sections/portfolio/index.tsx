import { SectionNavInterface } from '../../types/nav'

// SECTIONS: handle adding key/values here
export const PORTFOLIO_SECTIONS: {
  [key: string]: SectionNavInterface
} = {
  landing: {
    title: 'landing',
    key: 'landing',
  },
  developer: {
    title: 'developer',
    key: 'developer',
  },
  manager: {
    title: 'management',
    key: 'manager',
  },
  // web3: {
  //   title: 'web3',
  //   key: 'web3',
  // },
  journey: {
    title: 'journey',
    key: 'journey',
  },
  highlights: {
    title: 'highlights',
    key: 'highlights',
  },
  contacts: {
    title: 'contact',
    key: 'contact',
  },
}
