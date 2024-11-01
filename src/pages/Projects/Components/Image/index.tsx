import styles from './Image.module.scss'
import React from 'react'
import classNames from 'classnames'
import { LazyLoadImageProps } from 'react-lazy-load-image-component'
import { Image } from '../../../../shared/components'

export interface ImageProjectSectionProps extends LazyLoadImageProps {
  className?: string
  imageclassname?: string
  src: string
  alt: string
  caption?: string | JSX.IntrinsicElements
  componentKey?: string | number
  containerstyle?: React.CSSProperties
}

export const ImageProjectSection: React.FunctionComponent<
  ImageProjectSectionProps
> = (props) => {
  const {
    className,
    imageclassname,
    src,
    alt,
    width = '100%',
    height = '90%',
    caption = '',
    containerstyle,
    componentKey,
  } = props

  const classes = classNames(styles.container, className)
  const imageClasses = classNames(styles.image, imageclassname)

  return (
    <div
      className={classes}
      key={componentKey}
      style={containerstyle}
    >
      {/* <LazyLoadImage
        {...props}
        className={imageClasses}
        src={src}
        alt={alt}
        effect={effect}
        width={width}
        height={height}
      /> */}
      <Image
        {...props}
        className={imageClasses}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  )
}
