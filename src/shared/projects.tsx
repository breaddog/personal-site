import { PROJECTS, ProjectObject, ProjectType } from '../data/projects'
import {
  ArtBallProject,
  BinKingzProject,
  ERC721Project
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

    // SECOND: check if can be assigned to one of the templates
    default:
      switch (type) {
        case 'ERC721':
          return (
            <ERC721Project
              key={key}
              project={project}
            />
          )
        default:
          return null
      }
  }
}
