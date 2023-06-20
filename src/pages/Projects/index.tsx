import styles from './Project.module.scss'
import sectionStyles from '../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { useParams, useNavigate } from 'react-router-dom'

import { PROJECTS, ProjectObject } from '../../data/projects'
import { fetchProject, fetchProjectContent } from '../../shared'
import { ErrorProjectTemplate } from './ProjectContent'
import { BannerProjectSection, TopProjectSection } from './Components'
import { GenericHeader } from '../../shared/components'
import { isNull, isUndefined } from 'lodash'

import onigiriSVG from '../../assets/icons/onigiri.svg'
import { SectionNavInterface } from '../../shared/types'
import { PORTFOLIO_SECTIONS } from '../../shared/sections'
import { ROUTES } from '../../routes'
import { toast } from 'react-toastify'

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
  const [projectIndex, setProjectIndex] = React.useState<number>(-1)
  const [projectBody, setProjectBody] = React.useState<
    React.ReactNode | React.ReactFragment | null
  >(null)
  const [project, setProject] = React.useState<ProjectObject | null>()

  // fetch project info from stored info
  const retreiveProject = async (_projectKey: string) => {
    const _project = await fetchProject(_projectKey)
    setProject(_project)

    // set key for navigation
    setProjectIndex(
      Object.keys(PROJECTS).includes(_projectKey)
        ? Object.keys(PROJECTS).indexOf(_projectKey)
        : -1
    )

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

  // const BACK_SECTION: {
  //   [key: string]: SectionNavInterface
  // } = {
  //   highlights: {
  //     title: 'Back To Highlights',
  //     key: PORTFOLIO_SECTIONS.highlights.key,
  //     customNavigate: () => {
  //       navigate(`/?section=${PORTFOLIO_SECTIONS.highlights.key}`)
  //     },
  //   },
  // }

  const generateProjectSections = () => {
    const menu: {
      [key: string]: SectionNavInterface
    } = {}

    const projectKeys = Object.keys(PROJECTS)
    // determine previous and next
    // if project exists
    if (projectIndex >= 0 && projectKey) {
      const _nextProject = PROJECTS[projectKeys[projectIndex + 1]]
      const _prevProject = PROJECTS[projectKeys[projectIndex - 1]]

      // not 0 index
      if (projectIndex > 0) {
        menu.prev = {
          title: 'Prev Project',
          key: _prevProject.key,
          customNavigate: () => {
            retreiveProject(_prevProject.key)
            navigate(`${ROUTES.projects.parentPath}/${_prevProject.key}`)
            toast.info('Navigated to the previous project')
          },
        }
      }

      // not last index
      if (projectIndex < projectKeys.length - 1) {
        menu.next = {
          title: 'Next Project',
          key: _nextProject.key,
          customNavigate: () => {
            retreiveProject(_nextProject.key)
            navigate(`${ROUTES.projects.parentPath}/${_nextProject.key}`)
            toast.info('Navigated to the next project')
          },
        }
      }
    }

    // always last
    menu.highlights = {
      title: 'Back To Highlights',
      key: PORTFOLIO_SECTIONS.highlights.key,
      customNavigate: () => {
        navigate(`/?section=${PORTFOLIO_SECTIONS.highlights.key}`)
      },
    }

    return menu
  }

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
        sections={generateProjectSections()}
      />
      {renderProjectPageBody()}
    </div>
  )
}
