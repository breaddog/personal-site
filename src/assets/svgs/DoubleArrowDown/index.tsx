import React from 'react'
import { SVGCustomInterface } from '../../../shared/interfaces'

interface DoubleArrowDownProps extends SVGCustomInterface {
  stroke?: string
}

export const DoubleArrowDown: React.FunctionComponent<DoubleArrowDownProps> = ({
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
        d='M18 12L12 18L6 12'
        stroke={stroke}
        strokeWidth='2'
      />
      <path
        d='M18 6L12 12L6 6'
        stroke={stroke}
        strokeWidth='2'
      />
    </svg>
  )
}
