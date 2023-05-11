import React from 'react'
import classNames from 'classnames'
import { SVGCustomInterface } from '../../../shared/interfaces'

interface RectangleBoxProps extends SVGCustomInterface {
  fill?: string
  width?: string | number
  height?: string | number
}

export const RectangleBox: React.FunctionComponent<RectangleBoxProps> = ({
  id,
  className,
  fill = '#000000',
  width = '250',
  height = '40',
}) => {
  const classes = classNames('rectangle-box', className)

  return (
    <svg
      id={id}
      className={classes}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        width={`${width}`}
        height={`${height}`}
        fill={`${fill}`}
      />
    </svg>
  )
}
