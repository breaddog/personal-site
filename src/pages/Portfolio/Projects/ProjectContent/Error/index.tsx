import styles from './Error.module.scss'
import React from 'react'
import classNames from 'classnames'

import { useParams } from 'react-router-dom'

import satelliteSVG from '../../../../../assets/icons/satellite.svg'
import notAllowedSVG from '../../../../../assets/icons/not-allowed.svg'
import { Button, Hyperlink } from '../../../../../shared/components'

interface ErrorProjectTemplateProps {
  className?: string
}

export const ErrorProjectTemplate: React.FunctionComponent<
  ErrorProjectTemplateProps
> = ({ className }) => {
  const { projectKey } = useParams<{ projectKey: string }>()

  const classes = classNames(styles.error, className)
  return (
    <div className={classes}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            className={styles.svg}
            src={satelliteSVG}
            alt='satellite'
          />
        </div>
        <div className={styles.text}>
          Seems that {projectKey} isn't something I have contributed yet. Fancy
          suggesting {projectKey} as an idea to me or want to get back?
        </div>
        <Button className={styles.link}>
          Click here to return to the main page.
        </Button>
      </div>
    </div>
  )
}
