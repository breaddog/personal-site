import styles from './CircularText.module.scss'
import React from 'react'
import classNames from 'classnames'

import { RotationDirection } from '../../types/effects'

export interface CircularTextProps {
  className?: string
  text?: string | React.ReactFragment | Element
  duration?: number
  direction?: RotationDirection
  fontSize?: string
}

export const CircularText: React.FunctionComponent<CircularTextProps> = ({
  className,
  text = 'Sample Text Defined Here',
  duration = 10,
  direction = 'clockwise',
  fontSize = '1rem',
}) => {
  const classes = classNames(styles.parent, className)

  return (
    <div className={classes}>
      <svg
        className={classNames(styles.svg, styles[direction])}
        viewBox='0 0 100 100'
        width='100'
        height='100'
        style={{
          animationDuration: `${duration}ms`,
        }}
      >
        <defs>
          <path
            id='circularTextCircle'
            d='
            M 50, 50
            m -37, 0
            a 37,37 0 1,1 74,0
            a 37,37 0 1,1 -74,0'
          />
        </defs>
        <text className={styles.text}>
          <textPath
            xlinkHref='#circularTextCircle'
            style={{
              fontSize,
            }}
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
