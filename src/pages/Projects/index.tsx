import styles from './Project.module.scss'
import sectionStyles from '../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { useParams, useNavigate } from 'react-router-dom'

import { ProjectObject } from '../../data/projects'
import { fetchProject, fetchProjectContent } from '../../shared'
import { ErrorProjectTemplate } from './ProjectContent'
import { BannerProjectSection, TopProjectSection } from './Components'
import { GenericHeader } from '../../shared/components'
import { isNull, isUndefined } from 'lodash'

import onigiriSVG from '../../assets/icons/onigiri.svg'
import { SectionNavInterface } from '../../shared/types'
import { PORTFOLIO_SECTIONS } from '../../shared/sections'
import { ROUTES } from '../../routes'

interface ProjectPageProps {
  className?: string
  key?: string
  children?: React.ReactNode
}

export const ProjectPage: React.FunctionComponent<ProjectPageProps> = ({
  className,
  key,
  children,
}) => {
  const navigate = useNavigate()
  const classes = classNames(
    styles.projectPage,
    sectionStyles.section,
    className
  )

  // project key
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

    const _projectBody = await fetchProjectContent(_project)
    setProjectBody(_projectBody)
    setLoaded(true)
  }

  // if needed this can be set
  // const handlePageLoad = () => {
  //   loadingRef?.current?.setLoadingActive(true)
  // }

  // load content
  React.useEffect(() => {
    // only if defined
    if (projectKey && !loaded) {
      retreiveProject(projectKey)
    }
  }, [projectKey, project, loaded])

  const renderProjectPageBody = () => {
    // non-loaded state
    if (!loaded) {
      return null
    }

    // empty
    if (isNull(project) || isUndefined(project)) {
      return <ErrorProjectTemplate />
    }

    // general
    return (
      <div
        className={classes}
        key={key}
      >
        <BannerProjectSection
          alt={project?.alt}
          src={project?.asset}
        />
        {projectBody ? (
          <>
            {projectBody}
            {children}
          </>
        ) : (
          <div className={styles.container}>
            <TopProjectSection
              project={project}
              content={
                <>
                  <p>Content currently under development!</p>
                </>
              }
            />
          </div>
        )}
      </div>
    )
  }

  const BACK_SECTION: {
    [key: string]: SectionNavInterface
  } = {
    portfolio: {
      title: 'Portfolio Page',
      key: ROUTES.portfolio.key,
      customNavigate: () => navigate(ROUTES.portfolio.pathname),
    },
    highlights: {
      title: 'Back To Highlights',
      key: PORTFOLIO_SECTIONS.highlights.key,
      customNavigate: () =>
        navigate(`/?section=${PORTFOLIO_SECTIONS.highlights.key}`),
    },
  }

  // TO DO: add back to project section
  return (
    <div className={sectionStyles.section}>
      <GenericHeader
        icon={{
          src: onigiriSVG,
          alt: 'onigiri',
        }}
        mobile={{
          flexActive: true,
          flexSize: 876,
        }}
        className={styles.projectHeader}
        sections={BACK_SECTION}
      />
      {renderProjectPageBody()}
    </div>
  )
}
