import { PROJECTS } from '../../data/projects'
import {
  ArtBallProject,
  DefaultProjectTemplate
} from '../../pages/Portfolio/Projects/ProjectContent'

export const fetchProject = async (projectKey: string) => {
  const _projects = PROJECTS[projectKey.toLowerCase()]
  console.log(_projects)
  return _projects || null
}

export const fetchProjectContent = async (projectKey: string) => {
  switch (projectKey) {
    case 'artball':
      return <ArtBallProject />
    // TO DO: change this to a default layout
    default:
      return null
  }
}
