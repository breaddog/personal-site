import styles from '../../Project.module.scss'
import React from 'react'

import {
  TopProjectSection,
  TopDownProjectSection,
  LeftRightProjectSection
} from '../../Components'
import { ProjectObject } from '../../../../data/projects'

interface DefaultProjectTemplateProps {
  project: ProjectObject
}

export const DefaultProjectTemplate: React.FunctionComponent<
  DefaultProjectTemplateProps
> = ({ project }) => {
  return (
    <div className={styles.container}>
      {/* <TopProjectSection
        project={project}
        content=''
      />
      <TopDownProjectSection
        project={project}
        content=''
      />

      <LeftRightProjectSection
        project={project}
        content=''
      /> */}
    </div>
  )
}
