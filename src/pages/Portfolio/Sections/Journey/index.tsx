import styles from './Journey.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { map } from 'lodash'

import { JobInfo } from './Components'
import { SectionContainer, SectionHeader } from '../../../../shared/components'

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
    <section className={classes}>
      <SectionContainer className={styles.container}>
        <SectionHeader
          className={styles.header}
          title='Journey So Far'
          src={reactSVG}
          alt='react'
          backgroundColour='var(--purple-10)'
        />
        <div className={styles.body}>
          {map(JOB_POSITIONS, (job: JobPosition, idx: number) => {
            return (
              <JobInfo
                className={styles.jobBox}
                jobData={job}
                componentKey={idx}
                key={idx}
              />
            )
          })}
        </div>
      </SectionContainer>
    </section>
  )
}
