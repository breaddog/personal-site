import styles from './MagneticBox.module.scss'
import React from 'react'
import classNames from 'classnames'

import gsap from 'gsap'

interface MagneticBoxProps {
  className?: string
  children?: React.ReactNode
  duration?: number
}

export const MagneticBox: React.FC<MagneticBoxProps> = ({
  className,
  children,
  duration = 0.8,
}) => {
  const classes = classNames('magnetic-box', styles.box, className)

  const magneticAreaRef = React.useRef<HTMLDivElement | null>(null)
  const magneticBodyRef = React.useRef<HTMLDivElement | null>(null)

  // handle movement within boundaries
  const magneticMouseEnterEffect = (e: any, movement: number = 1) => {
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
    if (!magneticBodyRef.current) return
    gsap.to(magneticBodyRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      ease: 'power3',
      duration,
    })
  }

  React.useEffect(() => {
    let _ctx = gsap.context(() => {
      if (!magneticBodyRef.current || !magneticAreaRef.current) return
      magneticAreaRef.current.addEventListener('mousemove', (e: MouseEvent) =>
        magneticMouseEnterEffect(e)
      )
      magneticAreaRef.current.addEventListener('mouseleave', () =>
        magneticMouseLeaveEffect()
      )
    })

    return () => {
      if (!magneticAreaRef.current) return
      magneticAreaRef.current.removeEventListener(
        'mousemove',
        (e: MouseEvent) => magneticMouseEnterEffect(e)
      )
      magneticAreaRef.current.removeEventListener('mouseleave', () =>
        magneticMouseLeaveEffect()
      )
      _ctx.kill()
    }
  }, [magneticAreaRef, magneticBodyRef])

  return (
    <div className={classes}>
      <div
        className={classNames('magnetic-area', styles.area)}
        ref={magneticAreaRef}
      >
        <div
          className={classNames('magnetic-body', styles.body)}
          ref={magneticBodyRef}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
