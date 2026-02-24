import classNames from 'classnames'
import React from 'react'
import styles from '../../Project.module.scss'
import erc721Styles from './ERC721Project.module.scss'

import { ProjectObject } from '../../../../data/projects'

import { map } from 'lodash'
import { generateProjectBodyElement } from '../../helpers'
import {
  BodyContentProps,
  ExtraInfoInterface,
  ExtraInfoWrapperProps,
} from '../../types'

export interface ERC721ProjectProps {
  className?: string
  componentkey?: string
  project: ProjectObject
  extraInfo?: ExtraInfoWrapperProps[]
  overrideExtraInfo?: boolean
}

export const ERC721Project: React.FunctionComponent<ERC721ProjectProps> = ({
  className,
  componentkey,
  project,
  extraInfo = [],
  overrideExtraInfo = false,
}) => {
  const classes = classNames(erc721Styles.project, styles.container, className)

  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'Opensea Collection',
      value: 'View Here',
      isLink: true,
      link: {
        title: 'View Collection on Opensea',
        url: project.eth?.opensea ?? '',
      },
    },
  ]

  const extraInfoCombined: ExtraInfoWrapperProps[] = [
    {
      type: 'top',
      content: extraWeb3Info,
    },
    ...extraInfo,
  ]

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
