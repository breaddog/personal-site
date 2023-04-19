import './HighlightsCarousel.scss'
import styles from './Highlights.module.scss'
import React from 'react'
import classNames from 'classnames'

import { Pagination, Navigation, EffectCoverflow, Keyboard } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import { detectScrollBoundary } from '../../../../shared/functions/functions'
import { CircleIcon } from '../../../../shared/components'

import bulbSVG from '../../../../assets/icons/bulb.svg'

import { PROJECTS, ProjectProps } from '../../../../data/projects'


interface PortfolioHighlightsProps {
  className?: string
}

export const PortfolioHighlights: React.FC<PortfolioHighlightsProps> = ({
  className,
}) => {

  const highlightsRef = React.useRef<HTMLDivElement | null>(null)

  const [iconBulbActive, setIconBulbActive] = React.useState<boolean>(false)

  const swiperParams: SwiperProps = {
    id: 'highlights-carousel',
    className: styles.carousel,
    modules: [Pagination, Navigation, EffectCoverflow, Keyboard],
    centeredSlides: true,
    slidesPerView: 1.75,
    loop: true,
    pagination: true,
    navigation: true,
    grabCursor: true,
    keyboard: {
      onlyInViewport: true,
      enabled: true
    },
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 10,
      slideShadows: false,
      depth: 200,
      modifier: 0.5,
      stretch: 200,
      scale: .725
    },
  }

  // light bulb
  const lightBulbScrollDetection = async () => {
    if (!highlightsRef.current?.offsetTop) return
    const _targetBoundary = highlightsRef.current?.offsetTop - (highlightsRef.current?.offsetTop * 0.05)
    const _boundaryHit = await detectScrollBoundary(_targetBoundary)

    if (_boundaryHit && !iconBulbActive) {
      setIconBulbActive(true)
    }

    if (!_boundaryHit && iconBulbActive) {
      setIconBulbActive(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', lightBulbScrollDetection)
    return () => {
      window.removeEventListener('scroll', lightBulbScrollDetection)
    }
  }, [highlightsRef, iconBulbActive])

  const classes = classNames('sub-section portfolio__highlights', styles.highlights)

  return <section className={classes} ref={highlightsRef}>
    <div className={classNames(styles.containerBg, iconBulbActive && styles.active)}>
    </div>
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={classNames(styles.title, styles.bold, 'title__sub-section')}>
          Highlights
        </h2>
        <CircleIcon
          className={styles.icon}
          src={bulbSVG}
          alt='box'
          backgroundColor={iconBulbActive ? 'var(--yellow)' : 'var(--blue)'}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.subheading}>
          Here's a list of projects that I have worked on, feel free to have a look!
        </div>
        <Swiper
          {...swiperParams}
        >
          {
            PROJECTS.map((project: ProjectProps, idx: number | string) => {
              return (
                <SwiperSlide>
                  <div className={classNames(styles.frame__body, 'highlight-frame')} style={{
                    backgroundImage: `url("${project.asset}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                    <div className={classNames(styles.frame__header, styles.uppercase, styles.bold)}>
                      {project.title}
                    </div>
                    <div className={classNames(styles.frame__footer, styles.uppercase, styles.bold)}>
                      {project.scope}
                      <br />
                      {project.organisation}
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }

        </Swiper>
      </div>
    </div>
  </section>
}

