import {
  BodyContentProps,
  ExtraInfoWrapperProps,
  ProjectSectionContentType,
  ProjectSectionGenericProps
} from './types'
import {
  HeaderProjectSection,
  ImageProjectSection,
  ImageProjectSectionProps,
  LeftRightImagePlacement,
  LeftRightImageProps,
  LeftRightProjectSection,
  MultiProjectImageContainer,
  TextProject,
  TopDownImagePlacement,
  TopDownImageProps,
  TopDownProjectSection,
  TopProjectSection
} from './Components'
import { ProjectObject } from '../../data/projects'

import { omit } from 'lodash'

// find extra info
export const findExtraInfoOfType = (
  extraInfo: ExtraInfoWrapperProps[],
  type: ProjectSectionContentType
) => {
  const _found = extraInfo.find((x: ExtraInfoWrapperProps) => x.type === type)
  return _found?.content ?? []
}

// generate elements
export const generateProjectBodyElement = ({
  body,
  project,
  key,
  extraInfo = [],
}: {
  body: BodyContentProps
  project: ProjectObject
  key?: number
  extraInfo?: ExtraInfoWrapperProps[]
}) => {
  // set typings first
  const sectionType = body.type
  const props = body.props as ProjectSectionGenericProps

  // expand props
  const { className, title, content, image } = props

  // filter out if content is string
  switch (sectionType) {
    // generic items
    case 'text':
      return (
        <TextProject
          className={className}
          key={key}
        >
          {content}
        </TextProject>
      )

    case 'header':
      return (
        <HeaderProjectSection
          className={className}
          key={key}
        >
          {content}
        </HeaderProjectSection>
      )

    case 'image':
      const _image = image?.single as ImageProjectSectionProps
      return (
        <ImageProjectSection
          key={key}
          className={className}
          imageclassname={_image?.className}
          {...omit(_image, 'className')}
        />
      )

    // other section types
    // top is most likely to have extra information
    case 'top':
      const _extraInfo = findExtraInfoOfType(extraInfo, 'top')
      return (
        <TopProjectSection
          className={className}
          project={project}
          content={content}
          extraInfo={_extraInfo}
          key={key}
        />
      )

    case 'topdown':
      return (
        <TopDownProjectSection
          project={project}
          headerText={title}
          content={content}
          image={{
            ...(image?.single as TopDownImageProps),
            placement: image?.placement as TopDownImagePlacement,
          }}
          key={key}
        />
      )

    case 'leftright':
      return (
        <LeftRightProjectSection
          project={project}
          headerText={title}
          content={content}
          image={{
            ...(image?.single as LeftRightImageProps),
            placement: image?.placement as LeftRightImagePlacement,
          }}
          key={key}
        />
      )

    case 'imageMulti':
      return (
        <MultiProjectImageContainer
          className={className}
          images={image?.multi as ImageProjectSectionProps[]}
          key={key}
        />
      )
    default:
      return null
  }
}
