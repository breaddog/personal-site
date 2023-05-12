import styles from './Project.module.scss'
import sectionStyles from '../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { useParams } from 'react-router-dom'

import { ProjectObject } from '../../../data/projects'
import { fetchProject, fetchProjectContent } from '../../../shared/projects'
import { DefaultProjectTemplate, ErrorProjectTemplate } from './ProjectContent'

interface ProjectPageProps {
  className?: string
  key?: string
}

export const ProjectPage: React.FunctionComponent<ProjectPageProps> = ({
  className,
  key,
}) => {
  const classes = classNames(
    styles.projectPage,
    sectionStyles.section,
    className
  )

  const { projectKey } = useParams<{ projectKey: string }>()
  // loaded
  const [loaded, setLoaded] = React.useState<boolean>(false)

  // project
  const [projectBody, setProjectBody] = React.useState<
    React.ReactNode | React.ReactFragment | null
  >(null)
  const [project, setProject] = React.useState<ProjectObject | null>()

  // fetch project info from stored info
  const retreiveProject = async (_projectKey: string) => {
    const _project = await fetchProject(_projectKey)
    setProject(_project)

    const _projectBody = await fetchProjectContent(_projectKey)
    setProjectBody(_projectBody)
    setLoaded(true)
  }

  // load content
  React.useEffect(() => {
    // only if defined
    if (projectKey && !loaded) {
      retreiveProject(projectKey)
    }
  }, [projectKey, project, projectBody, loaded])

  return null === project ? (
    <ErrorProjectTemplate />
  ) : (
    <div
      className={classes}
      key={key}
    >
      {/* banner is always there */}
      <div className={classNames(styles.banner, styles.top)}>
        <img
          src={project?.asset}
          alt={project?.alt}
        />
      </div>

      {/* FUTURE: template dependent after fetching from server*/}
      {projectBody}
    </div>
  )
}