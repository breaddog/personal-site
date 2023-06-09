import styles from './CollapsibleFAQ.module.scss'
import React from 'react'
import classNames from 'classnames'

import { ArrowDown } from '../../../assets/svgs'
import { filterAOSProps } from '../../AOS'

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

export const CollapsibleFAQ: React.FunctionComponent<CollapsibleFAQProps> = (
  props: React.PropsWithChildren<CollapsibleFAQProps>
) => {
  const { title, className, bodyclassname, componentkey, children } = props
  const [active, setActive] = React.useState<boolean>(false)
  const classes = classNames(styles.faq, className)
  const aos_props = filterAOSProps(props)

  return (
    <div
      className={classes}
      key={componentkey}
    >
      <div
        className={classNames(styles.title, title?.classname)}
        {...aos_props}
      >
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
