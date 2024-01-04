import styles from './Error.module.scss'
import sectionStyles from '../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import {
  GenericHeader,
  SectionContainer,
  SectionSubHeader,
  Button,
} from '../../shared/components'

import { Link } from 'react-router-dom'

import onigiriSVG from '../../assets/icons/onigiri.svg'
import brokenlinkSVG from '../../assets/icons/broken-link.svg'
import { ROUTES } from '../../routes'

interface ErrorPageProps {
  className?: string
  text?: string | React.ReactFragment | Element
  header?: string | React.ReactFragment | Element
  hidePageHeader?: boolean
  icon?: {
    className?: string
    src: string
    alt: string
  }
  button?: {
    className?: string
    text?: string
    pathname?: string
  }
}

export const ErrorPage: React.FunctionComponent<ErrorPageProps> = ({
  className = '',
  text,
  header,
  hidePageHeader = false,
  icon,
  button,
}) => {
  const classes = classNames(styles.error, sectionStyles.section, className)

  return (
    <section className={classes}>
      {!hidePageHeader && (
        <GenericHeader
          icon={{
            src: onigiriSVG,
            alt: 'onigiri',
          }}
          mobile={{
            flexActive: true,
            flexSize: 876,
          }}
          className={styles.errorHeader}
        />
      )}
      <SectionContainer className={styles.container}>
        <div className={classNames(styles.logo, icon?.className)}>
          <img
            className={styles.svg}
            src={icon?.src ?? brokenlinkSVG}
            alt={icon?.alt ?? 'brokenLink'}
          />
        </div>
        <SectionSubHeader className={styles.subheader}>
          {header ?? <>An Error has Occured</>}
        </SectionSubHeader>
        <div className={styles.text}>
          {text ?? (
            <>
              Seems like some action had triggered an error which was undesired.
              You can return to the home page using the button below.
            </>
          )}
        </div>
        <Link to={button?.pathname ?? ROUTES.home.pathname}>
          <Button className={classNames(styles.link, button?.className)}>
            {button?.text ?? <>Click here to return to the homepage.</>}
          </Button>
        </Link>
      </SectionContainer>
    </section>
  )
}
