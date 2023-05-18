import styles from './SectionSubHeader.module.scss'
import React from 'react'
import classNames from 'classnames'

interface SectionSubHeaderProps {
  className?: string
  children?: React.ReactNode
}

export const SectionSubHeader: React.FunctionComponent<
  SectionSubHeaderProps
> = ({ className, children }) => {
  const classes = classNames(styles.subheader, className)

  return <div className={classes}>{children}</div>
}
