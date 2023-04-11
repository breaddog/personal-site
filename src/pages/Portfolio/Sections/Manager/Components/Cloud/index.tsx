import styles from './Cloud.module.scss'
import React from 'react'
import classNames from 'classnames'

import cloudSVG from '../../../../../../assets/misc/cloud.svg'

interface CloudProps {
  className?: string,
  key?: string | number
}

export const Cloud: React.FC<CloudProps> = ({
  className,
  key
}) => {
  const classes = classNames(styles.cloud, className)

  return <img
    className={classes}
    src={cloudSVG}
    alt='cloud'
    key={key}
  />
}