import binkingzStyles from './BinKingz.module.scss'
import React from 'react'
import classNames from 'classnames'

import { PROJECTS, ProjectObject } from '../../../../data/projects'
import { BINKINGZ_CONTRACT_ADDRESS } from '../../../../contracts'

import { BINKINGZ_LINKS, BODY_CONTENT_BINKINGZ } from './content'

import { ERC721Project } from '../ERC721Project'

interface BinKingzProjectProps {
  key?: string
}

export const BinKingzProject: React.FunctionComponent<BinKingzProjectProps> = ({
  key,
}) => {
  const project: ProjectObject = PROJECTS.binkingz
  const classes = classNames(binkingzStyles.binkingz)

  return (
    <ERC721Project
      className={classes}
      key={key}
      project={project}
    />
  )
}
