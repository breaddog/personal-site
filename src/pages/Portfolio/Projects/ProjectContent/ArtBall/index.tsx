import artballStyles from './ArtBall.module.scss'
import styles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { PROJECTS, ProjectObject } from '../../../../../data/projects'
import {
  LeftRightProjectSection,
  TopDownProjectSection,
  TopProjectSection
} from '../../Components'

interface ArtBallProjectProps {
  key?: string
}

export const ArtBallProject: React.FunctionComponent<ArtBallProjectProps> = ({
  key,
}) => {
  const project: ProjectObject = PROJECTS.artball

  const classes = classNames(artballStyles.artball, styles.container)

  return (
    <div
      className={classes}
      key={key}
    >
      <TopProjectSection project={project} />
      <TopDownProjectSection
        project={project}
        imagePlacement='bottom'
      />

      <LeftRightProjectSection
        project={project}
        imagePlacement='left'
      />
    </div>
  )
}
