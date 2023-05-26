import styles from './Header.module.scss'
import React from 'react'
import classNames from 'classnames'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import onigiriSVG from '../../../assets/icons/onigiri.svg'
import walletDisconnectedSVG from '../../../assets/icons/wallet-disconnected.svg'

import { PORTFOLIO_SECTIONS } from '../../../shared/sections'
import { map } from 'lodash'
import { SectionNavInterface } from '../../../shared/types/nav'
import { Button, OnClickAnimation } from '../../../shared/components'
import { useSelector, useDispatch } from 'react-redux'
import { getPortfolioSectionSelector } from '../../../store/portfolio/selectors'
import { setPortfolioCurrentSection } from '../../../store/portfolio/action'

import menuSVG from '../../../assets/icons/menu-slanted.svg'
import crossSVG from '../../../assets/icons/cross.svg'
import { AppContext } from '../../../App'
import { PortfolioContext } from '..'
import { useWeb3React } from '@web3-react/core'

interface PortfolioHeaderProps {
  className?: string
}

export const PortfolioHeader: React.FunctionComponent<PortfolioHeaderProps> = ({
  className,
}) => {
  const dispatch = useDispatch()
  const currentSection = useSelector(getPortfolioSectionSelector)

  const mobileHeaderMatcher = window.matchMedia('(max-width: 1150px)')

  const { scrollDirection, web3ModalActive, setWeb3ModalActive } =
    React.useContext(AppContext)
  const { scrollToSection } = React.useContext(PortfolioContext)
  const { isActive, account } = useWeb3React()

  // toggle button state
  const [active, setActive] = React.useState<boolean>(false)

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
  {
    /* TO DO: turn this into a serialised object */
  }
  return (
    <>
      <header
        className={regularClasses}
        onMouseEnter={() => handleDesktopMouseHoverEnter()}
        onMouseLeave={() => handleDesktopMouseHoverLeave()}
      >
        <div className={styles.container}>
          <OnClickAnimation
            className={styles.icon}
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
          {/* TO DO: generalise this */}
          <div className={styles.sections}>
            {map(
              PORTFOLIO_SECTIONS,
              (section: SectionNavInterface, idx: number) => {
                return (
                  <span
                    className={classNames(
                      styles.section,
                      styles.selectable,
                      'effect--hoverPop',
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
            <div className={styles.wallet}>
              <Button
                className={classNames(styles.button, 'effects--hoverPop')}
                onClick={() => setWeb3ModalActive(!web3ModalActive)}
              >
                {account ? 'Disconnect Wallet' : 'Connect Wallet'}
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* mobile section menu toggle */}
      <OnClickAnimation
        className={classNames(
          styles.toggle,
          active && styles.active,
          !mobileHeaderActive && styles.disabled
        )}
        animation={{
          animatingClass: styles.animating,
          duration: 400,
          onStart: () => setActive(!active),
        }}
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
      </OnClickAnimation>
      {/* mobile section */}
      <div className={mobileClasses}>
        <div className={styles.container}>
          <div className={styles.body}>
            <OnClickAnimation
              className={styles.icon}
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
            {/* TO DO: generalise this */}
            <div className={styles.sections}>
              {map(
                PORTFOLIO_SECTIONS,
                (section: SectionNavInterface, idx: number) => {
                  return (
                    <span
                      className={classNames(
                        styles.section,
                        styles.selectable,
                        'effect--hoverPop',
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
              <div className={classNames(styles.section, styles.wallet)}>
                <Button
                  className={classNames(styles.button, 'effects--hoverPop')}
                  onClick={() => setWeb3ModalActive(!web3ModalActive)}
                >
                  {account ? 'Disconnect Wallet' : 'Connect Wallet'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
