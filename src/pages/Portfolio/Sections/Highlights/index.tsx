import './HighlightsCarousel.scss'
import styles from './Highlights.module.scss'
import frameStyles from './HighlightsFrame.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { Pagination, Navigation, EffectCoverflow, Keyboard } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import { map } from 'lodash'
import { ScrollTrigger } from 'gsap/all'
import {
  SectionContainer,
  SectionHeader,
  SectionSubHeader
} from '../../../../shared/components'

import bulbSVG from '../../../../assets/icons/bulb.svg'

import { PROJECTS, ProjectObject } from '../../../../data/projects'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { AppContext } from '../../../../App'
import { HighlightsHeaderWrapper } from './Components'

interface PortfolioHighlightsProps {
  className?: string
}

export const PortfolioHighlights: React.FC<PortfolioHighlightsProps> = ({
  className,
}) => {
  const { isMobile, isMedium } = React.useContext(AppContext)

  const highlightsRef = React.useRef<HTMLDivElement | null>(null)

  const slideViewParamsRegular = {
    slidesPerView: 2.5,
  }

  const slideViewParamsMedium = {
    slidesPerView: 1.25,
  }

  const slideViewParamsSmall = {
    slidesPerView: 1,
  }

  // for slider params
  const determineSlideViewParams = () => {
    if (isMobile) return slideViewParamsSmall
    if (isMedium) return slideViewParamsMedium
    return slideViewParamsRegular
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
    initialSlide: 2,
    ...determineSlideViewParams(),
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
        <HighlightsHeaderWrapper
          className={styles.header}
          title='Highlights'
          src={bulbSVG}
          alt='bulb'
          hasSubheading={true}
          backgroundColour='var(--blue)'
        />
        <div className={styles.body}>
          <SectionSubHeader className={styles.subheading}>
            Here's a list of projects that I have worked on, feel free to have a
            look!
          </SectionSubHeader>
          <Swiper {...swiperParams}>
            {map(PROJECTS, (project: ProjectObject, idx: number) => {
              return (
                <LazyLoadComponent key={idx + 100}>
                  <SwiperSlide
                    className={styles.slide}
                    key={idx}
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={classNames(
                            frameStyles.body,
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
                              frameStyles.overlay,
                              isActive && frameStyles.active
                            )}
                          >
                            <div className={frameStyles.container}>
                              <p className={frameStyles.description}>
                                {project.description}
                              </p>
                              <div
                                className={classNames(
                                  frameStyles.link,
                                  isActive && styles.active
                                )}
                              >
                                Read More
                              </div>
                            </div>
                          </div>
                          <div
                            className={classNames(
                              frameStyles.header,
                              styles.uppercase,
                              styles.bold
                            )}
                          >
                            <div className={frameStyles.draggable}></div>
                            <div className={frameStyles.content}>
                              {project.title}
                            </div>
                          </div>
                          <div
                            className={classNames(
                              frameStyles.footer,
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
