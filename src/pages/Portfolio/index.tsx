import './index.scss'
import sectionStyles from '../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { PortfolioHeader } from './Header'
import {
  PortfolioContacts,
  PortfolioJourney,
  PortfolioDeveloper,
  PortfolioHighlights,
  PortfolioLanding,
  PortfolioManager
} from './Sections/index'
import { PortfolioManagerNew } from './Sections/ManagerNew'

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
      {/* <PortfolioHeader /> */}
      <div className={classes}>
        <PortfolioLanding />
        <PortfolioDeveloper />
        <PortfolioManagerNew />
        <PortfolioJourney />
        <PortfolioHighlights />
        <PortfolioContacts />
      </div>
    </>
  )
}
