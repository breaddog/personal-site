import styles from './TopDown.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'
import { ProjectObject } from '../../../../data/projects'
import { TextProject } from '../Text'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface TopDownProjectSectionProps {
  className?: string
  project: ProjectObject
  imagePlacement?: 'top' | 'bottom'
}

export const TopDownProjectSection: React.FunctionComponent<
  TopDownProjectSectionProps
> = ({ className, project, imagePlacement }) => {
  const classes = classNames(
    projectStyles.section,
    styles.topdown,
    styles[String(imagePlacement)],
    className
  )

  const textClasses = classNames(projectStyles.text, styles.text)

  return (
    <div className={classes}>
      <div className={projectStyles.banner}>
        <LazyLoadImage
          className={classNames(projectStyles.img, projectStyles.contain)}
          src={project.asset}
          alt={project.alt}
          effect='blur'
          width={'100%'}
          height={'inherit'}
        />
      </div>
      <TextProject className={textClasses}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </TextProject>
    </div>
  )
}
