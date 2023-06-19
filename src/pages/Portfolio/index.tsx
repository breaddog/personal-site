import './index.scss'
import sectionStyles from '../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'
import AOS from 'aos'

import queryString from 'query-string'
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
import { isWithinRefBoundary, wrapForwardRefAsElementRef } from '../../shared'
import { AppContext } from '../../App'
import { delay } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setPortfolioCurrentSection } from '../../store/portfolio/action'
import { getPortfolioSectionSelector } from '../../store/portfolio/selectors'
import { SectionNavRefInterface } from '../../shared/types'

import { ScrollTrigger } from 'gsap/all'

interface PortfolioProps {
  className?: string
}

export const Portfolio: React.FC<PortfolioProps> = ({ className }) => {
  const dispatch = useDispatch()
  const currentSection = useSelector(getPortfolioSectionSelector)
  const { section } = queryString.parse(location.search)
  const { loadingRef, scrollEnabled } = React.useContext(AppContext)

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

  const MAP_SECTION_REFS_TO_KEYS: {
    [key: string]: SectionNavRefInterface
  } = {
    landing: {
      ref: landingRef,
      key: PORTFOLIO_SECTIONS.landing.key,
    },
    developer: {
      ref: developerRef,
      key: PORTFOLIO_SECTIONS.developer.key,
    },
    manager: {
      ref: managerRef,
      key: PORTFOLIO_SECTIONS.manager.key,
      usePinParent: true,
      heightOffsetPercentage: 0.95,
    },
    web3: {
      ref: web3Ref,
      key: PORTFOLIO_SECTIONS.web3.key,
    },
    journey: {
      ref: journeyRef,
      key: PORTFOLIO_SECTIONS.journey.key,
    },

    highlights: {
      ref: highlightsRef,
      key: PORTFOLIO_SECTIONS.highlights.key,
    },
    contact: {
      ref: contactsRef,
      key: PORTFOLIO_SECTIONS.contacts.key,
    },
  }

  // for scrolling
  const scrollToSection = (key: string) => {
    const _scrollToSection = (
      sectionRef: React.RefObject<GenericForwardRefInterface>
    ) => {
      dispatch(setPortfolioCurrentSection(key))
      sectionRef.current?.element?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
    // FUTURE: find better way to generalise this for any section
    for (const _sectionKey of Object.keys(MAP_SECTION_REFS_TO_KEYS)) {
      const _section = MAP_SECTION_REFS_TO_KEYS[_sectionKey]
      if (_sectionKey === key) {
        _scrollToSection(_section.ref)
        break
      }
    }
  }

  // SCROLL
  const checkScrollBoundaries = () => {
    let scrollY = window.scrollY

    for (const _sectionKey of Object.keys(MAP_SECTION_REFS_TO_KEYS)) {
      const _section = MAP_SECTION_REFS_TO_KEYS[_sectionKey]

      // if within boundary and not set
      // we also determine if pin parent is needed based on stuff
      if (
        isWithinRefBoundary({
          ref: _section.ref.current?.element,
          scrollY,
          usePinParent: _section.usePinParent,
          extraHeight: _section.extraHeight,
          offsetHeightPercentage: _section.heightOffsetPercentage,
        }) &&
        currentSection !== _section.key
      ) {
        dispatch(setPortfolioCurrentSection(_section.key))
        break
      }
    }
  }

  // boundaries
  React.useEffect(() => {
    checkScrollBoundaries()
    window.addEventListener('scroll', checkScrollBoundaries)
    window.addEventListener('load', checkScrollBoundaries)
    return () => {
      window.removeEventListener('scroll', checkScrollBoundaries)
      window.addEventListener('remove', checkScrollBoundaries)
    }
  }, [
    landingRef,
    developerRef,
    managerRef,
    journeyRef,
    web3Ref,
    highlightsRef,
    contactsRef,
    currentSection,
  ])

  // if it was a navigation related thing
  React.useEffect(() => {
    if (section && !loadingRef?.current?.active && scrollEnabled) {
      typeof section === 'string' && delay(() => scrollToSection(section), 100)
    }

    // to fix the weird AOS not loading thing
    // will not trigger if no specific scroll
    if (!section) {
      AOS.refreshHard()
      let scrollY = window.scrollY
      window.scrollTo({ top: scrollY + 1 })
      window.scrollTo({ top: scrollY })
    }
  }, [section, loadingRef, scrollEnabled])

  // FIXES SITE REVISIT ISSUE
  React.useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

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
