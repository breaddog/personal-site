import styles from './Hyperlink.module.scss'
import React from 'react'
import classNames from 'classnames'

interface HyperlinkProps {
  className?: string
  children?: React.ReactNode
  color?: string
  thickness?: string
  underline?: boolean
}

export const Hyperlink: React.FunctionComponent<HyperlinkProps> = ({
  className = '',
  children,
  color = 'var(--grey)',
  thickness = '1px',
  underline = true,
}) => {
  const classes = classNames(
    styles.hyperlink,
    className,
    underline ? styles.underline : styles.default
  )

  return (
    <span
      className={classes}
      style={{
        backgroundSize: `100% ${thickness}`,
        backgroundImage: `linear-gradient(${color} 0 0)`,
        color: `${color}`,
      }}
    >
      {children}
    </span>
  )
}
