import classNames from 'classnames'
import React from 'react'
import styles from '../../Project.module.scss'
import erc20Styles from './ERC20Project.module.scss'

import { ProjectObject } from '../../../../data/projects'

import { map } from 'lodash'
import { generateProjectBodyElement } from '../../helpers'
import { BodyContentProps, ExtraInfoWrapperProps } from '../../types'

export interface ERC20ProjectProps {
  className?: string
  componentkey?: string
  project: ProjectObject
  extraInfo?: ExtraInfoWrapperProps[]
  overrideExtraInfo?: boolean
}

export const ERC20Project: React.FunctionComponent<ERC20ProjectProps> = ({
  className,
  componentkey,
  project,
  extraInfo = [],
  overrideExtraInfo = false,
}) => {
  const classes = classNames(erc20Styles.project, styles.container, className)

  const extraInfoCombined: ExtraInfoWrapperProps[] = [...extraInfo]

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
          extraInfo: overrideExtraInfo ? extraInfo : extraInfoCombined,
        })
      })}
    </div>
  )
}
