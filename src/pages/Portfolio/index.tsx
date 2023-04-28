import './index.scss'
import React from 'react'
import classNames from 'classnames'

import {
  PortfolioContacts,
  PortfolioCreativity,
  PortfolioDeveloper,
  PortfolioHighlights,
  PortfolioLanding,
  PortfolioManager
} from './Sections/index'

interface PortfolioProps {
  className?: string
}

export const Portfolio: React.FC<PortfolioProps> = ({ className }) => {
  const classes = classNames(
    'section section__portfolio position--relative',
    className
  )
  return (
    <>
      <div className={classes}>
        <PortfolioLanding />
        <PortfolioDeveloper />
        <PortfolioManager />
        <PortfolioCreativity />
        <PortfolioHighlights />
        <PortfolioContacts />
      </div>
    </>
  )
}
