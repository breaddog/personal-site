import styles from './LeftRight.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'
import { TextProject } from '../Text'
import { HeaderProjectSection } from '../Header'
import {
  ProjectSectionGenericProps,
  ProjectSectionImagePlacement
} from '../../types'
import { ImageProjectSection, ImageProjectSectionProps } from '../Image'

export type LeftRightImagePlacement = Extract<
  ProjectSectionImagePlacement,
  'left' | 'right'
>
export type LeftRightImageProps = Omit<
  ImageProjectSectionProps,
  'className'
> & {
  placement: LeftRightImagePlacement
}

interface LeftRightProjectSectionProps
  extends Omit<ProjectSectionGenericProps, 'image'> {
  image?: LeftRightImageProps
}

export const LeftRightProjectSection: React.FunctionComponent<
  LeftRightProjectSectionProps
> = ({ className, headerText, content, image = {} }) => {
  const { src = '', alt = '', caption = '', placement = 'left' } = image

  const classes = classNames(
    projectStyles.section,
    styles.leftRight,
    styles[String(placement)],
    className
  )

  const textClasses = classNames(projectStyles.text, styles.text)
  const imageClasses = classNames(projectStyles.image, styles.imageContainer)

  return (
    <div className={classes}>
      {headerText && (
        <HeaderProjectSection className={projectStyles.header}>
          {headerText}
        </HeaderProjectSection>
      )}
      <div className={classNames(styles.body, styles[String(placement)])}>
        <ImageProjectSection
          className={imageClasses}
          imageclassname={classNames(projectStyles.img, projectStyles.contain)}
          src={src}
          alt={alt}
          caption={caption}
          effect='blur'
          width={'100%'}
        />
        <TextProject className={textClasses}>{content}</TextProject>
      </div>
    </div>
  )
}
