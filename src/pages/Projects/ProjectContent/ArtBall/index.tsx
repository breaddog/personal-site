import classNames from 'classnames'
import React from 'react'
import styles from '../../Project.module.scss'
import artballStyles from './ArtBall.module.scss'

import { PROJECTS, ProjectObject } from '../../../../data/projects'
// import { useWeb3React } from '@web3-react/core'

import { map } from 'lodash'
import { generateProjectBodyElement } from '../../helpers'
import {
  BodyContentProps,
  ExtraInfoInterface,
  ExtraInfoWrapperProps,
} from '../../types'
import { ARTBALL_LINKS, BODY_CONTENT_ARTBALL } from './content'

interface ArtBallProjectProps {
  key?: string
}

// for artball its more efficient to make it a custom one due to multi-project
export const ArtBallProject: React.FunctionComponent<ArtBallProjectProps> = ({
  key,
}) => {
  const project: ProjectObject = PROJECTS.artball

  // classes
  const classes = classNames(artballStyles.artball, styles.container)

  // top extra information
  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'Opensea Collection',
      value: 'View Here',
      isLink: true,
      link: {
        url: ARTBALL_LINKS.opensea,
        title: 'ArtBall Collection on Opensea',
      },
    },
  ]

  // extra info wrapper
  const extraArtballInfo: ExtraInfoWrapperProps[] = [
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
      {map(BODY_CONTENT_ARTBALL, (body: BodyContentProps, idx: number) => {
        return generateProjectBodyElement({
          body,
          project,
          key: idx,
          extraInfo: extraArtballInfo,
        })
      })}
    </div>
  )
}
