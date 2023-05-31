import styles from '../../Project.module.scss'
import React from 'react'

// import {
//   TopProjectSection,
//   TopDownProjectSection,
//   LeftRightProjectSection
// } from '../../Components'
import { ProjectObject } from '../../../../data/projects'

interface DefaultProjectTemplateProps {
  project: ProjectObject
}

// FUTURE: re-visit this if can afford server hosted/db hosted content
export const DefaultProjectTemplate: React.FunctionComponent<
  DefaultProjectTemplateProps
> = ({
  // eslint-disable-next-line
  project,
}) => {
  return <div className={styles.container}></div>
}
