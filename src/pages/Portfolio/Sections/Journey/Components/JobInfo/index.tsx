import styles from './JobInfo.module.scss'
import React from 'react'
import classNames from 'classnames'

import { map } from 'lodash'

import {
  JobPosition,
  JobPositionData
} from '../../../../../../shared/interfaces'

interface JobInfoProps {
  className?: string
  key?: string | number
  jobData?: JobPosition
}

export const JobInfo: React.FunctionComponent<JobInfoProps> = ({
  className,
  key,
  jobData,
}) => {
  const classes = classNames(styles.box, className)

  return (
    <div
      className={classes}
      key={key}
    >
      <div className={styles.left}>
        <div className={styles.nameContainer}>
          <h4 className={styles.name}>{jobData?.title}</h4>
          <h4 className={styles.date}>
            {jobData?.start} - {jobData?.end}
          </h4>
        </div>

        <div className={styles.logo}>
          <img
            src={jobData?.logo}
            alt={jobData?.logoAlt}
          />
        </div>
      </div>
      <div className={styles.right}>
        {map(
          jobData?.sections,
          (data: JobPositionData, idx: number | string) => (
            <div
              className={classNames(
                styles.section,
                styles.duration,
                styles.opacityCustom
              )}
              key={idx}
            >
              <div className={styles.title}>{data.title}</div>
              <div className={classNames(styles.content, jobData?.className)}>
                {map(
                  data?.info,
                  (
                    line: string | React.ReactFragment,
                    _idx: number | string
                  ) => {
                    return (
                      <>
                        <span
                          className={classNames(
                            styles.info,
                            data?.isText && styles.infoText,
                            data?.className && styles[data?.className]
                          )}
                          key={_idx}
                        >
                          {line}
                          {Number(_idx) < data?.info.length - 1 && <br />}
                        </span>
                      </>
                    )
                  }
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
