import styles from './Footer.module.scss'
import React from 'react'
import classNames from 'classnames'

import { GenericFooter } from '../../../shared/components'

interface PortfolioFooterProps {
  className?: string
}

export const PortfolioFooter: React.FunctionComponent<PortfolioFooterProps> = ({
  className,
}) => {
  const classes = classNames(styles.portfolioFooter, className)

  return <GenericFooter className={classes} />
}
