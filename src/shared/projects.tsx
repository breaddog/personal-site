import { PROJECTS, ProjectObject } from '../data/projects'
import {
  ArtBallProject,
  ERC721Project,
  LayersProject
  // DefaultProjectTemplate
} from '../pages/Projects/ProjectContent'

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

    // SECOND: check if can be assigned to one of the templates
    default:
      // nothing yet? use default template
      if (!project?.body) return null

      // otherwise check
      switch (type) {
        case 'ERC721':
          return (
            <ERC721Project
              componentkey={key}
              project={project}
            />
          )
        default:
          return null
      }
  }
}
