import React from 'react'

export interface SetSectionRefInterface {
  key: string
  ref: React.RefObject<HTMLElement | HTMLDivElement>
}
