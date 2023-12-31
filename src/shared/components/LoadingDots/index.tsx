import styles from './LoadingDots.module.scss'
import React from 'react'
import classNames from 'classnames'

interface LoadingDotsProps {
  className?: string
  nDots?: number
  delay?: number
  text?: string
  color?: string
  active?: boolean
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  className = '',
  nDots = 3,
  delay = 1000,
  text = '',
  color = 'white', // hex or string
  active = true,
}) => {
  const classes = classNames(styles.loadingDots, className)
  const dotsRef = React.useRef<any>(null)

  React.useEffect(() => {
    let interval = setInterval(() => {
      if (active) {
        const dots = dotsRef.current.innerHTML
        if (dots.length < nDots) {
          dotsRef.current.innerHTML += '.'
        } else {
          dotsRef.current.innerHTML = ''
        }
      }
    }, delay)

    return () => {
      interval && clearInterval(interval)
    }
  }, [dotsRef, active])

  return (
    <span className={classes}>
      <span
        style={{
          color: color,
        }}
      >
        {text}
      </span>
      <span
        className={styles.dots}
        style={{
          color: color,
        }}
        ref={dotsRef}
      ></span>
    </span>
  )
}
