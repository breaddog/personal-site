import styles from './WaveText.module.scss'
import React from 'react'
import classNames from 'classnames'
import { delay, map } from 'lodash'
import { Keyframes } from '../Keyframes'

interface WaveTextProps {
  className?: string
  componentKey?: string | number
  text: string
  animationDuration?: number
  animationDelay?: number
  animationHeight?: string
  animationName?: string
  onMouseEnter?: Function
}

export const WaveText: React.FunctionComponent<WaveTextProps> = ({
  className,
  text,
  componentKey,
  animationDuration = 2000,
  animationDelay = 150,
  animationHeight = '1.5rem',
  animationName = 'wave',
  onMouseEnter = () => {},
}) => {
  const [animating, setAnimating] = React.useState<boolean>(false)
  const waveTextRef = React.useRef<HTMLDivElement>(null)
  const classes = classNames(
    styles.text,
    animating && styles.animated,
    className
  )

  // main animation func
  const startAnimation = async () => {
    if (animating) return
    setAnimating(true)

    delay(() => {
      setAnimating(false)
    }, animationDuration + text.length * animationDelay)
  }

  const checkIfMidTranslation = () => {
    return waveTextRef?.current?.classList.contains('disabled')
  }

  return (
    <div
      className={classes}
      key={componentKey}
      ref={waveTextRef}
      onMouseEnter={() => {
        if (!checkIfMidTranslation()) {
          startAnimation()
          onMouseEnter()
        }
      }}
    >
      {/* inject styling */}
      <Keyframes
        name='wave'
        animationProps={{
          '0%': 'transform: translateY(0)',
          '30%': `transform: translateY(-${animationHeight})`,
          '60%': `transform: translateY(${animationHeight})`,
          '100%': 'transform: translateY(0)',
        }}
      />
      {map(text ?? '', (letter: string, idx: number) => {
        return (
          <span
            className={styles.letter}
            key={idx}
            style={{
              animationDuration: `${animationDuration}ms`,
              animationDelay: `${animationDelay * idx}ms`,
              animationTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
              animationName:
                animating && !checkIfMidTranslation() ? animationName : 'none',
            }}
          >
            {/* edge case for spaces */}
            {letter === ' ' ? <>&nbsp;</> : letter}
          </span>
        )
      })}
    </div>
  )
}
