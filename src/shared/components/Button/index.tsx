import styles from './Button.module.scss'
import React from 'react'
import classNames from 'classnames'
import { string } from 'yup'

interface ButtonProps {
  className?: string
  disabled?: boolean
  onClick?: Function
  children?: React.ReactNode
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  disabled = false,
  onClick = () => {},
  children,
}) => {
  const classes = classNames(
    styles.button,
    disabled ? styles.disabled : styles.enabled,
    className
  )

  return (
    <div
      className={classes}
      onClick={() => {
        if (!disabled) {
          onClick()
        }
      }}
    >
      <div className={styles.content}>{children}</div>
    </div>
  )
}
