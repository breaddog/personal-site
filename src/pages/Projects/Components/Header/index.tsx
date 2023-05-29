import styles from './Header.module.scss'
import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

interface ProjectSectionHeaderProps {
  className?: string
  children?: React.ReactNode
}

export const ProjectSectionHeader: React.FunctionComponent<
  ProjectSectionHeaderProps
> = ({ className, children }) => {
  const classes = classNames(projectStyles.header, styles.header, className)

  return <h2 className={classes}>{children}</h2>
}
