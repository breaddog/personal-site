import styles from './Manager.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { CircleIcon, ModalBox, WaveText } from '../../../../shared/components'

import boxSVG from '../../../../assets/icons/box.svg'
import { delay, map } from 'lodash'

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

  const entranceEffect = () => {
    const _elements = gsap.utils.toArray(`.${WAVE_TEXT_CLASS}`) as Element[]
  }

  // gsap version of on hover wave effect for entrance animation
  const sineWaveTextEffect = (
    parent: Element,
    parentIndex: number,
    duration: number = 2,
    height: string = '1.5rem'
  ) => {
    const children = gsap.utils.toArray(parent.children).slice(1) as Element[]
    children.forEach((el: Element, idx: number) => {
      gsap
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
        })
    })
  }

  React.useEffect(() => {
    let _ctx = gsap.context(() => {
      entranceEffect()
    })

    return () => {
      _ctx.kill()
    }
  }, [])

  return (
    <>
      <section
        className={classes}
        ref={sectionRef}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h2
              className={classNames(
                styles.title,
                styles.bold,
                'title__sub-section'
              )}
            >
              Project Management
            </h2>
            <CircleIcon
              className={styles.icon}
              src={boxSVG}
              alt='box'
            />
          </div>
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
              <ModalBox className={styles.box__main}>
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
                    and feasibilities, whilst providing developers a platform to
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
        </div>
      </section>
    </>
  )
}
