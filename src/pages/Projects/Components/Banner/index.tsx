import styles from './Banner.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { Image } from '../../../../shared/components'

interface BannerProjectSectionProps {
  className?: string
  src?: string
  alt?: string
}

export const BannerProjectSection: React.FunctionComponent<
  BannerProjectSectionProps
> = ({ className, src = '', alt = '' }) => {
  const classes = classNames(
    projectStyles.banner,
    projectStyles.top,
    styles.banner,
    className
  )

  return (
    <div className={classes}>
      <Image
        className={projectStyles.img}
        alt={alt}
        src={src}
        effect='blur'
        width={'100%'}
        height={'inherit'}
      />
    </div>
  )
}
