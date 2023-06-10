import styles from './GenericHeader.module.scss'
import React from 'react'
import classNames from 'classnames'

import { map } from 'lodash'
import { SectionNavInterface } from '../../types/nav'
import { OnClickAnimation } from '..'

import menuSVG from '../../../assets/icons/menu-slanted.svg'
import crossSVG from '../../../assets/icons/cross.svg'
import { AppContext } from '../../../App'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../routes'
import { WalletConnectButton } from '../../../ethereum'

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
  const { web3ModalActive, setWeb3ModalActive, scrollDirection } =
    React.useContext(AppContext)

  const mobileHeaderMatcher = window.matchMedia(`(max-width: ${flexSize}px)`)

  // toggle button state
  const [active, setActive] = React.useState<boolean>(false)
  // mobile menu active
  const [mobileHeaderActive, setMobileHeaderActive] =
    React.useState<boolean>(false)
  const [desktopHeaderHover, setDesktopHeaderHover] =
    React.useState<boolean>(false)

  const headerRef = React.useRef<HTMLHeadElement>(null)

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
  const handleSectionChange = (sectionKey: string) => {
    if (closeOnChange) {
      setActive(false)
    }
    onSectionChange(sectionKey)
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
          <OnClickAnimation
            className={styles.icon}
            animation={{
              animatingClass: styles.animating,
              duration: 800,
            }}
          >
            <Link to={ROUTES.home.pathname}>
              <img
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
                    'effects--hoverPop',
                    currentSection === section.key && styles.highlight
                  )}
                  onClick={() => handleSectionChange(section.key)}
                  key={idx}
                >
                  {section.title}
                </span>
              )
            })}
            <div className={styles.wallet}>
              <WalletConnectButton
                className={styles.button}
                onClick={() => setWeb3ModalActive(!web3ModalActive)}
              />
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
              <img
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
                      'effects--hoverPop',
                      currentSection === section.key && styles.highlight
                    )}
                    onClick={() => handleSectionChange(section.key)}
                    key={idx}
                  >
                    {section.title}
                  </span>
                )
              })}
              <div className={classNames(styles.section, styles.wallet)}>
                <WalletConnectButton
                  className={styles.button}
                  onClick={() => setWeb3ModalActive(!web3ModalActive)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
