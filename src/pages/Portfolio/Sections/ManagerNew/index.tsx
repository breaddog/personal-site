import styles from './Manager.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import {
  CircleIcon,
  ModalBox,
  SectionContainer,
  SectionHeader,
  WaveText
} from '../../../../shared/components'

import boxSVG from '../../../../assets/icons/box.svg'
import { delay, map, reverse } from 'lodash'

interface KeyWordProps {
  key: string
  text: string
}

interface PortfolioManagerProps {
  className?: string
}

export const PortfolioManagerNew: React.FC<PortfolioManagerProps> = ({
  className,
}) => {
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
    'portfolio__manager',
    sectionStyles['sub-section'],
    styles.manager,
    className
  )

  const sectionRef = React.useRef<HTMLDivElement | null>(null)
  const boxRef = React.useRef<HTMLDivElement | null>(null)

  // gsap version of on hover wave effect for entrance animation
  const sineWaveTextEffect = ({
    parent,
    duration = 1,
    height = '1.5rem',
  }: {
    parent: Element
    duration?: number
    height?: string
  }) => {
    const children = gsap.utils.toArray(parent.children).slice(1) as Element[]
    const _masterTimeline = gsap.timeline()

    // gsap reads it in reverse so need to realign
    reverse(children).forEach((el: Element, idx: number) => {
      const _childTimeline = gsap
        .timeline({
          delay: idx * 0.15,
          duration,
        })
        .to(el, {
          y: `-${height}`,
          ease: 'sine.inOut',
        })
        .to(el, {
          y: height,
          ease: 'sine.inOut',
        })
        .to(el, {
          y: 0,
          ease: 'sine.inOut',
          onComplete: () => {
            parent.classList.remove('disabled')
          },
        })
      _masterTimeline.add(_childTimeline, `-${duration}`)
    })

    return _masterTimeline
  }

  // wave timeline
  const _waveTimeline = (el: Element, duration: number = 4) => {
    return gsap
      .timeline()
      .from(el, {
        x: '-200%',
        ease: 'power2.inOut',
        duration,
        onStart: () => {
          el.classList.add('disabled')
        },
        onComplete: () => {
          sineWaveTextEffect({
            parent: el,
            duration: 0,
          })
        },
      })
      .to({}, { duration })
  }

  const _modalTimeline = (duration: number = 5) => {
    return gsap
      .timeline()
      .from('#manager-box', {
        y: '-=400%',
        ease: 'sine.inOut',
        duration,
      })
      .from(
        {},
        {
          duration: 0.75,
        }
      )
  }

  // entrance effect
  const entranceEffect = () => {
    if (!sectionRef.current) return
    const _elements = gsap.utils.toArray(`.${WAVE_TEXT_CLASS}`) as Element[]

    const scrollTrigger = {
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=5000px',
      scrub: 0.1,
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
          duration: 10,
        }
      )

    // add wave elemtns
    _elements.forEach((el: Element) => {
      _timeline.add(_waveTimeline(el, 5))
    })

    // modal should be next
    _timeline.add(_modalTimeline(8))

    // padding
    _timeline.add(gsap.from({}, { duration: 10 }))
  }

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let _ctx = gsap.context(() => {
      ScrollTrigger.refresh()
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
        <div className={styles.body}>
          <div className={styles.left}>
            {map(KEY_WORDS, (el: KeyWordProps, idx: number) => {
              return (
                <WaveText
                  componentKey={idx}
                  className={classNames(styles.emphasis, WAVE_TEXT_CLASS)}
                  text={el.text}
                  animationHeight='1.5rem'
                  animationDelay={100}
                />
              )
            })}
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
                  With my experience of project mangement, I strive to establish
                  an equal level of understanding between the <b>client</b> and{' '}
                  <b>developers</b>.
                </p>
                <p className={styles.text}>
                  Increasing visibility for the client on technical progress and
                  feasibilities, whilst providing developers a platform to
                  engage and suggest.
                </p>

                <p className={styles.text}>
                  I am in the end a developer by heart and seek to{' '}
                  <b>take inspiration and learn from all</b> to contribute
                  towards a cohesive team in the end.
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
