import './HighlightsCarousel.scss'
import styles from './Highlights.module.scss'
import React from 'react'
import classNames from 'classnames'

import { Pagination, EffectCoverflow, Keyboard } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { detectScrollBoundary } from '../../../../shared/functions/functions'
import { CircleIcon } from '../../../../shared/components'

import bulbSVG from '../../../../assets/icons/bulb.svg'


interface PortfolioHighlightsProps {
  className?: string
}

export const PortfolioHighlights: React.FC<PortfolioHighlightsProps> = ({
  className,
}) => {
  const classes = classNames('sub-section portfolio__highlights', styles.highlights, className)

  const highlightsRef = React.useRef<HTMLDivElement | null>(null)

  const [iconBulbActive, setIconBulbActive] = React.useState<boolean>(false)

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

  return <div className={classes} ref={highlightsRef}>
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
          id='highlights-carousel'
          className={styles.carousel}
          modules={[Pagination, EffectCoverflow, Keyboard]}
          centeredSlides={true}
          slidesPerView={2}
          loop={true}
          pagination
          keyboard={{
            onlyInViewport: true,
            enabled: true
          }}
          effect='coverflow'
          coverflowEffect={
            {
              rotate: 10,
              // slideShadows: true,
              depth: 150,
              modifier: 0.5,
              stretch: 200,
              scale: .725
            }
          }
        >
          <SwiperSlide>
            <div className={classNames(styles.frame__body)} style={{
              backgroundImage: 'url("./images/projects/suisei-placeholder.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className={classNames(styles.frame__header, styles.uppercase, styles.bold)}>
                Title Of Project
              </div>
              <div className={classNames(styles.frame__footer, styles.uppercase, styles.bold)}>
                Scope - Project
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classNames(styles.frame__body)} style={{
              backgroundImage: 'url("./images/projects/suisei-placeholder.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className={classNames(styles.frame__header, styles.uppercase, styles.bold)}>
                Title Of Project
              </div>
              <div className={classNames(styles.frame__footer, styles.uppercase, styles.bold)}>
                Scope - Project
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classNames(styles.frame__body)} style={{
              backgroundImage: 'url("./images/projects/suisei-placeholder.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className={classNames(styles.frame__header, styles.uppercase, styles.bold)}>
                Title Of Project
              </div>
              <div className={classNames(styles.frame__footer, styles.uppercase, styles.bold)}>
                Scope - Project
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classNames(styles.frame__body)} style={{
              backgroundImage: 'url("./images/projects/suisei-placeholder.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className={classNames(styles.frame__header, styles.uppercase, styles.bold)}>
                Title Of Project
              </div>
              <div className={classNames(styles.frame__footer, styles.uppercase, styles.bold)}>
                Scope - Project
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
}

