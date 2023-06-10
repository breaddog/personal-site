import styles from './Loading.module.scss'
import sectionStyles from '../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'
import { ScrollTrigger } from 'gsap/all'

import { LOADING_TEXT } from './LoadingText'

import { delay, map } from 'lodash'
import { disableScroll, enableScroll, getRandomInt } from '../../shared/'
import { Image, LoadingDots } from '../../shared/components'
import { AppContext } from '../../App'

import AOS from 'aos'
import onigiriSVG from '../../assets/icons/onigiri.svg'

export interface LoadingHandle {
  active: boolean
  loaded: boolean
  amountLoaded: number
  assetsToLoad: number
  assetsLoaded: number
  setActive: React.Dispatch<React.SetStateAction<boolean>> | Function
  setLoaded: React.Dispatch<React.SetStateAction<boolean>> | Function
  setAmountLoaded: React.Dispatch<React.SetStateAction<number>> | Function
  setAssetsToLoad: React.Dispatch<React.SetStateAction<number>> | Function
  setAssetsLoaded: React.Dispatch<React.SetStateAction<number>> | Function
  setLoadingActive: Function
  setNewFlavourText: Function
  resetLoadingPage: Function
  incrementAssetsToLoad: Function
  incrementAssetsLoaded: Function
}

interface LoadingSectionProps {
  className?: string
  ref?: React.ForwardedRef<LoadingHandle>
}

export const LoadingSection: React.FunctionComponent<LoadingSectionProps> =
  React.forwardRef<LoadingHandle, LoadingSectionProps>(({ className }, ref) => {
    // if changed, also change in scss
    const ONIGIRI_AMOUNT = 14
    // active or not (can be toggled)
    // DEBUG: toggle all to false
    const [front, setFront] = React.useState<boolean>(true)
    const [active, setActive] = React.useState<boolean>(true)

    const [loaded, setLoaded] = React.useState<boolean>(false)

    // IF LOADING BAR USED
    const [amountLoaded, setAmountLoaded] = React.useState<number>(0)
    const [assetsToLoad, setAssetsToLoad] = React.useState<number>(0)
    const [assetsLoaded, setAssetsLoaded] = React.useState<number>(0)

    // flavour
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
        setFront(true)
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
      // very important to call this
      setActive(false)
      setLoaded(true)

      delay(() => {
        ScrollTrigger.refresh()
        AOS.refreshHard()
      }, 1000)

      // delay on this needed as well
      delay(() => {
        setFront(false)
        setScrollEnabled(true)
        enableScroll()
      }, 1500)
    }

    // FUTURE
    // generic incrementers for assets that require loading
    const incrementAssetsToLoad = () => {
      setAssetsToLoad(assetsToLoad + 1)
    }

    const incrementAssetsLoaded = () => {
      setAssetsLoaded(assetsLoaded + 1)
    }

    const initialLoad = () => {
      setNewFlavourText()
    }
    // initial load
    React.useEffect(() => {
      active && disableScroll()
      setNewFlavourText()
      window.addEventListener('load', initialLoad)
      return () => {
        window.removeEventListener('load', initialLoad)
      }
    }, [selectedFlavourIndex, active])

    // IF PERCENTAGE BAR USED
    // // percentage check
    // React.useEffect(() => {
    //   if (100 <= amountLoaded) {
    //     loadingCompletedSequence()
    //   }
    // }, [active, amountLoaded])

    // if active, then set timer to countdown
    React.useEffect(() => {
      if (active) {
        delay(() => loadingCompletedSequence(), 4000)
      }
    }, [active])

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

    // access content
    React.useImperativeHandle(ref, () => ({
      active,
      loaded,
      amountLoaded,
      assetsLoaded,
      assetsToLoad,
      setActive,
      setLoaded,
      setAmountLoaded,
      setLoadingActive,
      setAssetsLoaded,
      setAssetsToLoad,
      setNewFlavourText,
      resetLoadingPage,
      incrementAssetsLoaded,
      incrementAssetsToLoad,
    }))

    const classes = classNames(
      'section__loading position--relative',
      styles.loading,
      sectionStyles.section,
      styles[active ? 'active' : 'default'],
      front && styles.front,
      className
    )

    return (
      <section className={classes}>
        <div className={styles.body}>
          <div className={styles.carousel}>
            <div
              className={classNames(
                styles.carouselTrack,
                !active && styles.paused
              )}
            >
              {map([...Array(ONIGIRI_AMOUNT).keys()], (_, idx: number) => {
                return (
                  <div
                    className={styles.carouselSlide}
                    key={idx}
                  >
                    <Image
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
            {/* LOADING BAR START */}
            {/* <div className={classNames(styles.text, styles.percentage)}>
              {String(amountLoaded).padStart(3, '0')}
            </div>
            <div className={styles.loadingBar}>
              <div
                className={styles.loader}
                style={{
                  width: `${amountLoaded}%`,
                }}
              ></div>
            </div> */}
            {/* LOADING BAR END */}
            <LoadingDots
              className={classNames(styles.text, styles.loadingDots)}
              text={
                0 <= selectedFlavourIndex
                  ? LOADING_TEXT[selectedFlavourIndex]
                  : 'Loading'
              }
              delay={800}
              active={active}
            />
          </div>
        </div>
      </section>
    )
  })
