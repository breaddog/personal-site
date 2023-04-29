import styles from './CircleIcon.module.scss'
import React from 'react'
import classNames from 'classnames'

interface CircleIconProps {
  className?: string
  src: string
  alt?: string
  backgroundColor?: string
  onClick?: Function
}

export const CircleIcon: React.FC<CircleIconProps> = ({
  className,
  src,
  alt = '',
  backgroundColor,
  onClick = () => {},
}) => {
  const classes = classNames(styles.circleIcon, className)
  return (
    <div
      className={classes}
      style={{
        backgroundColor: backgroundColor,
      }}
      onClick={() => onClick()}
    >
      <img
        src={src}
        alt={alt || ''}
      />
    </div>
  )
}
