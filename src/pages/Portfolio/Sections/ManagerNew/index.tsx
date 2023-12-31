import styles from './Manager.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import {
  ModalBox,
  ProgressBar,
  SectionContainer,
  SectionHeader,
  SectionSubHeader,
  WaveText,
} from '../../../../shared/components'

import boxSVG from '../../../../assets/icons/box.svg'
import { map } from 'lodash'
import {
  GenericSubSectionForwardInterface,
  GenericForwardRefInterface,
} from '../../../../shared/interfaces'
import { AppContext } from '../../../../App'

interface KeyWordProps {
  key: string
  text: string
}

interface PortfolioManagerProps extends GenericSubSectionForwardInterface {}

export const PortfolioManagerNew: React.FC<PortfolioManagerProps> =
  React.forwardRef<GenericForwardRefInterface, PortfolioManagerProps>(
    ({ className }, ref) => {
      // for the effect thingy
      const KEY_WORDS: KeyWordProps[] = [
        {
          key: 'transparency',
          text: 'transparency',
        },
        {
          key: 'honesty',
          text: 'honesty',
        },
        {
          key: 'communication',
          text: 'communication',
        },
      ]

      const WAVE_TEXT_CLASS = 'manager-wave-text'

      const classes = classNames(
        sectionStyles['sub-section'],
        styles.manager,
        className
      )

      const sectionRef = React.useRef<HTMLDivElement | null>(null)
      const boxRef = React.useRef<HTMLDivElement | null>(null)

      const { isMobile, isMedium } = React.useContext(AppContext)

      const [percentageScrolled, setPercentageScrolled] =
        React.useState<number>(0)

      // wave timeline
      const _waveTimeline = (el: Element, duration: number = 4) => {
        return gsap
          .timeline()
          .from(el, {
            x: '-150vw',
            ease: 'power2.inOut',
            duration,
            onStart: () => {
              el.classList.add('disabled')
            },
            onComplete: () => {
              el.classList.remove('disabled')
            },
          })
          .to({}, { duration })
      }

      const _modalTimeline = (duration: number = 5) => {
        return gsap.timeline().from('#manager-box', {
          y: '-=400%',
          ease: 'sine.inOut',
          duration,
        })
      }

      // entrance effect
      const entranceEffect = () => {
        if (!sectionRef.current) return
        const _elements = gsap.utils.toArray(`.${WAVE_TEXT_CLASS}`) as Element[]

        const scrollTrigger = {
          trigger: sectionRef.current,
          start: `${isMobile ? 'top' : isMedium ? '-2%' : '-4%'} top`,
          // reference this for boundary
          end: '+=3000px',
          scrub: 0.5,
          pin: true,
        }

        // main timeline
        const _timeline = gsap
          .timeline({
            scrollTrigger,
          })
          .to(
            {},
            {
              duration: 4,
            }
          )

        const _masterWaveTimeline = gsap.timeline({
          onStart: function () {
            setPercentageScrolled(0)
          },
          onUpdate: function () {
            const progress = this.progress()
            setPercentageScrolled(progress)
          },
          onComplete: function () {
            setPercentageScrolled(1)
          },
        })

        // add wave elemtns
        _elements.forEach((el: Element) => {
          _masterWaveTimeline.add(_waveTimeline(el, 10))
        })

        _timeline.add(_masterWaveTimeline)

        // modal should be next
        _timeline.add(_modalTimeline(20))

        // padding
        _timeline.add(gsap.from({}, { duration: 12 }))

        _timeline.addPause(5)
      }

      React.useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        let _ctx = gsap.context(() => {
          entranceEffect()
        })

        return () => {
          _ctx.revert()
        }
      }, [sectionRef])

      // refresh
      React.useEffect(() => {
        window.addEventListener('load', () => ScrollTrigger.refresh())
        return () => {
          window.removeEventListener('load', () => ScrollTrigger.refresh())
        }
      }, [])

      React.useImperativeHandle(ref, () => ({
        element: sectionRef.current as HTMLDivElement,
      }))

      return (
        <section
          className={classes}
          ref={sectionRef}
        >
          <SectionContainer className={styles.container}>
            <SectionHeader
              className={styles.header}
              title='Project Manager'
              src={boxSVG}
              alt='box'
              backgroundColour='var(--blue)'
            />
            <SectionSubHeader
              className={classNames(styles.subheader, styles.mobile)}
            >
              <span className={styles.subheadingText}>
                <span>Team Building Progress&nbsp;</span>
                <span>(Scroll To Fill)</span>
              </span>
              <ProgressBar
                className={styles.progress}
                progress={percentageScrolled}
                // link colours to text
                progressColours={{
                  0: 'var(--blue)',
                  40: 'var(--yellow-10)',
                  75: 'var(--purple-10)',
                }}
              />
            </SectionSubHeader>
            <div className={styles.body}>
              <div className={styles.left}>
                <SectionSubHeader
                  className={classNames(styles.subheader, styles.desktop)}
                >
                  <span className={styles.subheadingText}>
                    Team Building Progress (Scroll To Fill):
                  </span>
                  <ProgressBar
                    className={styles.progress}
                    progress={percentageScrolled}
                    // link colours to text
                    progressColours={{
                      0: 'var(--blue)',
                      40: 'var(--yellow-10)',
                      75: 'var(--purple-10)',
                    }}
                  />
                </SectionSubHeader>
                <div className={styles.emphasisContainer}>
                  {map(KEY_WORDS, (el: KeyWordProps, idx: number) => {
                    return (
                      <WaveText
                        key={idx}
                        componentKey={idx}
                        className={classNames(
                          styles.emphasis,
                          WAVE_TEXT_CLASS,
                          styles[el.key]
                        )}
                        text={el.text}
                        animationDuration={1500}
                        animationHeight='1.5rem'
                        animationDelay={100}
                      />
                    )
                  })}
                </div>
              </div>

              <div className={styles.right}>
                <ModalBox
                  className={styles.box__main}
                  id='manager-box'
                >
                  <h3
                    className={classNames(
                      'modal__header',
                      styles.uppercase,
                      styles.bold,
                      styles.box__header
                    )}
                  >
                    Eliminating the information gap
                  </h3>
                  <div
                    className={classNames('modal__body', styles.box__body)}
                    ref={boxRef}
                  >
                    <p className={styles.text}>
                      With my experience of project mangement, I strive to
                      establish an equal level of understanding between the{' '}
                      <b>client</b> and <b>developers</b>.
                    </p>
                    <p className={styles.text}>
                      Increasing visibility for the client on technical progress
                      and feasibilities, whilst providing developers a platform
                      to engage and provide feedback.
                    </p>

                    <p className={styles.text}>
                      I am in the end a developer by heart and seek to{' '}
                      <b>take inspiration and learn from all</b> to contribute
                      towards a cohesive team.
                    </p>

                    <p className={styles.text}>
                      That's why I seek to get everyone involved and informed to
                      ensure standards and expectations are met.
                    </p>
                  </div>
                </ModalBox>
              </div>
            </div>
          </SectionContainer>
        </section>
      )
    }
  )
