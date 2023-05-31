import styles from './OnClickAnimation.module.scss'
import React from 'react'
import classNames from 'classnames'

import { delay } from 'lodash'

interface OnClickAnimationProps {
  className?: string
  animation: {
    animatingClass: string
    name?: string | null
    duration?: number
    timingFunction?: string
    iterationCount?: number | string
    onStart?: Function
    onComplete?: Function
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
    onStart = () => {},
    onComplete = () => {},
    name = null,
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
    onStart()

    delay(() => {
      setAnimating(false)
      onComplete()
    }, duration)
  }

  const getStyles = () => {
    const _styles: {
      [key: string]: string | number
    } = {
      animationDuration: `${duration}ms`,
      animationTimingFunction: timingFunction,
      animationIterationCount: iterationCount,
    }

    // name addition
    if (name) {
      _styles.animationName = name
    }

    return _styles
  }

  return (
    <div
      className={classes}
      onClick={() => handleToggleAnimation()}
      style={getStyles()}
    >
      {children}
    </div>
  )
}
