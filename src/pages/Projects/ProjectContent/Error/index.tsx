import styles from './Error.module.scss'
import React from 'react'
import classNames from 'classnames'

import { Link, useParams } from 'react-router-dom'

import satelliteSVG from '../../../../assets/icons/satellite.svg'
import {
  Button,
  SectionContainer,
  SectionSubHeader
} from '../../../../shared/components'
import { ROUTES } from '../../../../routes'
import { ErrorPage } from '../../../Error'

interface ErrorProjectTemplateProps {
  className?: string
}

export const ErrorProjectTemplate: React.FunctionComponent<
  ErrorProjectTemplateProps
> = ({ className }) => {
  const { projectKey } = useParams<{ projectKey: string }>()

  const classes = classNames(styles.error, className)
  return (
    <ErrorPage
      hidePageHeader={true}
      className={classes}
      header='Project Not Found'
      text={
        <>
          Seems that <b>{projectKey}</b> doesn't exist yet.{' '}
          {projectKey ? (
            <>
              You can suggest <b>{projectKey}</b> as an idea to me or want to
              get back to the homepage?
            </>
          ) : (
            'Want to get back to the homepage?'
          )}
        </>
      }
      icon={{
        className: styles.logo,
        src: satelliteSVG,
        alt: 'satellite',
      }}
    />
    // <div className={classes}>
    //   <SectionContainer className={styles.container}>
    //     <div className={styles.logo}>
    //       <img
    //         className={styles.svg}
    //         src={satelliteSVG}
    //         alt='satellite'
    //       />
    //     </div>
    //     <SectionSubHeader className={styles.subheader}>
    //       Project Not Found
    //     </SectionSubHeader>
    //     <div className={styles.text}>
    //       Seems that <b>{projectKey}</b> doesn't exist yet.{' '}
    //       {projectKey ? (
    //         <>
    //           Fancy suggesting <b>{projectKey}</b> as an idea to me or want to
    //           get back?
    //         </>
    //       ) : (
    //         'Want to get back to the homepage?'
    //       )}
    //     </div>
    //     <Link to={ROUTES.home.pathname}>
    //       <Button
    //         className={styles.link}
    //       // buttonStyle='gradient'
    //       >
    //         Click here to return to the main page.
    //       </Button>
    //     </Link>
    //   </SectionContainer>
    // </div>
  )
}
