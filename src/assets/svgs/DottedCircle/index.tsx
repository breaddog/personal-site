import React from 'react'
import { SVGCustomInterface } from '../../../shared/interfaces'

export const DottedCircle: React.FC<SVGCustomInterface> = ({
  className,
  id,
  pathId,
}) => {
  return (
    <svg
      id={id}
      className={className}
      width='600'
      height='600'
      viewBox='0 0 600 600'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        id={pathId}
        cx='300'
        cy='300'
        r='298.5'
        stroke='black'
        strokeWidth='3'
        // strokeMiterlimit="3.8637" strokeDasharray="35 35"
      />
    </svg>
  )
}
