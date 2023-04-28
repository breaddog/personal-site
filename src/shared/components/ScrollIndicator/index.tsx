import styles from './ScrollIndicator.module.scss'
import React from 'react'
import classNames from 'classnames'

interface ScrollIndicatorProps {
  className?: string
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  className,
}) => {
  const classes = classNames('scroll-indicator', styles.body, className)

  return (
    <>
      <div className={classes}>
        <div className={styles.dot}>•</div>
      </div>
    </>
  )
}
