import styles from './MultiImageContainer.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'
import { ImageProjectSection, ImageProjectSectionProps } from '../Image'
import { map } from 'lodash'
import { handleDesktopListener, roundToNearestUnit } from '../../../../shared'
import { AppContext } from '../../../../App'

interface MultiProjectImageContainerProps {
  className?: string
  imageclassname?: string
  images: Omit<ImageProjectSectionProps, 'className'>[]
}

export const MultiProjectImageContainer: React.FunctionComponent<
  MultiProjectImageContainerProps
> = ({ className, imageclassname, images }) => {
  const { isMobile } = React.useContext(AppContext)
  // const flexMatcher = window.matchMedia('(max-with: 1100px)')
  const [useCalculation, setUseCalculation] = React.useState<boolean>(false)

  const calculateWidthDivision = (adjustment: number) => {
    const nImages = images.length
    const divvy = Number(Math.ceil(100 / nImages))
    return roundToNearestUnit(divvy, 10) + adjustment
  }

  const handleCalculationListener = () => {
    // handleDesktopListener(
    //   flexMatcher,
    //   useCalculation,
    //   setUseCalculation
    // )
    if (isMobile && useCalculation) {
      setUseCalculation(false)
    }

    if (!isMobile && !useCalculation) {
      setUseCalculation(true)
    }
  }

  React.useEffect(() => {
    handleCalculationListener()
    window.addEventListener('resize', handleCalculationListener)
    return () => {
      window.addEventListener('resize', handleCalculationListener)
    }
  }, [isMobile, useCalculation])

  const classes = classNames(projectStyles.section, styles.container, className)

  return (
    <div className={classes}>
      {map(images, (_props: ImageProjectSectionProps, idx: number) => {
        const imageProps = {
          ..._props,
          width: '100%',
          height: '100%',
          className: classNames(styles.imageContainer, _props.className),
          imageclassname: classNames(styles.image, imageclassname),
        }

        if (useCalculation) {
          imageProps.containerstyle = {
            width: `${calculateWidthDivision(-4 * (images?.length ?? 1))}%`,
          }
        }

        return (
          <ImageProjectSection
            {...imageProps}
            key={idx}
          />
        )
      })}
    </div>
  )
}
