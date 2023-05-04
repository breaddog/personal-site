import styles from './JobInfo.module.scss'
import React from 'react'
import classNames from 'classnames'

import jsSVG from '../../../../../../assets/logos/js.svg'

interface JobInfoProps {
  className?: string
}

export const JobInfo: React.FunctionComponent<JobInfoProps> = ({
  className,
}) => {
  const classes = classNames(styles.box, className)

  return (
    <div className={classes}>
      <div className={styles.left}>
        <div className={styles.name}>Company Enterprises Pty Ltd</div>

        <div className={styles.logo}>
          <img
            src={jsSVG}
            alt='company logo'
          />
        </div>
      </div>
      <div className={styles.right}>
        <div
          className={classNames(
            styles.section,
            styles.duration,
            styles.opacityCustom
          )}
        >
          <div className={styles.title}>Duration</div>
          <div className={styles.content}>
            <span className={styles.info}>10th May 2023</span>
            <span className={styles.info}>-</span>
            <span className={styles.info}>10th May 2023</span>
          </div>
        </div>
        <div
          className={classNames(
            styles.section,
            styles.roles,
            styles.opacityCustom
          )}
        >
          <div className={styles.title}>Roles</div>
          <div className={styles.content}>
            <span className={styles.info}>Role 1</span>
            <span className={styles.info}>Role 1</span>
            <span className={styles.info}>Role 1</span>
          </div>
        </div>
        <div
          className={classNames(
            styles.section,
            styles.responsibilities,
            styles.opacityCustom
          )}
        >
          <div className={styles.title}>Responsibilities</div>
          <div className={styles.content}>
            <span className={styles.info}>Did Part X</span>
            <span className={styles.info}>Helped Part Y</span>
            <span className={styles.info}>Something Simple</span>
          </div>
        </div>
        <div
          className={classNames(
            styles.section,
            styles.moreInfo,
            styles.opacityCustom
          )}
        >
          <div className={styles.title}>More Info</div>
          <div className={styles.content}>
            <span className={styles.info}>
              Lorem ipsum dolor sit amet,
              <br />
              consectetur adipiscing elit,
              <br />
              sed do eiusmod tempor incididunt
              <br />
              ut labore et dolore magna
              <br />
              aliqua. Ut enim ad minim veniam,
              <br />
              quis nostrud exercitation
              <br />
              ullamco laboris nisi ut aliquip
              <br />
              ex ea commodo consequat.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
