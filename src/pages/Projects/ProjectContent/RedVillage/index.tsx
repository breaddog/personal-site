import classNames from 'classnames'
import React from 'react'
import styles from '../../Project.module.scss'
import redvillageStyles from './RedVillage.module.scss'

import { PROJECTS, ProjectObject } from '../../../../data/projects'
// import { useWeb3React } from '@web3-react/core'

import { map } from 'lodash'
import { generateProjectBodyElement } from '../../helpers'
import {
  BodyContentProps,
  ExtraInfoInterface,
  ExtraInfoWrapperProps,
} from '../../types'
import { BODY_CONTENT_REDVILLAGE, REDVILLAGE_LINKS } from './content'

interface RedVillageProjectProps {
  key?: string
}

// for artball its more efficient to make it a custom one due to multi-project
export const RedVillageProject: React.FunctionComponent<
  RedVillageProjectProps
> = ({ key }) => {
  const project: ProjectObject = PROJECTS.redvillage

  // classes
  const classes = classNames(redvillageStyles.artball, styles.container)

  // top extra information
  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'WEB3 INFORMATION',
      isHeader: true,
      value: null,
    },
    {
      title: 'TRV Champions on Opensea',
      value: 'View Here',
      isLink: true,
      link: {
        url: project?.eth?.opensea ?? '',
        title: 'Champions on Opensea',
      },
    },
    {
      title: 'TRV Summoned on Opensea',
      value: 'View Here',
      isLink: true,
      link: {
        url: REDVILLAGE_LINKS.openseaSummon,
        title: 'Summoned on Opensea',
      },
    },
  ]

  // extra info wrapper
  const extraRedVillageInfo: ExtraInfoWrapperProps[] = [
    {
      type: 'top',
      content: extraWeb3Info,
    },
  ]

  // main
  return (
    <div
      className={classes}
      key={key}
    >
      {map(BODY_CONTENT_REDVILLAGE, (body: BodyContentProps, idx: number) => {
        return generateProjectBodyElement({
          body,
          project,
          key: idx,
          extraInfo: extraRedVillageInfo,
        })
      })}
    </div>
  )
}
