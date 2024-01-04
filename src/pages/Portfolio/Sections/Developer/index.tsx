import styles from './Developer.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import gsap from 'gsap'
import { Draggable, MotionPathPlugin, ScrollTrigger } from 'gsap/all'
import { map } from 'lodash'

import {
  GenericForwardRefInterface,
  GenericSubSectionForwardInterface,
} from '../../../../shared/interfaces'
import {
  SectionHeader,
  SectionContainer,
  Window,
  SectionSubHeader,
  WindowHandle,
  ToggleSlider,
} from '../../../../shared/components'

import { AppContext } from '../../../../App'
import { ORBIT_ITEMS, OrbitItemProps } from './orbitItems'
// orbit
import { DottedCircle } from '../../../../assets/svgs/index'

// others
import userSVG from '../../../../assets/icons/user.svg'
// header
import laptopSVG from '../../../../assets/icons/laptop.svg'

interface PortfolioDeveloperProps extends GenericSubSectionForwardInterface {}

export const PortfolioDeveloper: React.FC<PortfolioDeveloperProps> =
  React.forwardRef<GenericForwardRefInterface, PortfolioDeveloperProps>(
    ({ className }, ref) => {
      const { isMobile } = React.useContext(AppContext)
      // class
      const classes = classNames(
        'sub-section__dev',
        sectionStyles['sub-section'],
        styles.dev,
        className
      )

      // specific flex checker
      const flexMediaMatcher = window.matchMedia('(max-width: 1200px)')

      // refs
      const devSectionRef = React.useRef<HTMLDivElement | null>(null)
      const orbitContainerRef = React.useRef<HTMLDivElement | null>(null)
      const orbitTimelinesRef = React.useRef<gsap.core.Timeline[] | null>(null)

      // for windows
      const textWindowRef = React.useRef<WindowHandle>(null)
      const orbitWindowRef = React.useRef<WindowHandle>(null)

      const DOTTED_CIRCLE_PATH = '#dottedCirclePath'

      // simplified view tracker
      const [simplifiedView, setSimplifiedView] = React.useState<boolean>(false)

      // z-index tracker
      const [highestZIndex, setHighestZIndex] = React.useState<number>(0)
      // current highlighted stack component
      const [selectedItemIndex, setSelectedItemIndex] =
        React.useState<number>(-1)
      // flex
      const isColumnRef = React.useRef<boolean>(false)

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

      const killOrbit = () => {
        if (orbitTimelinesRef.current) {
          for (const _timeline of orbitTimelinesRef.current) {
            _timeline.kill()
          }
        }
      }

      // invalidate all windows
      const invalidateAllWindowProps = ({
        orbit,
        text,
      }: {
        orbit?:
          | {
              width?: string
              height?: string
            }
          | null
          | undefined
        text?:
          | {
              width?: string
              height?: string
            }
          | null
          | undefined
      } = {}) => {
        if (!textWindowRef.current || !orbitWindowRef.current) return
        textWindowRef.current?.invalidateWindow()
        orbitWindowRef.current?.invalidateWindow()
        textWindowRef.current?.resetWindow(text)
        orbitWindowRef.current?.resetWindow(orbit)
      }

      // for mobile to improve eprforamnce
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

      // column wise check
      // ref used here due to weird rendering bug
      const flexDetectionHandler = () => {
        if (flexMediaMatcher.matches && !isColumnRef.current) {
          isColumnRef.current = true
          invalidateAllWindowProps({
            orbit: {
              height: '95%',
            },
          })
        }

        if (!flexMediaMatcher.matches && isColumnRef.current) {
          isColumnRef.current = false
          invalidateAllWindowProps()
        }
      }

      // on mobile we respect mobile boundaries
      // otherwise respect the toggle
      const determineIfSimplifiedView = () => {
        if (isMobile) return isMobile
        return simplifiedView
      }

      // simplified view? (on desktop its just mobile)
      const handleToggleSimplifiedView = () => {
        setSimplifiedView(!simplifiedView)
      }

      // JSX
      // desktop
      const desktopOrbitJSX = () => {
        return (
          <div
            className={classNames(
              styles.orbitContainerDesktop,
              determineIfSimplifiedView() && styles.disabled
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
                        ORBIT_ITEMS[selectedItemIndex].alt === 'tien'
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
                  (item: { src: string; alt: string }, idx: number) => {
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
              !determineIfSimplifiedView() && styles.disabled
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
          if (orbitContainerRef.current) {
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
          if (orbitContainerRef.current) {
            orbitContainerRef.current.removeEventListener(
              'mouseenter',
              slowOrbit
            )
            orbitContainerRef.current.removeEventListener(
              'mouseleave',
              setDefaultOrbitSpeed
            )
          }
          window.removeEventListener('resize', mobileSizeHandler)
          killOrbit()
          ctx.revert()
        }
      }, [orbitContainerRef, orbitTimelinesRef, isMobile])

      React.useEffect(() => {
        flexDetectionHandler()
        window.addEventListener('resize', flexDetectionHandler)
        return () => {
          window.addEventListener('resize', flexDetectionHandler)
        }
      }, [isColumnRef, flexMediaMatcher])

      React.useImperativeHandle(ref, () => ({
        element: devSectionRef.current as HTMLDivElement,
      }))

      return (
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
                hasSubheading={true}
                backgroundColour='var(--purple)'
              />
              <SectionSubHeader className={styles.subheading}>
                <div>
                  <b>Hint:</b> On Desktop, try dragging and re-sizing the
                  windows below in this section.{' '}
                </div>
                <div>
                  <b>Feature:</b>{' '}
                  {!isMobile ? (
                    <>
                      <span className={styles.enabled}>
                        Enabled,{' '}
                        <span
                          className='cursor__pointer'
                          onClick={() => invalidateAllWindowProps()}
                        >
                          <b>click here to reset.</b>
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className={styles.disabled}>Disabled</span>
                  )}
                </div>
              </SectionSubHeader>
              <div className={styles.body}>
                <div
                  className={styles.left}
                  data-aos='zoom-in-right'
                  data-aos-delay='100'
                  data-aos-duration='1200'
                >
                  <Window
                    className={classNames(styles.window, styles.about)}
                    windowTitle='Tien Powershell'
                    windowStyle='dark'
                    referenceKey='0'
                    boundaryContainer='.sub-section__dev'
                    ref={textWindowRef}
                  >
                    <h3
                      className={classNames(styles.windowHeader, styles.bold)}
                    >
                      About Me
                    </h3>
                    <div className={styles.windowBody}>
                      <div className={styles.intro}>
                        <p className={styles.text}>
                          The name is{' '}
                          <b className={styles.textHighlight}>Tien.</b> I'm a
                          Full-stack Web Developer with{' '}
                          <b className={styles.textHighlight}>
                            end-to-end experience
                          </b>{' '}
                          in the{' '}
                          <b className={styles.textHighlight}>
                            development lifecycle
                          </b>{' '}
                          from UI/UX Design, website building, API integrations,
                          testing and quality control.
                        </p>

                        <p className={styles.text}>
                          I aim to gain a{' '}
                          <b className={styles.textHighlight}>
                            detailed and thorough understanding
                          </b>{' '}
                          of each project and enjoy{' '}
                          <b className={styles.textHighlight}>
                            working with clients
                          </b>{' '}
                          to translate concepts, intentions and designs into
                          reality.
                        </p>
                      </div>

                      {/* MAYBE: add some more personal info */}
                      <div className={styles.personalInfo}>
                        <div className={styles.section}>
                          <h3 className={styles.text}>
                            <b>Skills</b>
                          </h3>

                          <p className={styles.listHeading}>UI Design</p>
                          <ul className={styles.list}>
                            <li>Conceptualisation</li>
                            <li>UI/UX Specifications</li>
                            <li>Technical Specifications</li>
                          </ul>

                          <p className={styles.listHeading}>Development</p>
                          <ul className={styles.list}>
                            <li>Styling + Animation</li>
                            <li>Mockup to Web Translations</li>
                            <li>Bespoke Component Integration</li>
                            <li>API and Widget Integration</li>
                            <li>System Design Planning</li>
                            <li>CI/CD Pipelines</li>
                          </ul>

                          <p className={styles.listHeading}>
                            Project Management
                          </p>
                          <ul className={styles.list}>
                            <li>Development Specification Planning</li>
                            <li>Systems Mockup and Design</li>
                            <li>High Level Integration Planning</li>
                          </ul>
                        </div>

                        {/* 
                        <div className={styles.section}>
                          <h3 className={styles.text}>
                            <b>Beyond the Table</b>
                          </h3>

                          <p className={styles.listHeading}>Hobbies</p>
                          <ul className={styles.list}>
                            <li>Anime</li>
                            <li>Rythmn Games</li>
                            <li>Coffee</li>
                            <li>Foodie</li>
                            <li>Music</li>
                          </ul>
                        </div> */}
                      </div>
                    </div>
                  </Window>
                </div>
                <div
                  className={styles.right}
                  data-aos='zoom-in-left'
                  data-aos-delay='100'
                  data-aos-duration='1200'
                >
                  <Window
                    className={classNames(styles.window, styles.orbit)}
                    windowTitle='My Development Stack'
                    windowStyle='dark'
                    referenceKey='1'
                    boundaryContainer='.sub-section__dev'
                    onResize={() => initiateItemOrbit()}
                    ref={orbitWindowRef}
                  >
                    {!isMobile && (
                      <div className={styles.toggleView}>
                        <div className={styles.toggleTitle}>
                          Toggle Simplified View
                        </div>
                        <ToggleSlider
                          className={styles.toggle}
                          isActive={simplifiedView}
                          onSlide={() => handleToggleSimplifiedView()}
                        />
                      </div>
                    )}
                    {desktopOrbitJSX()}
                    {mobileOrbitJSX()}
                  </Window>
                </div>
              </div>
            </SectionContainer>
          </PortfolioDevContext.Provider>
        </section>
      )
    }
  )

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
