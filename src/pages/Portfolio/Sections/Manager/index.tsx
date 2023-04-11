import styles from './Manager.module.scss'
import React, { useRef } from 'react'
import classNames from 'classnames'

import { gsap } from 'gsap'
import { ScrollTrigger, Draggable } from 'gsap/all'

import { map } from 'lodash'

import { CircleIcon } from '../../../../shared/components'
import { BridgeSection, Cloud } from './Components'

import boxSVG from '../../../../assets/icons/box.svg'

// bridge
import cloudSVG from '../../../../assets/misc/cloud.svg'


interface PortfolioManagerProps {
  className?: string
}

export const PortfolioManager: React.FC<PortfolioManagerProps> = ({
  className
}) => {
  const classes = classNames('sub-section portfolio__manager', className)

  // maybe change this to work style?
  const sectionRef = React.useRef<HTMLDivElement | null>(null)
  const bridgeRef = React.useRef<HTMLDivElement | null>(null)
  const [bridgeSections, setBridgeSections] = React.useState<number>(0)

  // for each layer
  const N_CLOUDS = 6

  // follow figma
  // car should scrub with thing as timeline
  // clouds infinite right to left and increase in speed
  // box icosn should appear as hovering like clouds (foreground)
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
      const _value = (Math.random() * (max - min) + min)
      return decimal
        ? Number(_value.toFixed(4))
        : Math.floor(_value)
    }

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
      const randomY = randomValue(-30, 20, false)
      gsap.set(el, {
        y: `${randomY}%`,
        scale: randScale,
        // opacity: randomValue(0.1, 1, true) - 1
      })
    })

    // main timeline
    const timeline = gsap.timeline()
      .to(looper, {
        x: dirFromLeft,
        modifiers: {
          x: (x) => `${mod(parseFloat(x))}px`,
        },
        duration,
        ease: 'none',
        repeat: -1,
      })
  }

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
    updateBridgeSections()
    window.addEventListener('resize', updateBridgeSections)
    return () => {
      window.removeEventListener('resize', updateBridgeSections)
    }
  }, [sectionRef, bridgeSections])

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
            <div className={styles.bridge} ref={bridgeRef}>
              <BridgeSection className={classNames('portfolio__bridge-section', styles.bridgeSection)} />
              {renderBridgeSections()}
            </div>
            <div className={styles.car}>

            </div>
          </div>

        </div>
      </div>
    </section >
  </>
}