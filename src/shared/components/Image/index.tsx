import styles from './Image.module.scss'
import React from 'react'
import {
  LazyLoadImage,
  LazyLoadImageProps
} from 'react-lazy-load-image-component'
import classNames from 'classnames'
import { isUndefined } from 'lodash'

interface ImageProps extends LazyLoadImageProps {}

// TO DO: hook this up to load via toload and other components
export const Image: React.FunctionComponent<ImageProps> = (props) => {
  const classes = classNames(styles.image, props.className)

  const handleOnLoad = (e: any) => {
    !isUndefined(props?.onLoad) && props?.onLoad(e)
  }

  return (
    <LazyLoadImage
      {...props}
      className={classes}
      onLoad={(e: any) => handleOnLoad(e)}
    />
  )
}
