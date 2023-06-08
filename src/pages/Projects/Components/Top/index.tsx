import styles from './Top.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { TextProject } from '../Text'
import { ProjectObject } from '../../../../data/projects'
import { map } from 'lodash'
import { Hyperlink } from '../../../../shared/components'
import { ProjectSectionContentType, ExtraInfoInterface } from '../../types'

interface TopProjectSectionProps {
  className?: string
  project: ProjectObject
  content: ProjectSectionContentType
  extraInfo?: ExtraInfoInterface[]
}

export const TopProjectSection: React.FunctionComponent<
  TopProjectSectionProps
> = ({ className, project, content, extraInfo }) => {
  const classes = classNames(projectStyles.section, styles.top, className)

  return (
    <div className={classes}>
      <div className={styles.left}>
        <div className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
          <h3 className={styles.organisation}>{project.organisation}</h3>
        </div>

        <TextProject>{content}</TextProject>
      </div>

      <div className={styles.right}>
        <div className={classNames(styles.info, styles.infoheader)}>
          <span className={styles.title}>INFORMATION</span>
        </div>
        <div className={styles.info}>
          <span className={styles.title}>Role(s):</span>
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
          <span className={styles.title}>Type:</span>
          <span className={styles.value}>{project.scope}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.title}>Date:</span>
          <span className={styles.value}>{project.year}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.title}>Site:</span>
          <Hyperlink className={styles.value}>
            <a
              href={project.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              {project.url}
            </a>
          </Hyperlink>
        </div>

        <div className={classNames(styles.info, styles.responsibilities)}>
          <div className={styles.title}>Responsibilities</div>
          <ul className={styles.body}>
            {map(project.responsibilities, (el: string, idx: number) => {
              return (
                <li
                  className={styles.value}
                  key={idx}
                >
                  {el}
                </li>
              )
            })}
          </ul>
        </div>

        {/* extra info */}
        {map(extraInfo, (info: ExtraInfoInterface, idx: number) => (
          <div
            className={classNames(
              styles.info,
              info?.isHeader && styles.infoheader
            )}
            key={idx}
          >
            <span className={styles.title}>
              {info.title}
              {!info?.isHeader && ':'}
            </span>
            {info?.isLink ? (
              <Hyperlink className={styles.value}>
                <a
                  href={info.link?.url}
                  rel='noopener noreferrer'
                  target='_blank'
                  title={info.link?.title}
                >
                  {info?.value}
                </a>
              </Hyperlink>
            ) : (
              <span className={styles.value}>{info.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
