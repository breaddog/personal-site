import styles from './CollapsibleFAQ.module.scss'
import React from 'react'
import classNames from 'classnames'

import { ArrowDown } from '../../../assets/svgs'

export interface CollapsibleFAQProps {
  title: {
    classname?: string
    content: string
  }
  className?: string
  bodyclassname?: string
  componentkey?: string | number
  children?: React.ReactNode
}

export const CollapsibleFAQ: React.FunctionComponent<CollapsibleFAQProps> = ({
  title,
  className,
  bodyclassname,
  componentkey,
  children,
}) => {
  const [active, setActive] = React.useState<boolean>(false)
  const classes = classNames(styles.faq, className)

  return (
    <div
      className={classes}
      key={componentkey}
    >
      <div className={classNames(styles.title, title?.classname)}>
        <span className={styles.content}>{title?.content}</span>
        <ArrowDown
          className={classNames(styles.toggle, active && styles.active)}
          onClick={() => setActive(!active)}
        />
      </div>
      <div
        className={classNames(
          styles.body,
          active && styles.active,
          bodyclassname
        )}
      >
        {children}
      </div>
    </div>
  )
}
