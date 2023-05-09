import styles from './JobInfo.module.scss'
import React from 'react'
import classNames from 'classnames'
import gsap from 'gsap'

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

  const [gradientActive, setGradientActive] = React.useState<boolean>(false)
  // default is 300
  const [gradientDiameter, setGradientDiameter] = React.useState<number>(300)
  const boxRef = React.useRef<HTMLDivElement | null>(null)
  const gradientRef = React.useRef<HTMLDivElement | null>(null)

  // GRADIENT FOLLOW
  // TO DO: change gradient as cursor moves through
  // OR: gradient changes as you scroll through
  // const gradient active
  const gradientFollowCursor = (e: MouseEvent) => {
    if (!boxRef.current || !gradientRef.current) return
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const boundingRect = boxRef.current.getBoundingClientRect()
    const halfDiff = Math.abs(boundingRect.width - boundingRect.height) / 2
    const relX = e.pageX - boundingRect.left + halfDiff
    const relY = e.pageY - boundingRect.top
    setGradientActive(true)

    gsap.to(gradientRef.current, {
      x: relX - boundingRect.width / 2,
      y: relY - boundingRect.height / 2 - scrollTop,
      ease: 'power1',
      duration: 0.8,
    })
  }

  // const gradient inactive
  const gradientReset = () => {
    setGradientActive(false)
  }

  // set gradient diameter
  const setGradientDiameterOnResize = () => {
    if (boxRef.current) {
      setGradientDiameter(boxRef.current.getBoundingClientRect().height)
    }
  }

  React.useEffect(() => {
    if (boxRef.current) {
      // initialise
      setGradientDiameterOnResize()
      boxRef.current.addEventListener('mousemove', gradientFollowCursor)
      boxRef.current.addEventListener('mouseleave', gradientReset)
      // always follow height for accuracy
    }

    window.addEventListener('resize', setGradientDiameterOnResize)

    return () => {
      if (boxRef.current) {
        boxRef.current.removeEventListener('mousemove', gradientFollowCursor)
        boxRef.current.removeEventListener('mouseleave', gradientReset)
      }
      window.removeEventListener('resize', setGradientDiameterOnResize)
    }
  }, [gradientActive, gradientRef, boxRef])

  return (
    <div
      className={classes}
      key={key}
      ref={boxRef}
    >
      <div
        className={classNames(
          styles.gradientHover,
          gradientActive && styles.active
        )}
        ref={gradientRef}
        style={{
          width: `${gradientDiameter}px`,
          height: `${gradientDiameter}px`,
        }}
      ></div>
      <div className={styles.left}>
        <div className={styles.nameContainer}>
          <h4 className={styles.name}>{jobData?.company}</h4>
          <h4 className={styles.title}>{jobData?.title}</h4>
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
                            data?.isText ? styles.infoText : 'bullet-point',
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
