import './HighlightsCarousel.scss'
import styles from './Highlights.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { Pagination, Navigation, EffectCoverflow, Keyboard } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import { map } from 'lodash'
import { ScrollTrigger } from 'gsap/all'
import { SectionContainer, SectionHeader } from '../../../../shared/components'

import bulbSVG from '../../../../assets/icons/bulb.svg'

import { PROJECTS, ProjectObject } from '../../../../data/projects'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { AppContext } from '../../../../App'

interface PortfolioHighlightsProps {
  className?: string
}

export const PortfolioHighlights: React.FC<PortfolioHighlightsProps> = ({
  className,
}) => {
  const { isMobile, isMedium } = React.useContext(AppContext)

  const highlightsRef = React.useRef<HTMLDivElement | null>(null)

  const slideViewParamsRegular = {
    initialSlide: 2,
    slidesPerView: 2.5,
  }

  const slideViewParamsMedium = {
    slidesPerView: 1.5,
  }

  const slideViewParamsSmall = {
    slidesPerView: 1,
  }

  const swiperParams: SwiperProps = {
    id: 'highlights-carousel',
    className: styles.carousel,
    modules: [Pagination, Navigation, EffectCoverflow, Keyboard],
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 10,
      slideShadows: false,
      depth: 200,
      modifier: 0.5,
      stretch: 200,
      scale: 0.725,
    },
    autoplay: true,
    loop: true,
    centeredSlides: true,
    pagination: true,
    navigation: true,
    grabCursor: true,
    keyboard: {
      onlyInViewport: true,
      enabled: true,
    },
    ...slideViewParamsMedium,
  }

  React.useEffect(() => {
    window.addEventListener('load', () => ScrollTrigger.refresh())
    return () => {
      window.removeEventListener('load', () => ScrollTrigger.refresh())
    }
  }, [])

  const classes = classNames(
    'portfolio__highlights',
    sectionStyles['sub-section'],
    styles.highlights,
    className
  )

  return (
    <section
      className={classes}
      ref={highlightsRef}
    >
      <SectionContainer className={styles.container}>
        <SectionHeader
          className={styles.header}
          title='Highlights'
          src={bulbSVG}
          alt='bulb'
          backgroundColour='var(--blue)'
        />
        <div className={styles.body}>
          <div className={styles.subheading}>
            Here's a list of projects that I have worked on, feel free to have a
            look!
          </div>
          <Swiper {...swiperParams}>
            {map(PROJECTS, (project: ProjectObject, idx: number | string) => {
              return (
                <LazyLoadComponent>
                  <SwiperSlide
                    className={styles.slide}
                    key={idx}
                  >
                    {({ isActive }) => (
                      <>
                        <div className={styles.frame__head}></div>
                        <div
                          className={classNames(
                            styles.frame__body,
                            'highlight-frame'
                          )}
                          style={{
                            backgroundImage: `url("${project.asset}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                          <div
                            className={classNames(
                              styles.frame__overlay__body,
                              isActive && styles.active
                            )}
                          >
                            <div className={styles.frame__overlay__container}>
                              <p className={styles.frame__overlay__description}>
                                {project.description}
                              </p>
                              <div
                                className={classNames(
                                  styles.frame__overlay__link,
                                  isActive && styles.active
                                )}
                              >
                                Read More
                              </div>
                            </div>
                          </div>
                          <div
                            className={classNames(
                              styles.frame__header,
                              styles.uppercase,
                              styles.bold
                            )}
                          >
                            {project.title}
                          </div>
                          <div
                            className={classNames(
                              styles.frame__footer,
                              styles.uppercase,
                              styles.bold
                            )}
                          >
                            {project.scope}
                            <br />
                            {project.organisation}
                          </div>
                        </div>
                      </>
                    )}
                  </SwiperSlide>
                </LazyLoadComponent>
              )
            })}
          </Swiper>
        </div>
      </SectionContainer>
    </section>
  )
}
