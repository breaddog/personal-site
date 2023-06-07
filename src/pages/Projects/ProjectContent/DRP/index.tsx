import projectStyles from '../../Project.module.scss'
import { map } from 'lodash'
import { Hyperlink } from '../../../../shared/components'
import { BodyContentProps } from '../../types'
import { capitaliseText } from '../../../../shared'

export const DRP_LINKS: {
  [key: string]: string
} = {
  main: 'https://drp.gallery/',
}

export const BODY_CONTENT_DRP: BodyContentProps[] = [
  {
    type: 'top',
    props: {
      content: <>Test</>,
    },
  },
]
