import { PROJECTS } from '../data/projects'
import {
  ArtBallProject
  // DefaultProjectTemplate
} from '../pages/Projects/ProjectContent'

export const fetchProject = async (projectKey: string) => {
  const _projects = PROJECTS[projectKey.toLowerCase()]
  return _projects || null
}

export const fetchProjectContent = async (projectKey: string) => {
  switch (projectKey) {
    case 'artball':
      return <ArtBallProject />
    // FUTURE: add some form of distribution that takes content from a server
    default:
      return null
    // eslint-disable-next-line no-case-declarations
    // const _project = await fetchProject(projectKey)
    // if (!_project) return null
    // return <DefaultProjectTemplate project={_project} />
  }
}
