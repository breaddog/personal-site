import React from 'react'
import { SVGCustomInterface } from '../../../shared/interfaces'

interface ArrowDownProps extends SVGCustomInterface {
  stroke?: string
}

export const ArrowDown: React.FunctionComponent<ArrowDownProps> = ({
  className,
  onClick = () => {},
  stroke = 'currentColor',
}) => {
  return (
    <svg
      className={className}
      onClick={() => onClick()}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18 9L12 15L6 9'
        stroke={stroke}
        strokeWidth='2'
      />
    </svg>
  )
}
