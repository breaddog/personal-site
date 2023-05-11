import styles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import {
  TopProjectSection,
  TopDownProjectSection,
  LeftRightProjectSection,
  TextProject
} from '../../Components'
import { ProjectObject } from '../../../../../data/projects'

interface DefaultProjectTemplateProps {
  project: ProjectObject
}

export const DefaultProjectTemplate: React.FunctionComponent<
  DefaultProjectTemplateProps
> = ({ project }) => {
  return (
    <div className={styles.container}>
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
