import styles from './OnClickAnimation.module.scss'
import React from 'react'
import classNames from 'classnames'

import { delay } from 'lodash'

interface OnClickAnimationProps {
  className?: string
  animation: {
    animatingClass: string
    duration?: number
    timingFunction?: string
    iterationCount?: number | string
  }
  children?: React.ReactNode
}

// use for cosmetic purposes only
export const OnClickAnimation: React.FC<OnClickAnimationProps> = ({
  className,
  animation,
  children,
}) => {
  // animation props
  const [animating, setAnimating] = React.useState<boolean>(false)

  const {
    animatingClass,
    duration = 600,
    timingFunction = 'linear',
    iterationCount = 1,
  } = animation

  const classes = classNames(
    styles.animation,
    animating && animatingClass,
    className
  )

  // toggle animation
  const handleToggleAnimation = () => {
    if (animating) return
    setAnimating(true)

    delay(() => {
      setAnimating(false)
    }, duration)
  }

  return (
    <div
      className={classes}
      onClick={() => handleToggleAnimation()}
      style={{
        animationDuration: `${duration}`,
        animationTimingFunction: timingFunction,
        animationIterationCount: iterationCount,
      }}
    >
      {children}
    </div>
  )
}
