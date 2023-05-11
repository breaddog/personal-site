import styles from './Button.module.scss'
import React from 'react'
import classNames from 'classnames'
import { string } from 'yup'

interface ButtonProps {
  className?: string
  colour?: string
  onClick?: Function
  children?: React.ReactNode
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  colour,
  onClick = () => {},
  children,
}) => {
  /**
   * to do:
   * complete and decide button effect/styling
   * finish up on the project page and routing including
   * - error
   * - default
   * - paragraph styling
   * fix the hyperlink hover effect
   */
  const classes = classNames(styles.button, className)

  return (
    <div
      className={classes}
      onClick={() => onClick()}
    >
      <div className={styles.content}>{children}</div>
    </div>
  )
}
