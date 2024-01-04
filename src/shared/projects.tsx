import { PROJECTS, ProjectObject } from '../data/projects'
import {
  ArtBallProject,
  DefaultProject,
  ERC20Project,
  ERC721Project,
  LayersProject,
  RedVillageProject,
  // DefaultProjectTemplate
} from '../pages/Projects/ProjectContent'
import { BodyContentProps } from '../pages/Projects/types'

export const DEFAULT_PROJECT_TOP: BodyContentProps[] = [
  {
    type: 'top',
    props: {
      content: 'Content currently under development!',
    },
  },
]

export const fetchProject = async (projectKey: string) => {
  const _projects = PROJECTS[projectKey.toLowerCase()]
  return _projects || null
}

export const fetchProjectContent = async (project: ProjectObject | null) => {
  if (!project) return null

  const { key, type } = project
  // FIRST: check if theres a custom one
  switch (key) {
    case 'artball':
      return <ArtBallProject />
    case 'layers':
      return <LayersProject />
    case 'redvillage':
      return <RedVillageProject />

    // SECOND: check if can be assigned to one of the templates
    default:
      // nothing yet? use default template
      if (!project?.body) {
        project.body = DEFAULT_PROJECT_TOP
      }

      // otherwise check
      switch (type) {
        case 'ERC20':
          return (
            <ERC20Project
              componentkey={key}
              project={project}
            />
          )
        case 'ERC721':
          return (
            <ERC721Project
              componentkey={key}
              project={project}
            />
          )
        default:
          // return null
          return (
            <DefaultProject
              componentkey={key}
              project={project}
            />
          )
      }
  }
}
