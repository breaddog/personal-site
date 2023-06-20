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
  CircularText,
  Keyframes,
  OnClickAnimation,
  SectionContainer
} from '../../../../shared/components'

// import doubleArrowDownSVG from '../../../../assets/icons/double-arrow-down.svg'
import onigiriSVG from '../../../../assets/icons/onigiri.svg'
import { DoubleArrowDown } from '../../../../assets/svgs'
import { PortfolioContext } from '../..'
import { PORTFOLIO_SECTIONS } from '../../../../shared/sections'
import { map, random } from 'lodash'
import { generateCircularText } from '../../../../shared/components/CircularText/helpers'

interface PortfolioLandingProps extends GenericSubSectionForwardInterface {}

export interface LandingCircleIconProps {
  className?: string
  circularText?: {
    text: string
    repetitions?: number
    spacing?: number
  }
  key: string
  src: string
  alt: string
  dataAos?: string
  dataAosDelay?: string | number
}

const LANDING_CIRCLE_ICONS: LandingCircleIconProps[] = [
  {
    src: laptopSVG,
    alt: 'laptop',
    circularText: {
      text: 'Developer',
      spacing: 14,
    },
    dataAos: 'fade-down',
    dataAosDelay: 250,
    key: PORTFOLIO_SECTIONS.developer.key,
  },
  {
    src: boxSVG,
    alt: 'box',
    circularText: {
      text: 'Management',
      repetitions: 2,
      spacing: 9,
    },
    dataAos: 'fade-down',
    dataAosDelay: 300,
    key: PORTFOLIO_SECTIONS.manager.key,
  },
  {
    src: reactSVG,
    alt: 'react',
    circularText: {
      text: 'Journey',
      spacing: 19,
    },
    dataAos: 'fade-down',
    dataAosDelay: 350,
    key: PORTFOLIO_SECTIONS.journey.key,
  },
  {
    src: bulbSVG,
    alt: 'bulb',
    circularText: {
      text: 'Highlights',
      spacing: 13,
    },
    dataAos: 'fade-down',
    dataAosDelay: 400,
    key: PORTFOLIO_SECTIONS.highlights.key,
  },
  {
    src: mailSVG,
    alt: 'mail',
    circularText: {
      text: 'Contacts',
      spacing: 17,
    },
    dataAos: 'fade-down',
    dataAosDelay: 450,
    key: PORTFOLIO_SECTIONS.contacts.key,
  },
]

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
                  {/* Web Development with Individuality in Mind */}
                  {/* TO DO: think of better slogan */}
                  Full-Stack Development Done Interactive
                </h2>
              </div>
              <div className={styles.content}>
                {/* developer */}
                {map(
                  LANDING_CIRCLE_ICONS,
                  (el: LandingCircleIconProps, idx: number) => (
                    <div
                      className={styles.iconContainer}
                      key={idx}
                      data-aos={el.dataAos}
                      data-aos-delay={el.dataAosDelay}
                    >
                      <CircleIcon
                        className={classNames(styles.icon, 'effects--hoverPop')}
                        src={el.src}
                        alt={el.alt}
                        onClick={() => scrollToSection(el.key)}
                      />
                      <CircularText
                        className={classNames(styles.circularText)}
                        text={generateCircularText(
                          el.circularText?.text,
                          el.circularText?.repetitions ?? 2,
                          el.circularText?.spacing ?? 12
                        )}
                        duration={6000}
                        fontSize='0.825rem'
                      />
                    </div>
                  )
                )}
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
