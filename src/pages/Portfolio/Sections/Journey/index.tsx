import styles from './Journey.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { CircleIcon } from '../../../../shared/components'

import reactSVG from '../../../../assets/icons/react.svg'
import { JobInfo } from './Components'

interface PortfolioJourneyProps {
  className?: string
}

export const PortfolioJourney: React.FC<PortfolioJourneyProps> = ({
  className,
}) => {
  const classes = classNames(
    'portfolio__journey',
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
              Journey So Far
            </h2>
            <CircleIcon
              className={styles.icon}
              src={reactSVG}
              alt='react'
            />
          </div>
          <div className={styles.body}>
            <JobInfo className={styles.jobBox} />
            {/* <div className={styles.left}>
              <p className={styles.text}>Test</p>
              <p className={styles.text}>Test</p>
              <p className={styles.text}>Test</p>
            </div>
            <div className={styles.right}>
              <p className={styles.text}>Right</p>
            </div> */}
          </div>
        </div>
      </section>
    </>
  )
}
