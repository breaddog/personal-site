import styles from './Button.module.scss'
import React from 'react'
import classNames from 'classnames'
import { string } from 'yup'

interface ButtonProps {
  className?: string
  disabled?: boolean
  onClick?: Function
  children?: React.ReactNode
  buttonStyle?: 'gradient' | null
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  disabled = false,
  onClick = () => {},
  children,
  buttonStyle,
}) => {
  const classes = classNames(
    styles.button,
    buttonStyle && styles[String(buttonStyle)],
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
