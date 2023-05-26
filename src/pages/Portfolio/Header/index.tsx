import styles from './Header.module.scss'
import React from 'react'
import classNames from 'classnames'

import onigiriSVG from '../../../assets/icons/onigiri.svg'

import { PORTFOLIO_SECTIONS } from '../../../shared/sections'
import { GenericHeader } from '../../../shared/components'
import { useSelector, useDispatch } from 'react-redux'
import { getPortfolioSectionSelector } from '../../../store/portfolio/selectors'
import { setPortfolioCurrentSection } from '../../../store/portfolio/action'

import { PortfolioContext } from '..'

interface PortfolioHeaderProps {
  className?: string
}

export const PortfolioHeader: React.FunctionComponent<PortfolioHeaderProps> = ({
  className,
}) => {
  const currentSection = useSelector(getPortfolioSectionSelector)

  const dispatch = useDispatch()
  const { scrollToSection } = React.useContext(PortfolioContext)

  // change sections
  const handleChangeSection = (key: string) => {
    scrollToSection(key)
    dispatch(setPortfolioCurrentSection(key))
  }

  const classes = classNames(styles.portfolioHeader, className)

  return (
    <GenericHeader
      icon={{
        src: onigiriSVG,
        alt: 'onigiri',
      }}
      mobile={{
        flexActive: true,
        flexSize: 1150,
      }}
      sections={PORTFOLIO_SECTIONS}
      className={classes}
      onSectionChange={handleChangeSection}
      currentSection={currentSection}
    />
  )
}
