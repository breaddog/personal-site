import React from 'react'

export interface JobPositionData {
  title: string
  info: string[] | React.ReactFragment[]
  className?: string
  isText?: boolean
  bold?: boolean
}

export interface JobPosition {
  company: string
  title: string
  logo: string
  logoAlt: string
  start: string
  end: string
  className?: string
  sections: JobPositionData[]
}
