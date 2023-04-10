import styles from './Developer.module.scss'
import React from 'react'
import classNames from 'classnames'

import gsap from 'gsap'
import { Draggable, MotionPathPlugin, ScrollTrigger } from 'gsap/all'

import { CircleIcon, Window } from '../../../../shared/components'

// header
import laptopSVG from '../../../../assets/icons/laptop.svg'


// orbit
import { DottedCircle } from '../../../../assets/svgs/index'

// others
import userSVG from '../../../../assets/icons/user.svg'

// logos
import htmlSVG from '../../../../assets/logos/html.svg'
import cssSVG from '../../../../assets/logos/css.svg'
import jsSVG from '../../../../assets/logos/js.svg'
import tsSVG from '../../../../assets/logos/ts.svg'
import reactSVG from '../../../../assets/logos/react.svg'
import nodejsSVG from '../../../../assets/logos/nodejs-icon.svg'
import npmSVG from '../../../../assets/logos/npm.svg'
import s3SVG from '../../../../assets/logos/s3.svg'
import codebuildSVG from '../../../../assets/logos/codebuild.svg'
import codepipelineSVG from '../../../../assets/logos/codepipeline.svg'
import ethSVG from '../../../../assets/logos/eth.svg'

const ORBIT_ITEMS: {
  src: string,
  alt: string,
}[] = [
    {
      src: htmlSVG,
      alt: 'html',
    },
    {
      src: cssSVG,
      alt: 'css',
    },
    {
      src: jsSVG,
      alt: 'js',
    },
    {
      src: tsSVG,
      alt: 'ts',
    },
    {
      src: reactSVG,
      alt: 'react',
    },
    {
      src: nodejsSVG,
      alt: 'nodejs',
    },
    {
      src: npmSVG,
      alt: 'npm',
    },
    {
      src: s3SVG,
      alt: 's3',
    },
    {
      src: codebuildSVG,
      alt: 'codebuild',
    },
    {
      src: codepipelineSVG,
      alt: 'codepipeline',
    },
    {
      src: ethSVG,
      alt: 'eth',
    }
  ]

interface PortfolioDeveloperProps {
  className?: string
}

export const PortfolioDeveloper: React.FC<PortfolioDeveloperProps> = ({
  className
}) => {
  // class
  const classes = classNames('sub-section sub-section__dev', styles.dev, className)
  const devSectionRef = React.useRef<HTMLDivElement | null>(null)

  const DOTTED_CIRCLE_PATH = '#dottedCirclePath'

  // start orbit
  const initiateItemOrbit = () => {
    // convert to path or breaks
    MotionPathPlugin.convertToPath(DOTTED_CIRCLE_PATH)

    // vars
    const dur = 25
    const orbitItems = gsap.utils.toArray('.orbit-item')
    const nItems = orbitItems.length
    /*
      later: have some nice effect for the on hover of orbit items, interactive hopefully
    */
    // set orbit 
    orbitItems.forEach((item: any, idx) => {
      const _start = Number((idx / nItems).toFixed(2))
      const _end = Number(((idx / nItems) + 1).toFixed(2))

      gsap.timeline()
        .fromTo(item, {
          opacity: 0
        }, {
          opacity: 1,
          duration: 0.5,
        })
        .to(item, {
          motionPath: {
            path: DOTTED_CIRCLE_PATH,
            align: DOTTED_CIRCLE_PATH,
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: _start,
            end: _end,
          },
          immediateRender: true,
          ease: 'none',
          duration: dur,
          repeat: -1,
        }, '-=0.5')
    })
  }

  // orbit timeline
  const orbitTimeline = () => {
    return gsap.timeline()
      .from('#orbit-items-container', {
        scale: 0,
        autoAlpha: 0,
        onComplete: () => {
          initiateItemOrbit()
        }
      })
      .to('#orbit-items-container', {
        scale: 1,
        autoAlpha: 1,
        duration: 2,
        ease: 'expo.inOut',
      })
  }


  // draggable registration
  const registerDraggableWindows = () => {
    const draggableWindows = gsap.utils.toArray('.window__dev')

    draggableWindows.forEach((window: any, index: any) => {
      const mainWindow = new Draggable(window, {
        trigger: `#window-header-${index}`,
        type: 'x,y',
        edgeResistance: 1,
        bounds: '.sub-section__dev',
      })
    })

  }


  // orbit mechanics
  React.useLayoutEffect(() => {
    // register
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, Draggable)
    // orbit timeline
    // orbitTimeline()
    // windows
    // registerDraggableWindows()
  }, [])


  return <>
    <section className={classes} ref={devSectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={classNames(styles.title, 'title__sub-section', 'text__bold')}>
            Web Developer
          </h2>
          <CircleIcon
            className={styles.icon}
            src={laptopSVG}
            alt='laptop'
          />
        </div>
        <div className={styles.body}>
          <div className={styles.left}>
            <Window
              className={classNames(styles.window, 'window__dev')}
              windowTitle='Tien Powershell'
              windowStyle='dark'
              referenceKey='0'
              boundaryContainer='.sub-section__dev'
            >

            </Window>


          </div>
          <div className={styles.right}>
            {/* <Window
              className={classNames(styles.window, 'window__dev')}
              windowTitle='Tien Powershell'
              windowStyle='light'
              referenceKey='1'
            >
              <div id='orbit-container' className={styles.orbitContainer}>
                <div id='orbit-items-container' className={styles.orbitItemsContainer}>
                  <DottedCircle
                    className={styles.orbitCircle}
                    id='developer-circle'
                    pathId={DOTTED_CIRCLE_PATH.slice(1)}
                  />

                  {ORBIT_ITEMS.map((item: { src: string, alt: string }, idx: number | string) => {
                    return <div className={classNames(styles.item, 'orbit-item')} key={idx}>
                      <img src={item.src} alt={item.alt} />
                    </div>
                  })}
                </div>

                <img className={classNames(styles.item__center, 'orbit-center')} src={userSVG} alt='user' />
              </div>
            </Window> */}

          </div>
        </div>
      </div>
    </section >
  </>
}