import styles from './GenericFooter.module.scss'
import React from 'react'
import classNames from 'classnames'
import moment from 'moment'

interface GenericFooterProps {
  className?: string
}

export const GenericFooter: React.FunctionComponent<GenericFooterProps> = ({
  className,
}) => {
  const currentDate = moment()

  const classes = classNames(styles.genericFooter, className)
  const footerRef = React.useRef<HTMLElement>(null)

  return (
    <>
      <footer
        className={classes}
        ref={footerRef}
      >
        <div className={styles.container}>
          <div className={classNames(styles.footerText, styles.builtWith)}>
            Built with React & Typescript
          </div>
          <div className={classNames(styles.footerText, styles.copyright)}>
            © Copyright Tien {currentDate.year()}
          </div>
        </div>
      </footer>
    </>
  )
}
