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
  imageClassName?: string
  src: string
  alt: string
  caption?: string | JSX.IntrinsicElements
  key?: string | number
  containerStyle?: React.CSSProperties
}

export const ImageProjectSection: React.FunctionComponent<
  ImageProjectSectionProps
> = (props) => {
  const {
    className,
    imageClassName,
    src,
    alt,
    effect = 'blur',
    width = '100%',
    height = '90%',
    caption = '',
    containerStyle,
    key,
  } = props

  const classes = classNames(styles.container, className)
  const imageClasses = classNames(styles.image, imageClassName)

  return (
    <div
      className={classes}
      key={key}
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
