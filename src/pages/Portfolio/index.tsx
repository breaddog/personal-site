import './index.scss'
import sectionStyles from '../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { PortfolioHeader } from './Header'

import {
  PortfolioContacts,
  PortfolioJourney,
  PortfolioDeveloper,
  PortfolioHighlights,
  PortfolioLanding,
  PortfolioManagerNew,
  PortfolioWeb3
} from './Sections/index'

import { GenericForwardRefInterface } from '../../shared/interfaces'
import { PORTFOLIO_SECTIONS } from '../../shared/sections'
import { wrapForwardRefAsElementRef } from '../../shared'
import { AppContext } from '../../App'

interface PortfolioProps {
  className?: string
}

export const Portfolio: React.FC<PortfolioProps> = ({ className }) => {
  const { loadingRef } = React.useContext(AppContext)

  // const [loaded, setLoaded] = React.useState<boolean>(false)

  const classes = classNames(
    'section__portfolio position--relative',
    sectionStyles.section,
    !loadingRef?.current?.loaded ? sectionStyles.hidden : '',
    className
  )

  // section refs
  const landingRef = React.useRef<GenericForwardRefInterface>(null)
  const developerRef = React.useRef<GenericForwardRefInterface>(null)
  const managerRef = React.useRef<GenericForwardRefInterface>(null)
  const journeyRef = React.useRef<GenericForwardRefInterface>(null)
  const web3Ref = React.useRef<GenericForwardRefInterface>(null)
  const highlightsRef = React.useRef<GenericForwardRefInterface>(null)
  const contactsRef = React.useRef<GenericForwardRefInterface>(null)

  // for scrolling
  const scrollToSection = (key: string) => {
    const _scrollToSection = (
      sectionRef: React.RefObject<GenericForwardRefInterface>
    ) => {
      sectionRef.current?.element?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
    // TO DO: find better way to generalise this for any section
    switch (key) {
      case PORTFOLIO_SECTIONS.landing.key:
        _scrollToSection(landingRef)
        break
      case PORTFOLIO_SECTIONS.developer.key:
        _scrollToSection(developerRef)
        break
      case PORTFOLIO_SECTIONS.manager.key:
        _scrollToSection(managerRef)
        break
      case PORTFOLIO_SECTIONS.journey.key:
        _scrollToSection(journeyRef)
        break
      case PORTFOLIO_SECTIONS.web3.key:
        _scrollToSection(web3Ref)
        break
      case PORTFOLIO_SECTIONS.highlights.key:
        _scrollToSection(highlightsRef)
        break
      case PORTFOLIO_SECTIONS.contacts.key:
        _scrollToSection(contactsRef)
        break
      default:
        break
    }
  }

  return (
    <PortfolioContext.Provider
      value={{
        landingRef: wrapForwardRefAsElementRef(landingRef),
        developerRef: wrapForwardRefAsElementRef(developerRef),
        managerRef: wrapForwardRefAsElementRef(managerRef),
        journeyRef: wrapForwardRefAsElementRef(journeyRef),
        highlightsRef: wrapForwardRefAsElementRef(highlightsRef),
        contactsRef: wrapForwardRefAsElementRef(contactsRef),
        scrollToSection,
      }}
    >
      <PortfolioHeader />
      <div className={classes}>
        <PortfolioLanding ref={landingRef} />
        <PortfolioDeveloper ref={developerRef} />
        <PortfolioManagerNew ref={managerRef} />
        <PortfolioWeb3 ref={web3Ref} />
        <PortfolioJourney ref={journeyRef} />
        <PortfolioHighlights ref={highlightsRef} />
        <PortfolioContacts ref={contactsRef} />
      </div>
    </PortfolioContext.Provider>
  )
}

interface PortfolioContextProps {
  landingRef?: React.RefObject<
    HTMLDivElement | Element | null | undefined
  > | null
  developerRef?: React.RefObject<
    HTMLDivElement | Element | null | undefined
  > | null
  managerRef?: React.RefObject<
    HTMLDivElement | Element | null | undefined
  > | null
  journeyRef?: React.RefObject<
    HTMLDivElement | Element | null | undefined
  > | null
  highlightsRef?: React.RefObject<
    HTMLDivElement | Element | null | undefined
  > | null
  contactsRef?: React.RefObject<
    HTMLDivElement | Element | null | undefined
  > | null
  scrollToSection: Function
}

export const PortfolioContext = React.createContext<PortfolioContextProps>({
  landingRef: null,
  developerRef: null,
  managerRef: null,
  journeyRef: null,
  highlightsRef: null,
  contactsRef: null,
  scrollToSection: () => {},
})
