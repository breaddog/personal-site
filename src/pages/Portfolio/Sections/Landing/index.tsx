import styles from './Landing.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import boxSVG from '../../../../assets/icons/box.svg'
import laptopSVG from '../../../../assets/icons/laptop.svg'
import reactSVG from '../../../../assets/icons/react.svg'
import bulbSVG from '../../../../assets/icons/bulb.svg'
import mailSVG from '../../../../assets/icons/mail.svg'

import {
  GenericForwardRefInterface,
  GenericSubSectionForwardInterface
} from '../../../../shared/interfaces'
import {
  CircleIcon,
  Keyframes,
  OnClickAnimation,
  SectionContainer
} from '../../../../shared/components'

// import doubleArrowDownSVG from '../../../../assets/icons/double-arrow-down.svg'
import onigiriSVG from '../../../../assets/icons/onigiri.svg'
import { DoubleArrowDown } from '../../../../assets/svgs'
import { PortfolioContext } from '../..'
import { PORTFOLIO_SECTIONS } from '../../../../shared/sections'
import { random } from 'lodash'

interface PortfolioLandingProps extends GenericSubSectionForwardInterface {}

export const PortfolioLanding: React.FC<PortfolioLandingProps> =
  React.forwardRef<GenericForwardRefInterface, PortfolioLandingProps>(
    ({ className }, ref) => {
      const { scrollToSection } = React.useContext(PortfolioContext)

      const landingRef = React.useRef<HTMLDivElement | null>(null)

      // for randomising animation types on click of onigiri
      const [selectedAnimation, setSelectedAnimation] =
        React.useState<number>(-1)
      const ANIMATION_TYPES: string[] = [
        'rotateClockwise',
        'rotateAnticlockwise',
        'bounceLanding',
        'moveCircle',
        'moveCircleAnticlockwise',
      ]
      const classes = classNames(
        'position--relative',
        sectionStyles['sub-section'],
        styles.landing,
        className
      )

      const handleAnimationSetter = () => {
        const randomIndex = random(0, ANIMATION_TYPES.length - 1)
        setSelectedAnimation(randomIndex)
      }

      const handleScrollToNextSection = () => {
        scrollToSection(PORTFOLIO_SECTIONS.developer.key)
      }

      // pass up ref
      React.useImperativeHandle(ref, () => ({
        element: landingRef.current as HTMLDivElement,
      }))

      React.useEffect(() => {
        handleAnimationSetter()
        window.addEventListener('load', handleAnimationSetter)
        return () => {
          window.removeEventListener('load', handleAnimationSetter)
        }
      }, [])

      return (
        <section
          className={classes}
          ref={landingRef}
        >
          <SectionContainer className={styles.container}>
            <div className={styles.left}>
              <div className={styles.header}>
                <div className={styles.titleContainer}>
                  <h1
                    data-aos='fade-down'
                    className={classNames(styles.title, styles.uppercase)}
                  >
                    <b>Tien</b> Foong
                  </h1>
                </div>
                <h2
                  data-aos='fade-down'
                  className={styles.subtitle}
                >
                  {/* Developing Websites with Personality */}
                  Web Development with Individuality in Mind
                </h2>
              </div>
              <div className={styles.content}>
                <CircleIcon
                  className={styles.icon}
                  src={laptopSVG}
                  alt='laptop'
                  data-aos='fade-down'
                  data-aos-delay='250'
                />
                <CircleIcon
                  className={styles.icon}
                  src={boxSVG}
                  alt='box'
                  data-aos='fade-down'
                  data-aos-delay='300'
                />
                <CircleIcon
                  className={styles.icon}
                  src={reactSVG}
                  alt='react'
                  data-aos='fade-down'
                  data-aos-delay='350'
                />
                <CircleIcon
                  className={styles.icon}
                  src={bulbSVG}
                  alt='bulb'
                  data-aos='fade-down'
                  data-aos-delay='400'
                />
                <CircleIcon
                  className={styles.icon}
                  src={mailSVG}
                  alt='mail'
                  data-aos='fade-down'
                  data-aos-delay='450'
                />
              </div>
            </div>
            <div className={styles.right}>
              {/* TO DO: add a few more animations or just let it bounce also */}
              <Keyframes
                name='bounceLanding'
                animationProps={{
                  '0%': 'transform: translateY(0)',
                  '50%': 'transform: translateY(-2rem)',
                  '100%': 'transform: translateY(0)',
                }}
              />
              <OnClickAnimation
                className={styles.onigiri}
                animation={{
                  animatingClass: styles.animating,
                  name:
                    selectedAnimation >= 0
                      ? ANIMATION_TYPES[selectedAnimation]
                      : null,
                  duration: 600,
                  iterationCount: 1,
                  onStart: () => handleAnimationSetter(),
                  // onComplete: () => handleAnimationSetter(),
                }}
              >
                <img
                  src={onigiriSVG}
                  alt='onigiri'
                  data-aos='fade-down'
                  data-aos-delay='650'
                />
              </OnClickAnimation>
            </div>
          </SectionContainer>

          <div className={classNames(styles.bottom, styles.animation__bounce)}>
            <DoubleArrowDown
              className={styles.arrow}
              onClick={() => handleScrollToNextSection()}
            />
          </div>
        </section>
      )
    }
  )
