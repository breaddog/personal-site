import styles from './ContactBox.module.scss'
import React from 'react'
import classNames from 'classnames'

interface ContactBoxProps {
  className?: string
  children?: React.ReactNode
}

export const ContactBox: React.FC<ContactBoxProps> = ({
  className,
  children
}) => {
  const classes = classNames('contact-box', styles.box, className)
  return <div className={classes}>
    <div className={styles.body}>
      {children}
    </div>
  </div>
}
