import styles from './Banner.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { LazyLoadImage } from 'react-lazy-load-image-component'

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
      <LazyLoadImage
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
