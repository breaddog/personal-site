import styles from './Error.module.scss'
import React from 'react'
import classNames from 'classnames'

import { Link, useParams } from 'react-router-dom'

import satelliteSVG from '../../../../../assets/icons/satellite.svg'
import { Button } from '../../../../../shared/components'
import { ROUTES } from '../../../../../routes'

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
          Seems that <b>{projectKey}</b> doesn't exist yet. Fancy suggesting{' '}
          <b>{projectKey}</b> as an idea to me or want to get back?
        </div>
        <Link to={ROUTES.home.pathname}>
          <Button
            className={styles.link}
            buttonStyle='gradient'
          >
            Click here to return to the main page.
          </Button>
        </Link>
      </div>
    </div>
  )
}
