import styles from './Header.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

interface HeaderProjectSectionProps {
  className?: string
  children?: React.ReactNode
}

export const HeaderProjectSection: React.FunctionComponent<
  HeaderProjectSectionProps
> = ({ className, children }) => {
  const classes = classNames(projectStyles.header, styles.header, className)

  return <h2 className={classes}>{children}</h2>
}
