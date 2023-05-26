import styles from './Project.module.scss'
import sectionStyles from '../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { useParams } from 'react-router-dom'

import { ProjectObject } from '../../../data/projects'
import { fetchProject, fetchProjectContent } from '../../../shared'
import {
  // eslint-disable-next-line
  DefaultProjectTemplate,
  ErrorProjectTemplate
} from './ProjectContent'
import { BannerProjectSection } from './Components'
import { GenericHeader } from '../../../shared/components'

import onigiriSVG from '../../../assets/icons/onigiri.svg'

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

  return (
    <div className={sectionStyles.section}>
      <GenericHeader
        icon={{
          src: onigiriSVG,
          alt: 'onigiir',
        }}
        mobile={{
          flexActive: false,
        }}
        className={styles.projectHeader}
      />

      {null === project ? (
        <ErrorProjectTemplate />
      ) : (
        <div
          className={classes}
          key={key}
        >
          {/* banner is always present in allsections */}
          <BannerProjectSection
            alt={project?.alt}
            src={project?.asset}
          />

          {/* FUTURE: template dependent after fetching from server*/}
          {projectBody}
        </div>
      )}
    </div>
  )
}
