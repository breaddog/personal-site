import styles from './MagneticBox.module.scss'
import React from 'react'
import classNames from 'classnames'

import gsap from 'gsap'
import { AppContext } from '../../../App'

interface MagneticBoxProps {
  className?: string
  innerBoxClassName?: string
  children?: React.ReactNode
  duration?: number
  disable?: boolean
}

export const MagneticBox: React.FC<MagneticBoxProps> = ({
  className,
  innerBoxClassName,
  children,
  duration = 0.8,
  disable = false,
}) => {
  const classes = classNames('magnetic-box', styles.box, className)
  const magneticAreaRef = React.useRef<HTMLDivElement | null>(null)
  const magneticBodyRef = React.useRef<HTMLDivElement | null>(null)
  const { isMobile } = React.useContext(AppContext)

  // handle movement within boundaries
  const magneticMouseEnterEffect = (e: any, movement: number = 1) => {
    console.log('inside', isMobile, disable)

    if (isMobile || disable) return
    if (!magneticBodyRef.current || !magneticAreaRef.current) return
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const boundingRect = magneticAreaRef.current.getBoundingClientRect()
    const halfDiff = Math.abs(boundingRect.width - boundingRect.height) / 2
    const relX = e.pageX - boundingRect.left - halfDiff
    const relY = e.pageY - boundingRect.top

    gsap.to(magneticBodyRef.current, {
      x: (relX - boundingRect.width / 2) * movement,
      y: (relY - boundingRect.height / 2 - scrollTop) * movement,
      ease: 'power1',
      duration,
    })
  }

  // handle on leave (reset)
  const magneticMouseLeaveEffect = () => {
    if (isMobile || disable) return
    if (!magneticBodyRef.current) return
    gsap.to(magneticBodyRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      ease: 'power3',
      duration,
    })
  }

  return (
    <div className={classes}>
      <div
        className={classNames('magnetic-area', styles.area)}
        ref={magneticAreaRef}
        onMouseMove={(e) => magneticMouseEnterEffect(e)}
        onMouseLeave={() => magneticMouseLeaveEffect()}
      >
        <div
          className={classNames(
            'magnetic-body',
            styles.body,
            innerBoxClassName
          )}
          ref={magneticBodyRef}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
