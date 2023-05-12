import styles from './Top.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { TextProject } from '../Text'
import { ProjectObject } from '../../../../../data/projects'
import { map } from 'lodash'

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
          <span className={styles.infoTitle}>Role(s):</span>
          <div className={styles.roles}>
            {map(project?.role, (role: string, idx: string | number) => (
              <span
                className={styles.value}
                key={idx}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <span className={styles.infoTitle}>Type:</span>
          <span className={styles.value}>{project.scope}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.infoTitle}>Date:</span>
          <span className={styles.value}>{project.year}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.infoTitle}>Site:</span>
          <span className={styles.value}>{project.url}</span>
        </div>

        <div className={styles.description}>
          <div className={styles.title}>Description</div>
          <p className={projectStyles.text}>{project.description}</p>
        </div>
      </div>
    </div>
  )
}
