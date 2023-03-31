import './index.scss'
import React from 'react'
import classNames from 'classnames'

import { PortfolioLanding } from './Sections/index'
import { PortfolioNav } from './Sections/index'

interface PortfolioProps {
  className?: string
}

export const Portfolio: React.FC<PortfolioProps> = ({
  className
}) => {

  const classes = classNames('section section__portfolio position__relative', className)
  return <>
    <div className={classes}>
      <PortfolioLanding />
      <PortfolioNav />
    </div>
  </>
}
