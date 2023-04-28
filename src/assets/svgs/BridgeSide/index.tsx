import React from 'react'
import classNames from 'classnames'
import { SVGCustomInterface } from '../../../shared/interfaces'

interface BridgeSideProps extends SVGCustomInterface {
  fill?: string
}

export const BridgeSide: React.FC<BridgeSideProps> = ({
  id,
  className,
  fill = '#000000',
}) => {
  const classes = classNames(className)
  return (
    <svg
      id={id}
      className={classes}
      width='165'
      height='64'
      viewBox='0 0 165 64'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M165 0H0V38C56.5 38 129.602 57.3931 165 83V31.6711V0Z'
        fill={fill}
      />
    </svg>
  )
}
