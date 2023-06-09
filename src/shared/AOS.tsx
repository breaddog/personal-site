import React from 'react'
import AOS from 'aos'
import { filter, map } from 'lodash'

export interface GenericAOSInterface {
  'data-aos'?: AOS.easingOptions
  'data-aos-offset'?: string | number
  'data-aos-duration'?: string | number
  'data-aos-delay'?: string | number
  'data-aos-anchor'?: string
  'data-aos-anchor-placement'?: AOS.anchorPlacementOptions
  'data-aos-once'?: boolean
}

export const filterAOSProps = (props: React.PropsWithChildren<any>) => {
  const aos_keys = filter(Object.keys(props), (x) =>
    x.toLowerCase().includes('data-aos')
  )
  const aos_props: {
    [key: string]: any
  } = {}

  // add to props
  map(aos_keys, (key: string) => (aos_props[key] = props[key]))

  return aos_props
}
