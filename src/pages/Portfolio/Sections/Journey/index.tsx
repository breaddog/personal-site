import styles from './Journey.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { map } from 'lodash'

import { JobInfo } from './Components'
import { CircleIcon } from '../../../../shared/components'

import reactSVG from '../../../../assets/icons/react.svg'

import { JOB_POSITIONS } from '../../../../data/jobs'
import { JobPosition } from '../../../../shared/interfaces'

interface PortfolioJourneyProps {
  className?: string
}

export const PortfolioJourney: React.FC<PortfolioJourneyProps> = ({
  className,
}) => {
  const classes = classNames(
    'portfolio__journey',
    sectionStyles['sub-section'],
    styles.journey,
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
            {map(JOB_POSITIONS, (job: JobPosition, idx: number) => {
              return (
                <JobInfo
                  className={styles.jobBox}
                  jobData={job}
                  key={idx}
                />
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}