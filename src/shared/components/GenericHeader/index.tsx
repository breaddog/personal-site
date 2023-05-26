import styles from './GenericHeader.module.scss'
import React from 'react'
import classNames from 'classnames'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import { map } from 'lodash'
import { SectionNavInterface } from '../../types/nav'
import { Button, OnClickAnimation } from '..'

import menuSVG from '../../../assets/icons/menu-slanted.svg'
import crossSVG from '../../../assets/icons/cross.svg'
import { AppContext } from '../../../App'
import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../routes'

interface GenericHeaderProps {
  className?: string
  mobile: {
    // is a mobile size needed?
    flexActive?: boolean
    flexSize?: number
  }
  icon: {
    src: string
    alt: string
  }
  sections?: {
    [key: string]: SectionNavInterface
  }
  // eslint-disable-next-line
  onSectionChange?: (key: string) => void
  currentSection?: string | null
}

// generalised for any page
export const GenericHeader: React.FunctionComponent<GenericHeaderProps> = ({
  className,
  icon,
  sections,
  mobile,
  currentSection = null,
  onSectionChange = () => {},
}) => {
  const { flexActive = true, flexSize = 1080 } = mobile

  const mobileHeaderMatcher = window.matchMedia(`(max-width: ${flexSize}px)`)

  const { scrollDirection, web3ModalActive, setWeb3ModalActive } =
    React.useContext(AppContext)
  const { account } = useWeb3React()

  // toggle button state
  const [active, setActive] = React.useState<boolean>(false)

  // mobile menu active
  const [mobileHeaderActive, setMobileHeaderActive] =
    React.useState<boolean>(false)
  const [desktopHeaderHover, setDesktopHeaderHover] =
    React.useState<boolean>(false)

  // resize if mobile size is required
  const headerResizeHandler = () => {
    // resize active
    if (!flexActive) return
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
    if (!flexActive) return
    headerResizeHandler()
    window.addEventListener('resize', headerResizeHandler)

    return () => {
      if (!flexActive) return
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

  // hover over effect
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
          <OnClickAnimation
            className={styles.icon}
            animation={{
              animatingClass: styles.animating,
              duration: 1000,
            }}
          >
            <Link to={ROUTES.home.pathname}>
              <LazyLoadImage
                src={icon.src}
                alt={icon.alt}
              />
            </Link>
          </OnClickAnimation>
          <div className={styles.sections}>
            {map(sections, (section: SectionNavInterface, idx: number) => {
              return (
                <span
                  className={classNames(
                    styles.section,
                    styles.selectable,
                    'effect--hoverPop',
                    currentSection === section.key && styles.highlight
                  )}
                  onClick={() => onSectionChange(section.key)}
                  key={idx}
                >
                  {section.title}
                </span>
              )
            })}
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
                src={icon.src}
                alt={icon.alt}
              />
            </OnClickAnimation>
            <div className={styles.sections}>
              {map(sections, (section: SectionNavInterface, idx: number) => {
                return (
                  <span
                    className={classNames(
                      styles.section,
                      styles.selectable,
                      'effect--hoverPop',
                      currentSection === section.key && styles.highlight
                    )}
                    onClick={() => onSectionChange(section.key)}
                    key={idx}
                  >
                    {section.title}
                  </span>
                )
              })}
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
