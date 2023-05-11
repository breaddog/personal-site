import projectStyles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

interface TextProjectProps {
  className?: string
  children: React.ReactNode
}

export const TextProject: React.FunctionComponent<TextProjectProps> = ({
  className,
  children,
}) => {
  const classes = classNames(projectStyles.text, className)

  return <p className={classes}>{children}</p>
}
