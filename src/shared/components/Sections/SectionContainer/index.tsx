import classNames from 'classnames'
import styles from './SectionContainer.module.scss'
import React from 'react'

interface SectionContainerProps {
  className?: string
  children?: React.ReactNode
}

export const SectionContainer: React.FunctionComponent<
  SectionContainerProps
> = ({ className, children }) => {
  const classes = classNames(styles.container, className)

  return <div className={classes}>{children}</div>
}
