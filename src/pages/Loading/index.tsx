import styles from './Loading.module.scss'
import sectionStyles from '../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'
import { ScrollTrigger } from 'gsap/all'

import { LOADING_TEXT } from './LoadingText'

import { map } from 'lodash'
import onigiriSVG from '../../assets/icons/onigiri.svg'
import { delay, disableScroll, enableScroll, getRandomInt } from '../../shared/'
import { LoadingDots } from '../../shared/components'
import { AppContext } from '../../App'

interface LoadingSectionProps {
  className?: string
}

export const LoadingSection: React.FunctionComponent<LoadingSectionProps> = ({
  className,
}) => {
  // if changed, also change in scss
  const ONIGIRI_AMOUNT = 14
  // active or not (can be toggled)
  const [active, setActive] = React.useState<boolean>(false)
  const [amountLoaded, setAmountLoaded] = React.useState<number>(100)
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [selectedFlavourIndex, setSelectedFlavourIndex] =
    React.useState<number>(-1)

  const { scrollEnabled, setScrollEnabled } = React.useContext(AppContext)

  // toggle text
  const setNewFlavourText = () => {
    const _nText = LOADING_TEXT.length
    const _randomIndex = getRandomInt(0, _nText)
    setSelectedFlavourIndex(_randomIndex)
  }

  // main toggle
  const setLoadingActive = (_activeState: boolean) => {
    setActive(_activeState)
    // if new state is active (i.e. loading), disable scroll otherwise enable
    if (_activeState) {
      setScrollEnabled(false)
      disableScroll()
    } else {
      setScrollEnabled(true)
      enableScroll()
    }
  }

  // call to reset loading sequence
  const resetLoadingPage = () => {
    setLoadingActive(true)
    setAmountLoaded(0)
    setNewFlavourText()
  }

  // compelted sequence
  const loadingCompletedSequence = async () => {
    setLoadingActive(false)
    await delay(1000)
    // very important to call this
    ScrollTrigger.refresh()
  }

  // initial load
  React.useEffect(() => {
    const initialLoad = () => {
      if (0 > selectedFlavourIndex) {
        setNewFlavourText()
        setLoaded(true)
      }
    }
    active && disableScroll()
    window.addEventListener('load', initialLoad)
    return () => {
      window.removeEventListener('load', initialLoad)
    }
  }, [selectedFlavourIndex, active])

  // percentage check
  React.useEffect(() => {
    if (100 <= amountLoaded) {
      loadingCompletedSequence()
    }
  }, [active, amountLoaded])

  // scroll toggle
  React.useEffect(() => {
    // if active and can still scroll, set to be in proper state
    if (loaded) {
      if (active && scrollEnabled) {
        setLoadingActive(true)
      }
      // otherwise the vice versa is set
      if (!active && !scrollEnabled) {
        setLoadingActive(false)
      }
    }
  }, [active, scrollEnabled, loaded])

  const classes = classNames(
    'section__loading position--relative',
    active && styles.active,
    sectionStyles.section,
    styles.loading,
    className
  )

  return (
    <LoadingContext.Provider
      value={{
        active,
        loaded,
        amountLoaded,
        setLoadingActive,
        setLoaded,
        setAmountLoaded,
        setNewFlavourText,
        resetLoadingPage,
      }}
    >
      <section className={classes}>
        <div className={styles.body}>
          <div className={styles.carousel}>
            <div className={styles.carouselTrack}>
              {map([...Array(ONIGIRI_AMOUNT).keys()], (_, idx: number) => {
                return (
                  <div
                    className={styles.carouselSlide}
                    key={idx}
                  >
                    <img
                      className={styles.onigiri}
                      src={onigiriSVG}
                      alt='onigiri'
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={classNames(styles.text, styles.percentage)}>
              {String(amountLoaded).padStart(3, '0')}
            </div>
            <div className={styles.loadingBar}>
              <div
                className={styles.loader}
                style={{
                  width: `${amountLoaded}%`,
                }}
              ></div>
            </div>
            <LoadingDots
              className={classNames(styles.text, styles.loadingDots)}
              text={
                0 <= selectedFlavourIndex
                  ? LOADING_TEXT[selectedFlavourIndex]
                  : 'Loading'
              }
            />
          </div>
        </div>
      </section>
    </LoadingContext.Provider>
  )
}

interface LoadingContextProps {
  active: boolean
  loaded: boolean
  amountLoaded: number
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
  setAmountLoaded: React.Dispatch<React.SetStateAction<number>>
  setLoadingActive: Function
  setNewFlavourText: Function
  resetLoadingPage: Function
}

export const LoadingContext = React.createContext<LoadingContextProps>({
  active: true,
  loaded: false,
  amountLoaded: 0,
  setLoaded: () => {},
  setAmountLoaded: () => {},
  setLoadingActive: () => {},
  setNewFlavourText: () => {},
  resetLoadingPage: () => {},
})
