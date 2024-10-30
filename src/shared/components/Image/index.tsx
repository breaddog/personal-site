import styles from './Image.module.scss'
import React, { ImgHTMLAttributes } from 'react'
import classNames from 'classnames'
// import { delay, isNull, isUndefined } from 'lodash'
// import { AppContext } from '../../../App'

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onLoad'> {}

/*
  initially wanted to do a loading bar but lazyload would be better
*/
export const Image: React.FunctionComponent<ImageProps> = (props) => {
  // const {
  //   loadingRef
  // } = React.useContext(AppContext)
  // const loadingRefCurrent = loadingRef?.current

  // // contingency
  // const [notAdded, setNotAdded] = React.useState<boolean>(false)

  // // before loading
  // const handleBeforeLoad = () => {
  //   if (isNull(loadingRefCurrent)) {
  //     return setNotAdded(true)
  //   }

  //   delay(() => loadingRefCurrent?.incrementAssetsToLoad(), 200)
  //   // !isUndefined(props?.beforeLoad) && props?.beforeLoad()
  // }

  // // on load
  // const handleOnLoad = (e: any) => {
  //   // in case it got failed to be added, add it to avoid inifnity issues
  //   if (notAdded) {
  //     loadingRefCurrent?.incrementAssetsToLoad()
  //   }
  //   delay(() => loadingRefCurrent?.incrementAssetsLoaded(), 2000)
  //   // !isUndefined(props?.onLoad) && props?.onLoad(e)
  // }

  const classes = classNames(styles.image, props.className)

  return (
    <img
      {...props}
      className={classes}
      loading='lazy'
    />
  )
  // return (
  //   <LazyLoadImage
  //     {...props}
  //     // beforeLoad={() => handleBeforeLoad()}
  //     // onLoad={(e: any) => handleOnLoad(e)}
  //     className={classes}
  //     effect={props.effect ?? 'blur'}
  //   />
  // )
}
