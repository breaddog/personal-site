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
        'bounce',
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
        element: landingRef.current as Element,
      }))
      return (
        <>
          <section
            className={classes}
            ref={landingRef}
          >
            <SectionContainer className={styles.container}>
              <div className={styles.left}>
                <div className={styles.header}>
                  <div className={styles.titleContainer}>
                    <h1 className={classNames(styles.title, styles.uppercase)}>
                      <b>Tien</b> Foong
                    </h1>
                    {/* <img src={onigiriSVG} alt='onigiri' /> */}
                  </div>
                  <h2 className={styles.subtitle}>
                    {/* Developing Websites with Personality */}
                    Web Development with Individuality in Mind
                  </h2>
                </div>
                <div className={styles.content}>
                  <CircleIcon
                    className={styles.icon}
                    src={laptopSVG}
                    alt='laptop'
                  />
                  <CircleIcon
                    className={styles.icon}
                    src={boxSVG}
                    alt='box'
                  />
                  <CircleIcon
                    className={styles.icon}
                    src={reactSVG}
                    alt='react'
                  />
                  <CircleIcon
                    className={styles.icon}
                    src={bulbSVG}
                    alt='bulb'
                  />
                  <CircleIcon
                    className={styles.icon}
                    src={mailSVG}
                    alt='mail'
                  />
                </div>
              </div>
              <div className={styles.right}>
                {/* TO DO: add a few more animations or just let it bounce also */}
                <OnClickAnimation
                  className={styles.onigiri}
                  animation={{
                    animatingClass: styles.animating,
                    name:
                      selectedAnimation >= 0
                        ? ANIMATION_TYPES[selectedAnimation]
                        : 'none',
                    duration: 600,
                    iterationCount: 1,
                    onStart: () => {
                      if (selectedAnimation >= 0) return
                      handleAnimationSetter()
                    },
                    onComplete: () => handleAnimationSetter(),
                  }}
                >
                  <img
                    src={onigiriSVG}
                    alt='onigiri'
                  />
                </OnClickAnimation>
              </div>
            </SectionContainer>

            <div
              className={classNames(styles.bottom, styles.animation__bounce)}
            >
              <DoubleArrowDown
                className={styles.arrow}
                onClick={() => handleScrollToNextSection()}
              />
            </div>
          </section>
        </>
      )
    }
  )
