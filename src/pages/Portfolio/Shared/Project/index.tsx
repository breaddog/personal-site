import styles from './Project.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'
import { ProjectObject, ProjectProps } from '../../../../data/projects'

interface ProjectPageProps {
  className?: string
  key?: string
  project: ProjectObject
}

export const ProjectPage: React.FunctionComponent<ProjectPageProps> = ({
  className,
  key,
  project,
}) => {
  const classes = classNames(
    styles.projectPage,
    sectionStyles.section,
    className
  )
  const projectData: ProjectProps = project.project

  return (
    <div
      className={classes}
      key={key}
    >
      <div className={styles.banner}>
        <img
          src={projectData.asset}
          alt={projectData.alt}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.header}>
              <h1 className={styles.title}>{projectData.title}</h1>
              <h3 className={styles.organisation}>
                {projectData.organisation}
              </h3>
            </div>

            <p className={styles.textTop}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className={styles.right}>
            <div className={styles.info}>
              <span>Role:</span>
              <span>{projectData.scope}</span>
            </div>

            <div className={styles.info}>
              <span>Date:</span>
              <span>{projectData.year}</span>
            </div>

            <div className={styles.info}>
              <span>Type:</span>
              <span>{projectData.year}</span>
            </div>

            <div className={styles.info}>
              <span>Site:</span>
              <span>{projectData.year}</span>
            </div>

            <div className={styles.description}>
              <div className={styles.title}>Description</div>
              <p className={styles.text}>{projectData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
