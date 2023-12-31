import styles from './CollapsibleFAQ.module.scss'
import React from 'react'
import classNames from 'classnames'

import { ArrowDown } from '../../../assets/svgs'
import { filterAOSProps } from '../../AOS'

export interface CollapsibleSectionProps {
  title: {
    classname?: string
    content: string
  }
  initialOpen?: boolean
  className?: string
  bodyclassname?: string
  componentkey?: string | number
  children?: React.ReactNode
}

export const CollapsibleSection: React.FunctionComponent<
  CollapsibleSectionProps
> = (props: React.PropsWithChildren<CollapsibleSectionProps>) => {
  const {
    title,
    className,
    bodyclassname,
    initialOpen,
    componentkey,
    children,
  } = props
  const [active, setActive] = React.useState<boolean>(false)
  const classes = classNames(styles.faq, className)
  const aos_props = filterAOSProps(props)

  React.useEffect(() => {
    if (initialOpen) {
      setActive(true)
    }
  }, [initialOpen])

  return (
    <div
      className={classes}
      key={componentkey}
    >
      <div
        className={classNames(styles.title, title?.classname)}
        onClick={() => setActive(!active)}
        {...aos_props}
      >
        <span className={styles.content}>{title?.content}</span>
        <ArrowDown
          className={classNames(styles.toggle, active && styles.active)}
        />
      </div>
      <div
        className={classNames(
          styles.body,
          styles[active ? 'active' : 'inactive'],
          bodyclassname
        )}
      >
        {children}
      </div>
    </div>
  )
}
