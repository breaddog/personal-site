import styles from './GenericHeader.module.scss'
import React from 'react'
import classNames from 'classnames'

import { map } from 'lodash'
import { SectionNavInterface } from '../../types/nav'
import { OnClickAnimation } from '..'

import menuSVG from '../../../assets/icons/menu-slanted.svg'
import crossSVG from '../../../assets/icons/cross.svg'
import { AppContext } from '../../../App'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes'
// import { WalletConnectButton } from '../../../ethereum'
import { toggleScroll } from '../../functions'

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
  closeOnChange?: boolean
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
  closeOnChange = true,
}) => {
  const { flexActive = true, flexSize = 1080 } = mobile
  const {
    // recomment for web3
    // web3ModalActive,
    // setWeb3ModalActive,
    scrollDirection,
  } = React.useContext(AppContext)

  const mobileHeaderMatcher = window.matchMedia(`(max-width: ${flexSize}px)`)

  // toggle button state
  const [active, setActive] = React.useState<boolean>(false)
  // mobile menu active
  const [mobileHeaderActive, setMobileHeaderActive] =
    React.useState<boolean>(false)
  const [desktopHeaderHover, setDesktopHeaderHover] =
    React.useState<boolean>(false)

  const headerRef = React.useRef<HTMLHeadElement>(null)

  // routing stuff
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // resize if mobile size is required
  const headerResizeHandler = () => {
    // resize active
    if (!flexActive) return
    if (mobileHeaderMatcher.matches && !mobileHeaderActive) {
      setMobileHeaderActive(true)
      handleToggleMobileMenu(false)
    }
    // resize inactive
    if (!mobileHeaderMatcher.matches && mobileHeaderActive) {
      setMobileHeaderActive(false)
      handleToggleMobileMenu(false)
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

  // // UNCOMMENT FOR DEBOUNCE VERSION
  // const handleScrollEnd = React.useMemo(
  //   () =>
  //     debounce(() => headerRef.current?.classList.remove(styles.hidden), 600),
  //   []
  // )

  // // end scroll
  // const handleScroll = () => {
  //   headerRef.current?.classList.add(styles.hidden)
  //   handleScrollEnd()
  // }

  // React.useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [headerRef])

  // section change
  const handleSectionChange = (_section: SectionNavInterface) => {
    if (closeOnChange) {
      handleToggleMobileMenu(false)
    }
    const { key, customNavigate } = _section
    if (customNavigate) {
      return customNavigate()
    }
    return onSectionChange(key)
  }

  const handleHomeNavigation = () => {
    if (pathname === ROUTES.home.pathname) {
      window.location.reload()
    } else {
      navigate(ROUTES.home.pathname)
    }
  }

  const handleToggleMobileMenu = (_state: boolean) => {
    setActive(_state)
    toggleScroll(!_state)
  }

  return (
    <>
      <header
        className={regularClasses}
        ref={headerRef}
        onMouseEnter={() => handleDesktopMouseHoverEnter()}
        onMouseLeave={() => handleDesktopMouseHoverLeave()}
      >
        <div className={styles.container}>
          <img
            className='effects--hoverPop'
            onClick={() => handleHomeNavigation()}
            src={icon.src}
            alt={icon.alt}
          />
          <div className={styles.sections}>
            {map(sections, (section: SectionNavInterface, idx: number) => {
              return (
                <span
                  className={classNames(
                    styles.section,
                    styles.selectable,
                    'effects--hoverPop',
                    currentSection === section.key && styles.highlight
                  )}
                  onClick={() => handleSectionChange(section)}
                  key={idx}
                >
                  {section.title}
                </span>
              )
            })}
            {/* <div className={styles.wallet}>
              <WalletConnectButton
                className={styles.button}
                onClick={() => setWeb3ModalActive(!web3ModalActive)}
              />
            </div> */}
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
          onStart: () => handleToggleMobileMenu(!active),
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
              <img
                src={icon.src}
                alt={icon.alt}
                onClick={() => handleHomeNavigation()}
              />
            </OnClickAnimation>
            <div className={styles.sections}>
              {map(sections, (section: SectionNavInterface, idx: number) => {
                return (
                  <span
                    className={classNames(
                      styles.section,
                      styles.selectable,
                      'effects--hoverPop',
                      currentSection === section.key && styles.highlight
                    )}
                    onClick={() => handleSectionChange(section)}
                    key={idx}
                  >
                    {section.title}
                  </span>
                )
              })}
              {/* <div className={classNames(styles.section, styles.wallet)}>
                <WalletConnectButton
                  className={styles.button}
                  onClick={() => setWeb3ModalActive(!web3ModalActive)}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
