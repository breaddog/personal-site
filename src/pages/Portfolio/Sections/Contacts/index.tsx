import styles from './Contacts.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { CircleIcon, MagneticBox } from '../../../../shared/components'

import mailSVG from '../../../../assets/icons/mail.svg'

interface PortfolioContactsProps {
  className?: string
}

export const PortfolioContacts: React.FC<PortfolioContactsProps> = ({
  className,
}) => {
  const classes = classNames(
    'portfolio__contacts',
    sectionStyles['sub-section'],
    className
  )
  return (
    <>
      <section className={classes}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2
              className={classNames(
                styles.title,
                styles.bold,
                'title__sub-section'
              )}
            >
              Contact Me
            </h2>
            <CircleIcon
              className={styles.icon}
              src={mailSVG}
              alt='react'
            />
          </div>
          <div className={styles.body}>
            <MagneticBox className={styles.contactBox}>
              <span>Test</span>
            </MagneticBox>
          </div>
        </div>
      </section>
    </>
  )
}
