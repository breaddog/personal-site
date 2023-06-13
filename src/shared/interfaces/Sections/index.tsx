import React from 'react'

export interface GenericForwardRefInterface {
  element?: HTMLDivElement
}

export interface GenericSubSectionForwardInterface {
  className?: string
  ref?: React.ForwardedRef<GenericForwardRefInterface>
}
