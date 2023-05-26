import styles from './ToggleSlider.module.scss'
import React from 'react'
import classNames from 'classnames'

interface ToggleSliderProps {
  className?: string
  isActive?: boolean
  onSlide: Function
  style?: React.CSSProperties | undefined
}

export const ToggleSlider: React.FunctionComponent<ToggleSliderProps> = ({
  className,
  isActive,
  onSlide,
  style,
}) => {
  const classes = classNames(
    styles.slider,
    isActive && styles.active,
    className
  )

  const handleToggle = () => {
    onSlide()
  }

  return (
    <div
      className={classes}
      style={style}
      onClick={() => handleToggle()}
    >
      <div className={styles.dot}></div>
    </div>
  )
}
