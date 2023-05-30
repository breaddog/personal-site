import styles from './TopDown.module.scss'
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

// helpers
export type TopDownImagePlacement = Extract<
  ProjectSectionImagePlacement,
  'top' | 'bottom'
>
export type TopDownImageProps = Omit<ImageProjectSectionProps, 'className'> & {
  placement: TopDownImagePlacement
}

// main
export interface TopDownProjectSectionProps
  extends Omit<ProjectSectionGenericProps, 'image'> {
  image?: TopDownImageProps
}

export const TopDownProjectSection: React.FunctionComponent<
  TopDownProjectSectionProps
> = ({ className, headerText, content, image = {} }) => {
  const { src = '', alt = '', caption = '', placement = 'bottom' } = image
  const classes = classNames(projectStyles.section, styles.topdown, className)

  const textClasses = classNames(projectStyles.text, styles.text)

  return (
    <div className={classes}>
      {headerText && (
        <HeaderProjectSection className={projectStyles.header}>
          {headerText}
        </HeaderProjectSection>
      )}
      <div className={classNames(styles.body, styles[String(placement)])}>
        <ImageProjectSection
          className={classNames(projectStyles.banner, styles.banner)}
          imageclassname={classNames(projectStyles.img, projectStyles.contain)}
          src={src}
          alt={alt}
          caption={caption}
          effect='blur'
          width={'100%'}
          height={'inherit'}
        />
        <TextProject className={textClasses}>{content}</TextProject>
      </div>
    </div>
  )
}
