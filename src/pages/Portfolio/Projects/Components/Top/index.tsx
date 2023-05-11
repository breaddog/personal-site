import styles from './Top.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { TextProject } from '../Text'
import { ProjectObject } from '../../../../../data/projects'

interface TopProjectSectionProps {
  className?: string
  project: ProjectObject
}

export const TopProjectSection: React.FunctionComponent<
  TopProjectSectionProps
> = ({ className, project }) => {
  const classes = classNames(projectStyles.section, styles.top, className)

  return (
    <div className={classes}>
      <div className={styles.left}>
        <div className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
          <h3 className={styles.organisation}>{project.organisation}</h3>
        </div>

        <TextProject>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </TextProject>
      </div>

      <div className={styles.right}>
        <div className={styles.info}>
          <span>Role:</span>
          <span>{project.scope}</span>
        </div>

        <div className={styles.info}>
          <span>Date:</span>
          <span>{project.year}</span>
        </div>

        <div className={styles.info}>
          <span>Type:</span>
          <span>{project.year}</span>
        </div>

        <div className={styles.info}>
          <span>Site:</span>
          <span>{project.year}</span>
        </div>

        <div className={styles.description}>
          <div className={styles.title}>Description</div>
          <p className={projectStyles.text}>{project.description}</p>
        </div>
      </div>
    </div>
  )
}
