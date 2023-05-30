import styles from './Image.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'
import {
  LazyLoadImage,
  LazyLoadImageProps
} from 'react-lazy-load-image-component'

export interface ImageProjectSectionProps extends LazyLoadImageProps {
  className?: string
  imageclassname?: string
  src: string
  alt: string
  caption?: string | JSX.IntrinsicElements
  componentKey?: string | number
  containerStyle?: React.CSSProperties
}

export const ImageProjectSection: React.FunctionComponent<
  ImageProjectSectionProps
> = (props) => {
  const {
    className,
    imageclassname,
    src,
    alt,
    effect = 'blur',
    width = '100%',
    height = '90%',
    caption = '',
    containerStyle,
    componentKey,
  } = props

  const classes = classNames(styles.container, className)
  const imageClasses = classNames(styles.image, imageclassname)

  return (
    <div
      className={classes}
      key={componentKey}
      style={containerStyle}
    >
      <LazyLoadImage
        {...props}
        className={imageClasses}
        src={src}
        alt={alt}
        effect={effect}
        width={width}
        height={height}
      />
      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  )
}
