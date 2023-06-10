import styles from './Journey.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { map } from 'lodash'

import { JobInfo } from './Components'
import { SectionContainer, SectionHeader } from '../../../../shared/components'

import reactSVG from '../../../../assets/icons/react.svg'

import { JOB_POSITIONS } from '../../../../data/jobs'
import {
  GenericSubSectionForwardInterface,
  GenericForwardRefInterface,
  JobPosition
} from '../../../../shared/interfaces'

interface PortfolioJourneyProps extends GenericSubSectionForwardInterface {}

export const PortfolioJourney: React.FC<PortfolioJourneyProps> =
  React.forwardRef<GenericForwardRefInterface, PortfolioJourneyProps>(
    ({ className }, ref) => {
      const journeyRef = React.useRef<HTMLDivElement>(null)

      const classes = classNames(
        'portfolio__journey',
        sectionStyles['sub-section'],
        styles.journey,
        className
      )

      React.useImperativeHandle(ref, () => ({
        element: journeyRef.current as Element,
      }))

      return (
        <section
          className={classes}
          ref={journeyRef}
        >
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
                    data-aos='fade-down'
                    data-aos-delay={100 + 50 * idx}
                  />
                )
              })}
            </div>
          </SectionContainer>
        </section>
      )
    }
  )
