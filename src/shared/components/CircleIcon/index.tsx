import styles from './CircleIcon.module.scss'
import React from 'react'
import classNames from 'classnames'
import { filter, map } from 'lodash'
import { GenericAOSInterface, filterAOSProps } from '../../AOS'

interface CircleIconProps {
  className?: string
  src: string
  alt?: string
  backgroundColour?: string
  onClick?: Function
}

export const CircleIcon: React.FC<CircleIconProps> = (
  props: React.PropsWithChildren<CircleIconProps>
) => {
  const { className, backgroundColour, src, alt, onClick = () => {} } = props

  const classes = classNames(styles.circleIcon, className)

  // AOS interface
  const aos_props = filterAOSProps(props)

  return (
    <div
      className={classes}
      style={{
        backgroundColor: backgroundColour,
      }}
      onClick={() => onClick()}
      {...aos_props}
    >
      <img
        src={src}
        alt={alt || ''}
      />
    </div>
  )
}
