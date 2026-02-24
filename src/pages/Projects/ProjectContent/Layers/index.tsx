import classNames from 'classnames'
import React from 'react'
import styles from '../../Project.module.scss'
import layersStyles from './Layers.module.scss'

import { PROJECTS, ProjectObject } from '../../../../data/projects'

import { map } from 'lodash'
import { generateProjectBodyElement } from '../../helpers'
import {
  BodyContentProps,
  ExtraInfoInterface,
  ExtraInfoWrapperProps,
} from '../../types'
import { BODY_CONTENT_LAYERS, LAYERS_LINKS } from './content'
interface LayersProjectProps {
  key?: string
}

// for artball its more efficient to make it a custom one due to multi-project
export const LayersProject: React.FunctionComponent<LayersProjectProps> = ({
  key,
}) => {
  const project: ProjectObject = PROJECTS.layers

  // classes
  const classes = classNames(layersStyles.layers, styles.container)

  // top extra information
  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'LAYERS on Opensea',
      value: 'View Here',
      isLink: true,
      link: {
        url: project?.eth?.opensea ?? '',
        title: 'LAYERS on Opensea',
      },
    },
    {
      title: 'Tears on Opensea',
      value: 'View Here',
      isLink: true,
      link: {
        url: LAYERS_LINKS.openseaTears,
        title: 'Tears on Opensea',
      },
    },
  ]

  // extra info wrapper
  const extraLayersInfo: ExtraInfoWrapperProps[] = [
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
      {map(BODY_CONTENT_LAYERS, (body: BodyContentProps, idx: number) => {
        return generateProjectBodyElement({
          body,
          project,
          key: idx,
          extraInfo: extraLayersInfo,
        })
      })}
    </div>
  )
}
