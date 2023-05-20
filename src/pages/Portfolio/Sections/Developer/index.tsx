import styles from './Developer.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import gsap from 'gsap'
import { Draggable, MotionPathPlugin, ScrollTrigger } from 'gsap/all'
import {
  SectionHeader,
  SectionContainer,
  Window,
  SectionSubHeader,
  WindowHandle
} from '../../../../shared/components'

// libraries
import { map } from 'lodash'
import { detectScrollBoundary } from '../../../../shared/functions/functions'

// orbit
import { DottedCircle } from '../../../../assets/svgs/index'

// others
import userSVG from '../../../../assets/icons/user.svg'
// header
import laptopSVG from '../../../../assets/icons/laptop.svg'
// logos
import htmlSVG from '../../../../assets/logos/html.svg'
import cssSVG from '../../../../assets/logos/css.svg'
import jsSVG from '../../../../assets/logos/js.svg'
import tsSVG from '../../../../assets/logos/ts.svg'
import reactSVG from '../../../../assets/logos/react.svg'
import nodejsSVG from '../../../../assets/logos/nodejs-icon.svg'
import npmSVG from '../../../../assets/logos/npm.svg'
import s3SVG from '../../../../assets/logos/s3.svg'
import codebuildSVG from '../../../../assets/logos/codebuild.svg'
import codepipelineSVG from '../../../../assets/logos/codepipeline.svg'
import ethSVG from '../../../../assets/logos/eth.svg'
import githubSVG from '../../../../assets/logos/github.svg'

import { AppContext } from '../../../../App'

interface OrbitItemProps {
  src: string
  alt: string
  type: string
}
const ORBIT_ITEMS: OrbitItemProps[] = [
  {
    src: htmlSVG,
    alt: 'html',
    type: 'language',
  },
  {
    src: cssSVG,
    alt: 'css',
    type: 'language',
  },
  {
    src: jsSVG,
    alt: 'javascript',
    type: 'language',
  },
  {
    src: tsSVG,
    alt: 'typescript',
    type: 'language',
  },
  {
    src: reactSVG,
    alt: 'react',
    type: 'web dev',
  },
  {
    src: nodejsSVG,
    alt: 'nodejs',
    type: 'web dev',
  },
  {
    src: npmSVG,
    alt: 'npm',
    type: 'web dev',
  },
  {
    src: s3SVG,
    alt: 'aws s3',
    type: 'storage',
  },
  {
    src: codebuildSVG,
    alt: 'codebuild',
    type: 'ci/cd',
  },
  {
    src: codepipelineSVG,
    alt: 'codepipeline',
    type: 'ci/cd',
  },
  {
    src: ethSVG,
    alt: 'solidity (eth)',
    type: 'web3',
  },
  {
    src: githubSVG,
    alt: 'git/github',
    type: 'source ctrl',
  },
  {
    src: userSVG,
    alt: 'tien',
    type: 'developer',
  },
]

interface PortfolioDeveloperProps {
  className?: string
}

export const PortfolioDeveloper: React.FC<PortfolioDeveloperProps> = ({
  className,
}) => {
  const { isMobile } = React.useContext(AppContext)
  // class
  const classes = classNames(
    'sub-section__dev',
    sectionStyles['sub-section'],
    styles.dev,
    className
  )

  // refs
  const devSectionRef = React.useRef<HTMLDivElement | null>(null)
  const orbitContainerRef = React.useRef<HTMLDivElement | null>(null)
  const orbitTimelinesRef = React.useRef<gsap.core.Timeline[] | null>(null)

  // for windows
  const textWindowRef = React.useRef<WindowHandle>(null)
  const orbitWindowRef = React.useRef<WindowHandle>(null)

  const DOTTED_CIRCLE_PATH = '#dottedCirclePath'
  // if animation init
  const [animationInit, setAnimationInit] = React.useState<boolean>(false)
  // z-index tracker
  const [highestZIndex, setHighestZIndex] = React.useState<number>(0)
  // current highlighted stack component
  const [selectedItemIndex, setSelectedItemIndex] = React.useState<number>(-1)

  // initiate and is used to reset the orbit items
  const initiateItemOrbit = () => {
    if (isMobile) return
    // vars
    const orbitItems = gsap.utils.toArray('.orbit-item')
    const nItems = orbitItems.length

    // move along said orbit
    const _orbitTimelines: gsap.core.Timeline[] = []

    orbitItems.forEach((item: any, idx: number) => {
      const _start = Number((idx / nItems).toFixed(2))
      // somehow the +1 makes it more stable? better to put more rotation ig
      const _end = Number((idx / nItems + 1).toFixed(2)) + 1

      let _timeline = gsap.timeline().to(
        item,
        {
          motionPath: {
            path: DOTTED_CIRCLE_PATH,
            align: DOTTED_CIRCLE_PATH,
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: _start,
            end: _end,
          },
          ease: 'none',
          duration: 45,
          repeat: -1,
        },
        '-=0.5'
      )
      _orbitTimelines.push(_timeline)
    })

    // sets it to a timeline ref
    orbitTimelinesRef.current = _orbitTimelines
  }

  // orbit timeline
  const orbitTimeline = () => {
    if (isMobile) return

    return gsap
      .timeline()
      .from('#orbit-items-container', {
        scale: 0,
        autoAlpha: 0,
        opacity: 0,
        onComplete: () => {
          initiateItemOrbit()
        },
      })
      .to(
        '#orbit-items-container',
        {
          scale: 1,
          autoAlpha: 1,
          duration: 3,
          opacity: 1,
          ease: 'expo.inOut',
        },
        '-=1'
      )
  }

  // alternative slow orbit
  const slowOrbit = () => {
    if (orbitTimelinesRef.current) {
      for (const _timeline of orbitTimelinesRef.current) {
        _timeline.timeScale(0.4)
      }
    }
  }

  const setDefaultOrbitSpeed = () => {
    if (orbitTimelinesRef.current) {
      for (const _timeline of orbitTimelinesRef.current) {
        _timeline.timeScale(1)
      }
    }
  }

  const pauseOrbit = () => {
    if (orbitTimelinesRef.current) {
      for (const _timeline of orbitTimelinesRef.current) {
        _timeline.pause()
      }
    }
  }

  const resumeOrbit = () => {
    if (orbitTimelinesRef.current) {
      for (const _timeline of orbitTimelinesRef.current) {
        _timeline.resume()
      }
    }
  }

  // detect when animation should start
  const sectionTriggerDetection = async () => {
    if (animationInit || isMobile) return
    const _offsetTop = devSectionRef.current?.offsetTop
    if (!_offsetTop) return
    const _targetBoundary = _offsetTop - _offsetTop * 0.85
    const _boundaryHit = await detectScrollBoundary(_targetBoundary)
    if (!animationInit && _boundaryHit) {
      setAnimationInit(true)
    }
  }

  const mobileSizeHandler = () => {
    if (!orbitTimelinesRef.current) return

    const _timelineChild: gsap.core.Timeline = orbitTimelinesRef.current[0]

    // if on mobile and not paused yet
    if (isMobile && _timelineChild.isActive()) {
      pauseOrbit()
    }
    // if not on mobile and still paused
    if (!isMobile && !_timelineChild.isActive()) {
      resumeOrbit()
    }
  }

  // TO DO: determine if should set resize cutoff at 1200px

  // JSX
  // desktop
  const desktopOrbitJSX = () => {
    return (
      <div
        className={classNames(
          styles.orbitContainerDesktop,
          isMobile && styles.disabled
        )}
      >
        <div className={styles.orbitItemHighlight__container}>
          <div
            className={classNames(
              styles.orbitItemHighlight__left,
              0 > selectedItemIndex && styles.inactive
            )}
          >
            {0 > selectedItemIndex ? (
              <div className={classNames(styles.orbitItemHighlight__text)}>
                SELECT LOGO TO VIEW STACK INFO
              </div>
            ) : (
              <div className={classNames(styles.orbitItemHighlight__text)}>
                {ORBIT_ITEMS[selectedItemIndex].type || null}
              </div>
            )}
          </div>
          {0 <= selectedItemIndex && (
            <div className={styles.orbitItemHighlight__right}>
              <div
                className={classNames(
                  styles.orbitItemHighlight__text,
                  styles.uppercase,
                  styles.bold
                )}
              >
                {ORBIT_ITEMS[selectedItemIndex].alt || null}
              </div>
              <img
                className={styles.orbitItemHighlight__img}
                src={ORBIT_ITEMS[selectedItemIndex].src}
                alt={ORBIT_ITEMS[selectedItemIndex].alt || ''}
                style={{
                  filter:
                    'tien' === ORBIT_ITEMS[selectedItemIndex].alt
                      ? 'brightness(0.2)'
                      : 'initial',
                }}
              />
            </div>
          )}
        </div>
        <div
          id='orbit-container'
          className={styles.orbitContainer}
          ref={orbitContainerRef}
        >
          <div
            id='orbit-items-container'
            className={styles.orbitItemsContainer}
          >
            <DottedCircle
              className={styles.orbitCircle}
              id='developer-circle'
              pathId={DOTTED_CIRCLE_PATH.slice(1)}
            />

            {ORBIT_ITEMS.slice(0, -1).map(
              (item: { src: string; alt: string }, idx: number | string) => {
                return (
                  <div
                    className={classNames(styles.item, 'orbit-item')}
                    key={idx}
                    onClick={() => setSelectedItemIndex(Number(idx))}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                    />
                  </div>
                )
              }
            )}
          </div>
          <img
            className={classNames(styles.itemCenter, 'orbit-center')}
            src={userSVG}
            alt='user'
            onClick={() => setSelectedItemIndex(ORBIT_ITEMS.length - 1)}
          />
        </div>
      </div>
    )
  }

  const mobileOrbitJSX = () => {
    return (
      <div
        className={classNames(
          styles.orbitContainerMobile,
          !isMobile && styles.disabled
        )}
      >
        {/* remove the last one as thats a reference */}
        {map(
          ORBIT_ITEMS.slice(0, ORBIT_ITEMS.length - 1),
          (el: OrbitItemProps, idx: number) => {
            return (
              <div
                className={styles.row}
                key={idx}
              >
                <div className={styles.item}>{el.alt}</div>
                <div className={styles.image}>
                  <img
                    src={el.src}
                    alt={el.alt}
                  />
                </div>
              </div>
            )
          }
        )}
      </div>
    )
  }

  // orbit mechanics
  React.useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // register
      gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, Draggable)
      // orbit timeline initaite
      if (animationInit && orbitContainerRef.current) {
        MotionPathPlugin.convertToPath(DOTTED_CIRCLE_PATH)
        orbitTimeline()
        // on hover need to slow to allow user to interact
        orbitContainerRef.current.addEventListener('mouseenter', slowOrbit)
        orbitContainerRef.current.addEventListener(
          'mouseleave',
          setDefaultOrbitSpeed
        )
      }
      // for pausing on mobile
      window.addEventListener('resize', mobileSizeHandler)
    }, devSectionRef)
    return () => {
      ctx.revert()
      if (orbitContainerRef.current) {
        orbitContainerRef.current.removeEventListener('mouseenter', slowOrbit)
        orbitContainerRef.current.removeEventListener(
          'mouseleave',
          setDefaultOrbitSpeed
        )
      }
      window.removeEventListener('resize', mobileSizeHandler)
    }
  }, [animationInit, orbitContainerRef, orbitTimelinesRef, isMobile])

  // detect if triggered
  React.useEffect(() => {
    window.addEventListener('scroll', sectionTriggerDetection)
    return () => {
      window.removeEventListener('scroll', sectionTriggerDetection)
    }
  }, [devSectionRef, animationInit])

  return (
    <>
      <section
        className={classes}
        ref={devSectionRef}
      >
        <PortfolioDevContext.Provider
          value={{
            highestZIndex,
            setHighestZIndex,
            resetOrbitTimeline: initiateItemOrbit,
          }}
        >
          <SectionContainer className={styles.container}>
            <SectionHeader
              className={styles.header}
              title='Web Developer'
              src={laptopSVG}
              alt='laptop'
              backgroundColour='var(--purple)'
            />
            <SectionSubHeader className={styles.subheading}>
              <b>Hint:</b> On Desktop, try dragging and re-sizing the windows...
            </SectionSubHeader>
            <div className={styles.body}>
              <div className={styles.left}>
                <Window
                  className={classNames(styles.window, styles.about)}
                  windowTitle='Tien Powershell'
                  windowStyle='dark'
                  referenceKey='0'
                  boundaryContainer='.sub-section__dev'
                  ref={textWindowRef}
                >
                  <h3 className={classNames(styles.windowHeader, styles.bold)}>
                    About Me
                  </h3>
                  <div className={styles.windowBody}>
                    <p className={styles.text}>
                      The name is <b className={styles.textHighlight}>Tien.</b>{' '}
                      I'm a Web Developer that specialises in the{' '}
                      <b className={styles.textHighlight}>"end-to-end"</b>{' '}
                      integration and development lifecycle.
                    </p>

                    <p className={styles.text}>
                      I seek to achieve an{' '}
                      <b className={styles.textHighlight}>intimate</b> and{' '}
                      <b className={styles.textHighlight}>personal</b>{' '}
                      understanding of the overall{' '}
                      <b className={styles.textHighlight}>vision</b> of any
                      project, bringing the concepts and wishes of it's original
                      design into reality.
                    </p>

                    <h3 className={styles.text}>
                      <b>What I Bring to the Table</b>
                    </h3>

                    <p className={styles.listHeading}>Design</p>
                    <p className={styles.text}>
                      <ul className={styles.list}>
                        <li>Conceptualisation</li>
                        <li>UI/UX Specifications</li>
                        <li>Technical Specifications</li>
                      </ul>
                    </p>

                    <p className={styles.listHeading}>Development</p>
                    <p className={styles.text}>
                      <ul className={styles.list}>
                        <li>Mockup to Web Translations</li>
                        <li>Bespoke Component Integration</li>
                        <li>Stylings + Animations</li>

                        <li>Asset Optimisation + Hosting</li>
                      </ul>
                    </p>

                    <p className={styles.listHeading}>Deployment</p>
                    <p className={styles.text}>
                      <ul className={styles.list}>
                        <li>Prod/Dev Environments</li>
                        <li>CI/CD</li>
                      </ul>
                    </p>
                  </div>
                </Window>
              </div>
              <div className={styles.right}>
                <Window
                  className={classNames(styles.window, styles.orbit)}
                  windowTitle='My Development Stack'
                  windowStyle='dark'
                  referenceKey='1'
                  boundaryContainer='.sub-section__dev'
                  onResize={() => initiateItemOrbit()}
                  ref={orbitWindowRef}
                >
                  {desktopOrbitJSX()}
                  {mobileOrbitJSX()}
                </Window>
              </div>
            </div>
          </SectionContainer>
        </PortfolioDevContext.Provider>
      </section>
    </>
  )
}

interface PortfolioDevContextProps {
  highestZIndex: number
  setHighestZIndex: React.Dispatch<React.SetStateAction<number>>
  resetOrbitTimeline: Function
}

export const PortfolioDevContext =
  React.createContext<PortfolioDevContextProps>({
    highestZIndex: 0,
    setHighestZIndex: () => {},
    resetOrbitTimeline: () => {},
  })
