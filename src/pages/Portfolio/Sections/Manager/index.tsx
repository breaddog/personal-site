import styles from './Manager.module.scss'
import sectionStyles from '../../../../styles/section.module.scss';
import React from 'react'
import classNames from 'classnames'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { map } from 'lodash'

import { CircleIcon, ModalBox } from '../../../../shared/components'
import { BridgeSection, Cloud } from './Components'

import boxSVG from '../../../../assets/icons/box.svg'

// bridge
import redCarSVG from '../../../../assets/misc/red-car.svg'


interface PortfolioManagerProps {
  className?: string
}

export const PortfolioManager: React.FC<PortfolioManagerProps> = ({
  className
}) => {
  const classes = classNames('portfolio__manager', sectionStyles['sub-section'], styles.manager, className)

  // maybe change this to work style?
  const sectionRef = React.useRef<HTMLDivElement | null>(null)
  const bridgeRef = React.useRef<HTMLDivElement | null>(null)
  const carRef = React.useRef<HTMLImageElement | null>(null)
  const [bridgeSections, setBridgeSections] = React.useState<number>(0)

  // for each layer
  const N_CLOUDS = 8
  // CLOUDS
  const cloudEffect = (reference: number, duration: number) => {
    const looper = document.querySelectorAll(`.portfolio__cloud-${reference}`) as any
    // first one is image (add extra offset to create spaced)
    const imageWidth = looper[0].offsetWidth + 200
    const totalWidth = looper.length * imageWidth
    const dirFromLeft = `+=${totalWidth}`


    // mod
    let mod = gsap.utils.wrap(0, totalWidth)
    const randomValue = (min: number, max: number, decimal: boolean = false) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      const _value = Math.random() * (max - min) + min
      return decimal
        ? Number(_value.toFixed(4))
        : Math.floor(_value)
    }

    const _opacity = randomValue(0.25, 1, false)

    // loop loop
    gsap.set(looper, {
      // random offset
      x: function (i: number) {
        const randX = randomValue(-100, 100, false)
        return (i * imageWidth) + randX
      },
    })

    // extra effect
    looper.forEach((el: any) => {
      let randScale = randomValue(0.25, 1, true)
      randScale = randScale < 0.4 ? randomValue(0.05, 1, true) : randScale
      const randomY = randomValue(-50, 20, false)
      gsap.set(el, {
        y: `${randomY}%`,
        scale: randScale,
        // opacity: randomValue(0.1, 1, true) - 1
      })
    })

    const _inverse = Math.random() > 0.5

    // cloud timeline
    gsap.utils.toArray(looper)
      .forEach((el: any, idx: number) => {
        gsap.timeline({
          repeat: -1
        })
          .to(el, {
            opacity: _inverse ? 0.1 : 1,
            delay: randomValue(1, 10, false),
          })
          .to(el, {
            opacity: _inverse ? 1 : 0.1,
            delay: randomValue(1, 10, false),
          })
        // .to(el, {
        //   opacity: (1 - opacityStart % 1),
        //   delay: randomValue(1, 10, false),
        // })
        // .to(el, {
        //   opacity: opacityStart % 1,
        //   delay: randomValue(1, 10, false),
        // })

      }, `-=${duration / 2}`)

    // main timeline
    gsap.timeline()
      .to(looper, {
        x: dirFromLeft,
        modifiers: {
          x: (x) => `${mod(parseFloat(x))}px`,
        },
        opacity: .25,
        duration,
        ease: 'none',
        repeat: -1,
      })
  }

  // clouds
  React.useEffect(() => {
    cloudEffect(0, 50)
    cloudEffect(1, 65)
    cloudEffect(2, 35)
  }, [])

  // BRIDGE
  // given width, dynamically add/remove sections of bridge 
  const updateBridgeSections = () => {
    // edge case
    const windowWidth = window.innerWidth
    const bridgeSection = document.getElementsByClassName('portfolio__bridge-section')[0]
    // edge case
    if (!bridgeSection) return
    // calculate how many can fit, always get ceil
    const nSections = Math.ceil(windowWidth / bridgeSection.clientWidth) + 2
    // if there was a change detected update
    setBridgeSections(nSections)
  }

  // ISSUE: bridge sections wont update properly
  const renderBridgeSections = React.useMemo(() => {
    return map([...Array(bridgeSections).keys()], (el: any, idx: number) => {
      return <BridgeSection
        componentKey={idx}
        className={classNames('portfolio__bridge-section', styles.bridgeSection)}
      />
    })
  }, [bridgeSections])

  // BRIDGE REACT SECTIONS
  React.useEffect(() => {
    updateBridgeSections()
    window.addEventListener('resize', updateBridgeSections)
    return () => {
      window.removeEventListener('resize', updateBridgeSections)
    }
  }, [sectionRef, bridgeSections])


  // CAR
  const _carTimeline = () => {
    return gsap.timeline()
      .to(carRef.current, {
        left: '-10vw',
      })
      .to(carRef.current, {
        left: '95vw',
        duration: 5,
        immediateRender: false,
      })
  }

  const _modalTimeline = () => {
    return gsap.timeline()
      .from('#manager-box', {
        y: '-=200%',
        ease: 'sine.inOut',
        duration: 2,
      })
      .from({}, {
        duration: .75,
      })
  }

  const managerSectionTimeline = () => {
    if (!carRef.current || !sectionRef.current) return
    // go based on section
    const scrollTrigger = {
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=3000px',
      scrub: .5,
      // markers: true,
      pin: true,
    }

    gsap.timeline({
      scrollTrigger,
    })
      .add(_modalTimeline())
      .add(_carTimeline())

  }


  // scroll trigger related stuff
  React.useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)
      managerSectionTimeline()
    })

    return () => ctx.revert()
  }, [carRef, sectionRef])



  return <>
    <section className={classes} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={classNames(styles.title, styles.bold, 'title__sub-section')}>
            Project Management
          </h2>
          <CircleIcon
            className={styles.icon}
            src={boxSVG}
            alt='box'
          />
        </div>
        <div className={styles.body}>
          <div className={styles.sky}>
            <div id='cloud-container-0' className={styles.clouds}>
              {
                map([...Array(N_CLOUDS).keys()], (el: any, idx: number) => {
                  return <Cloud className={classNames('portfolio__cloud-0', styles.cloud)} key={idx} />
                })
              }
            </div>
            <div id='cloud-container-1' className={styles.clouds}>
              {
                map([...Array(N_CLOUDS).keys()], (el: any, idx: number) => {
                  return <Cloud className={classNames('portfolio__cloud-1', styles.cloud)} key={idx} />
                })
              }
            </div>
            <div id='cloud-container-2' className={styles.clouds}>
              {
                map([...Array(N_CLOUDS).keys()], (el: any, idx: number) => {
                  return <Cloud className={classNames('portfolio__cloud-2', styles.cloud)} key={idx} />
                })
              }
            </div>
          </div>
          <div className={styles.ground}>
            <img className={styles.car} ref={carRef} src={redCarSVG} alt='car' />
            <div className={styles.bridge} ref={bridgeRef}>
              <BridgeSection className={classNames('portfolio__bridge-section', styles.bridgeSection)} />
              {renderBridgeSections}
            </div>
          </div>
          <div className={styles.overlay}>
            <ModalBox
              className={styles.box__main}
              id='manager-box'
            >
              <h3 className={classNames('modal__header', styles.uppercase, styles.bold, styles.box__header)}>
                Eliminating the Information Gap
              </h3>
              <div className={classNames('modal__body', styles.box__body)}>
                <p className={styles.text}>
                  With my experience of project mangement, I strive to establish an
                  equal level of understanding between the <b>client</b> and <b>developers</b>.
                </p>

                <p className={styles.text}>
                  Increasing visibility for the client on technical progress and feasibilities, whilst providing developers
                  a platform to engage and suggest.
                </p>

                <p className={styles.text}>
                  <b>Transparency, Honesty, Communication</b>
                </p>

                <p className={styles.text}>
                  I am in the end a developer by heart and seek to take inspiration
                  from all to contribute towards a cohesive team in the end.
                </p>

                <p className={styles.text}>
                  That's why I seek to get everyone involved and informed to ensure standards and expectations are met.
                </p>
              </div>
            </ModalBox>
          </div>
        </div>
      </div>
    </section >
  </>
}
