import './index.scss'
import sectionStyles from '../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import {
  PortfolioContacts,
  PortfolioJourney,
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
    'section__portfolio position--relative',
    sectionStyles.section,
    className
  )
  return (
    <>
      <div className={classes}>
        <PortfolioLanding />
        <PortfolioDeveloper />
        <PortfolioManager />
        <PortfolioJourney />
        <PortfolioHighlights />
        <PortfolioContacts />
      </div>
    </>
  )
}
