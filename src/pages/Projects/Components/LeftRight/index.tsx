import styles from './LeftRight.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'
import { ProjectObject } from '../../../../data/projects'
import { TextProject } from '../Text'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { ProjectSectionHeader } from '../Header'

interface LeftRightProjectSectionProps {
  className?: string
  headerText?: string
  imagePlacement?: 'left' | 'right'
  project: ProjectObject
}

export const LeftRightProjectSection: React.FunctionComponent<
  LeftRightProjectSectionProps
> = ({ className, headerText, project, imagePlacement }) => {
  const classes = classNames(
    projectStyles.section,
    styles.leftRight,
    styles[String(imagePlacement)],
    className
  )

  const textClasses = classNames(projectStyles.text, styles.text)
  const imageClasses = classNames(projectStyles.image, styles.image)

  return (
    <div className={classes}>
      {headerText && (
        <ProjectSectionHeader className={projectStyles.header}>
          {headerText}
        </ProjectSectionHeader>
      )}

      <div className={classNames(styles.body, styles[String(imagePlacement)])}>
        <TextProject className={textClasses}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </TextProject>
        <div className={imageClasses}>
          <LazyLoadImage
            src={project.asset}
            alt={project.alt}
            effect='blur'
          />
        </div>
      </div>
    </div>
  )
}
