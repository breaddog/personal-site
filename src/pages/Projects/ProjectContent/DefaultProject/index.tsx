import defaultProjectStyles from './DefaultProject.module.scss'
import styles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { ProjectObject } from '../../../../data/projects'

import { map } from 'lodash'
import { BodyContentProps, ExtraInfoWrapperProps } from '../../types'
import { generateProjectBodyElement } from '../../helpers'

export interface DefaultProjectProps {
  className?: string
  componentkey?: string
  project: ProjectObject
  extraInfo?: ExtraInfoWrapperProps[]
  overrideExtraInfo?: boolean
}

export const DefaultProject: React.FunctionComponent<DefaultProjectProps> = ({
  className,
  componentkey,
  project,
  extraInfo = [],
}) => {
  const classes = classNames(
    defaultProjectStyles.project,
    styles.container,
    className
  )

  return (
    <div
      className={classes}
      key={componentkey}
    >
      {map(project.body, (body: BodyContentProps, idx: number) => {
        return generateProjectBodyElement({
          body,
          project,
          key: idx,
          extraInfo: extraInfo ?? null,
        })
      })}
    </div>
  )
}
