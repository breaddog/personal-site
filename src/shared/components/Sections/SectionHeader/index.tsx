import styles from './SectionHeader.module.scss'
import React from 'react'
import classNames from 'classnames'

import { CircleIcon } from '../../CircleIcon'

interface SectionHeaderProps {
  className?: string
  title: string
  src: string
  alt: string
  backgroundColour?: string
}

export const SectionHeader: React.FunctionComponent<SectionHeaderProps> = ({
  className,
  title,
  src,
  alt,
  backgroundColour = 'var(--blue)',
}) => {
  const classes = classNames(styles.header, className)

  return (
    <div className={classes}>
      <h2 className={classNames(styles.title, styles.bold)}>{title}</h2>
      <CircleIcon
        className={styles.icon}
        src={src}
        alt={alt}
        backgroundColor={backgroundColour}
      />
    </div>
  )
}
