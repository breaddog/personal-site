import styles from './MultiImageContainer.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'
import { ImageProjectSection, ImageProjectSectionProps } from '../Image'
import { map } from 'lodash'
import { roundToNearestUnit } from '../../../../shared'
import { AppContext } from '../../../../App'

interface MultiProjectImageContainerProps {
  className?: string
  imageClassName?: string
  images: Omit<ImageProjectSectionProps, 'className'>[]
}

export const MultiProjectImageContainer: React.FunctionComponent<
  MultiProjectImageContainerProps
> = ({ className, imageClassName, images }) => {
  const { isMobile } = React.useContext(AppContext)
  const [useCalculation, setUseCalculation] = React.useState<boolean>(false)

  const calculateWidthDivision = (adjustment: number) => {
    const nImages = images.length
    const divvy = Number(Math.ceil(100 / nImages))
    return roundToNearestUnit(divvy, 10) + adjustment
  }

  const handleCalculationListener = () => {
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
          imageClassName: classNames(styles.image, imageClassName),
        }

        if (useCalculation) {
          imageProps.containerStyle = {
            width: `${calculateWidthDivision(-5)}%`,
          }
        }

        // TO DO: add adjustment to ignore if on smaller screen sizes
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
