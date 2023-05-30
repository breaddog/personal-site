import { ProjectObject } from '../../data/projects'
import { ImageProjectSectionProps } from './Components'

export type ProjectSectionType =
  | 'text'
  | 'image'
  | 'imageMulti'
  | 'top'
  | 'topdown'
  | 'leftright'
export type ProjectSectionImagePlacement = 'top' | 'bottom' | 'left' | 'right'
export type ProjectSectionContentType =
  | React.ReactFragment
  | JSX.IntrinsicElements
  | string
  | undefined
  | null

export interface ExtraInfoInterface {
  title: string
  value: string | number | null
  isLink?: boolean
  link?: {
    url: string
    title?: string
  }
}

// for extra information
export type ExtraInfoWrapperProps = {
  type: ProjectSectionContentType
  content: ExtraInfoInterface[]
}

// represents a section element
export interface ProjectSectionGenericProps {
  className?: string
  headerText?: string

  project?: ProjectObject

  // main
  title?: string
  content?: ProjectSectionContentType

  // images
  image?: {
    placement?: ProjectSectionImagePlacement
    single?: Omit<ImageProjectSectionProps, 'className'>
    multi?: Omit<ImageProjectSectionProps, 'className'>[]
  }

  // additinonalInfo
  extraInfo?: ExtraInfoWrapperProps[]
}

// represents an object declaring said section element
export interface BodyContentProps {
  // element type
  type: ProjectSectionType
  // text content
  props: ProjectSectionGenericProps
}
