import styles from './Manager.module.scss'
import React, { useRef } from 'react'
import classNames from 'classnames'

import { gsap } from 'gsap'
import { ScrollTrigger, Draggable } from 'gsap/all'

import { delay, map } from 'lodash'

import { CircleIcon, ModalBox } from '../../../../shared/components'
import { BridgeSection, Cloud } from './Components'

import boxSVG from '../../../../assets/icons/box.svg'

// bridge
import cloudSVG from '../../../../assets/misc/cloud.svg'
import redCarSVG from '../../../../assets/misc/red-car.svg'


interface PortfolioManagerProps {
  className?: string
}

export const PortfolioManager: React.FC<PortfolioManagerProps> = ({
  className
}) => {
  const classes = classNames('sub-section portfolio__manager', styles.manager, className)

  // maybe change this to work style?
  const sectionRef = React.useRef<HTMLDivElement | null>(null)
  const bridgeRef = React.useRef<HTMLDivElement | null>(null)
  const carRef = React.useRef<HTMLImageElement | null>(null)
  const [bridgeSections, setBridgeSections] = React.useState<number>(0)

  // for each layer
  const N_CLOUDS = 6
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


    const cloudTimeline = gsap.utils.toArray(looper)
      .forEach((el: any, idx: number) => {
        gsap.timeline({
        })
          .to(el, {
            opacity: _opacity % 1,
            delay: randomValue(1, 10, false),
            repeat: -1
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
    const timeline = gsap.timeline()
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
  }, [])

  // BRIDGE
  // given width, dynamically add/remove sections of bridge 
  const updateBridgeSections = () => {
    // edge case
    if (!sectionRef.current) return
    const windowWidth = sectionRef.current.clientWidth
    const bridgeSection = document.getElementsByClassName('portfolio__bridge-section')[0]
    // edge case
    if (!bridgeSection) return
    // calculate how many can fit, always get ceil
    const nSections = Math.ceil(windowWidth / bridgeSection.clientWidth)

    // if there was a change detected update
    setBridgeSections(nSections)

  }

  const renderBridgeSections = () => {
    return map([...Array(bridgeSections).keys()], (el: any, idx: number) => {
      return <BridgeSection
        componentKey={idx}
        className={classNames('portfolio__bridge-section', styles.bridgeSection)}
      />
    })
  }

  // update 
  React.useEffect(() => {
    let ctx = gsap.context(() => {
      updateBridgeSections()
      window.addEventListener('resize', updateBridgeSections)
    })
    return () => {
      ctx.revert()
      window.removeEventListener('resize', updateBridgeSections)
    }
  }, [sectionRef, bridgeSections])

  // CAR
  const carTimeline = () => {
    if (!carRef.current || !sectionRef.current) return
    // go based on section
    const scrollTrigger = {
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1000px',
      scrub: 1,
      markers: true,
      pin: true,
    }

    const _timeline = gsap.timeline({
      scrollTrigger,
    })
      .to(carRef.current, {
        left: '95vw',
        immediateRender: false,
      })
  }

  React.useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)
      carTimeline()
    })

    return () => ctx.revert()
  }, [carRef, sectionRef])

  return <>
    <section className={classes} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={classNames(styles.title, 'title__sub-section', 'text__bold')}>
            Project Manager
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
          </div>
          <div className={styles.ground}>
            <img className={styles.car} ref={carRef} src={redCarSVG} alt='car' />
            <div className={styles.bridge} ref={bridgeRef}>
              <BridgeSection className={classNames('portfolio__bridge-section', styles.bridgeSection)} />
              {renderBridgeSections()}
            </div>
          </div>
          <div className={styles.overlay}>
            <ModalBox
              className={styles.box__main}
              id='manager-box'
            >
              <div className={classNames('modal__header', styles.box__header)}>
                Philosophy
              </div>
              <div className={classNames('modal__body', styles.box__body)}>
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                <br />
                Nunc est augue, tincidunt quis
                metus non, accumsan gravida
                risus.
              </div>
            </ModalBox>
          </div>
        </div>
      </div>
    </section >
  </>
}
