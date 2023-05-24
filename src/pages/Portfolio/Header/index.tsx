import styles from './Header.module.scss'
import React from 'react'
import classNames from 'classnames'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import onigiriSVG from '../../../assets/icons/onigiri.svg'
import walletDisconnectedSVG from '../../../assets/icons/wallet-disconnected.svg'

import { PORTFOLIO_SECTIONS } from '../../../shared/sections'
import { map, delay } from 'lodash'
import { SectionNavInterface } from '../../../shared/types/nav'
import { Button, OnClickAnimation } from '../../../shared/components'
import { useSelector, useDispatch } from 'react-redux'
import { getPortfolioSectionSelector } from '../../../store/portfolio/selectors'
import { setPortfolioCurrentSection } from '../../../store/portfolio/action'

import menuSVG from '../../../assets/icons/menu-slanted.svg'
import crossSVG from '../../../assets/icons/cross.svg'
import { AppContext } from '../../../App'
import { PortfolioContext } from '..'

interface PortfolioHeaderProps {
  className?: string
}

export const PortfolioHeader: React.FunctionComponent<PortfolioHeaderProps> = ({
  className,
}) => {
  const dispatch = useDispatch()
  const currentSection = useSelector(getPortfolioSectionSelector)

  const mobileHeaderMatcher = window.matchMedia('(max-width: 1000px)')

  const { scrollDirection } = React.useContext(AppContext)
  const { scrollToSection } = React.useContext(PortfolioContext)

  // toggle button state
  const [active, setActive] = React.useState<boolean>(false)
  const [animating, setAnimating] = React.useState<boolean>(false)

  // mobile menu active
  const [mobileHeaderActive, setMobileHeaderActive] =
    React.useState<boolean>(false)
  const [desktopHeaderHover, setDesktopHeaderHover] =
    React.useState<boolean>(false)

  const headerResizeHandler = () => {
    // resize active
    if (mobileHeaderMatcher.matches && !mobileHeaderActive) {
      setMobileHeaderActive(true)
      setActive(false)
    }
    // resize inactive
    if (!mobileHeaderMatcher.matches && mobileHeaderActive) {
      setMobileHeaderActive(false)
      setActive(false)
    }
  }

  React.useEffect(() => {
    headerResizeHandler()
    window.addEventListener('resize', headerResizeHandler)
    return () => {
      window.removeEventListener('resize', headerResizeHandler)
    }
  }, [mobileHeaderMatcher, mobileHeaderActive])

  // classes
  const regularClasses = classNames(
    styles.header,
    'down' === scrollDirection && !desktopHeaderHover && styles.hidden,
    mobileHeaderActive && styles.disabled,
    className
  )
  const mobileClasses = classNames(
    styles.mobileHeader,
    active && styles.active,
    !mobileHeaderActive && styles.disabled,
    className
  )
  const toggleMenuClasses = classNames(
    styles.toggle,
    active && styles.active,
    animating && styles.animating,
    !mobileHeaderActive && styles.disabled
  )

  // toggle animation for menu
  const handleToggleAnimation = () => {
    if (animating) return
    setAnimating(true)
    setActive(!active)

    delay(() => {
      setAnimating(false)
    }, 600)
  }

  // change sections
  const handleChangeSection = (key: string) => {
    scrollToSection(key)
    setActive(false)
    dispatch(setPortfolioCurrentSection(key))
  }

  const handleDesktopMouseHoverEnter = () => {
    if (mobileHeaderActive) return
    if ('down' === scrollDirection) {
      setDesktopHeaderHover(true)
    }
  }

  const handleDesktopMouseHoverLeave = () => {
    if (mobileHeaderActive) return
    setDesktopHeaderHover(false)
  }

  return (
    <>
      <header
        className={regularClasses}
        onMouseEnter={() => handleDesktopMouseHoverEnter()}
        onMouseLeave={() => handleDesktopMouseHoverLeave()}
      >
        <div className={styles.container}>
          <div className={styles.icon}>
            <OnClickAnimation
              className={styles.img}
              animation={{
                animatingClass: styles.animating,
                duration: 1000,
              }}
            >
              <LazyLoadImage
                src={onigiriSVG}
                alt='onigiri'
              />
            </OnClickAnimation>
          </div>

          <div className={styles.sections}>
            {map(
              PORTFOLIO_SECTIONS,
              (section: SectionNavInterface, idx: number) => {
                return (
                  <span
                    className={classNames(
                      styles.section,
                      styles.selectable,
                      currentSection === section.key && styles.highlight
                    )}
                    onClick={() => handleChangeSection(section.key)}
                    key={idx}
                  >
                    {section.title}
                  </span>
                )
              }
            )}
          </div>
          {/* web3 in future */}

          {/* <div className={styles.wallet}>
            <Button className={styles.button}>Connect Wallet</Button>
          </div> */}
        </div>
      </header>
      {/* mobile section menu toggle */}

      <div
        className={toggleMenuClasses}
        onClick={() => handleToggleAnimation()}
      >
        <img
          className={classNames(styles.icon, styles.open)}
          src={menuSVG}
          alt='menu'
        />
        <img
          className={classNames(styles.icon, styles.close)}
          src={crossSVG}
          alt='cross'
        />
      </div>
      {/* mobile section */}
      <div className={mobileClasses}>
        <div className={styles.container}>
          <div className={styles.body}>
            <div className={styles.icon}>
              <LazyLoadImage
                src={onigiriSVG}
                alt='onigiri'
              />
            </div>

            <div className={styles.sections}>
              {map(
                PORTFOLIO_SECTIONS,
                (section: SectionNavInterface, idx: number) => {
                  return (
                    <span
                      className={classNames(
                        styles.section,
                        styles.selectable,
                        currentSection === section.key && styles.highlight
                      )}
                      onClick={() => handleChangeSection(section.key)}
                      key={idx}
                    >
                      {section.title}
                    </span>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
