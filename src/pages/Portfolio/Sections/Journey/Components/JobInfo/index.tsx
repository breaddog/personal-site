import styles from './JobInfo.module.scss'
import React from 'react'
import classNames from 'classnames'
import gsap from 'gsap'

import { map } from 'lodash'

import {
  JobPosition,
  JobPositionData,
} from '../../../../../../shared/interfaces'

import { AppContext } from '../../../../../../App'
import { Image } from '../../../../../../shared/components'
import { filterAOSProps } from '../../../../../../shared/AOS'

interface JobInfoProps {
  className?: string
  componentKey?: string | number
  jobData?: JobPosition
}

export const JobInfo: React.FunctionComponent<JobInfoProps> = (
  props: React.PropsWithChildren<JobInfoProps>
) => {
  const { className, componentKey, jobData } = props

  const classes = classNames(styles.box, className)
  const aos_props = filterAOSProps(props)

  const { isMobile } = React.useContext(AppContext)

  const GRADIENT_CIRCLE_SIZE_RATIO = 0.8
  const [gradientActive, setGradientActive] = React.useState<boolean>(false)
  // default is 300
  const [gradientDiameter, setGradientDiameter] = React.useState<number>(300)
  const boxRef = React.useRef<HTMLDivElement | null>(null)
  const gradientRef = React.useRef<HTMLDivElement | null>(null)

  // GRADIENT FOLLOW
  const gradientFollowCursor = (e: MouseEvent) => {
    if (!boxRef.current || !gradientRef.current || isMobile) return
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
      key={componentKey}
      ref={boxRef}
      {...aos_props}
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
      >
        <div
          className={styles.circle}
          style={{
            boxShadow: `10px 10px ${
              gradientDiameter * GRADIENT_CIRCLE_SIZE_RATIO
            }px ${
              gradientDiameter * GRADIENT_CIRCLE_SIZE_RATIO
            }px rgba(26, 28, 29, 0.4)`,
          }}
        ></div>
      </div>
      <div className={styles.body}>
        <div className={classNames(styles.section, styles.mainInfo)}>
          <div className={styles.nameContainer}>
            <h4 className={styles.name}>{jobData?.company}</h4>
            <h4 className={styles.title}>{jobData?.title}</h4>
            <h4 className={styles.date}>
              {jobData?.start} - {jobData?.end}
            </h4>
          </div>

          <div className={styles.logo}>
            <Image
              src={jobData?.logo}
              alt={jobData?.logoAlt}
            />
          </div>
        </div>
        <div className={styles.divider}></div>

        {/* content */}
        {map(
          jobData?.sections.slice(-1),
          (data: JobPositionData, idx: number) => (
            <React.Fragment key={idx}>
              <div
                className={classNames(
                  styles.section,
                  styles.content,
                  jobData?.className
                )}
              >
                {map(
                  data?.info,
                  (line: string | React.ReactFragment, _idx: number) => {
                    return (
                      <p
                        className={classNames(
                          styles.info,
                          data?.isText ? styles.infoText : 'bullet-point',
                          data?.className && styles[data?.className]
                        )}
                        key={_idx}
                      >
                        {line}
                        {Number(_idx) < data?.info.length - 1 && <br />}
                      </p>
                    )
                  }
                )}
              </div>
              {/* <CollapsibleSection
              initialOpen={true}
              title={{
                classname: styles.title,
                content: data.title,
              }}
              className={classNames(
                styles.section,
                styles.duration,
                styles.opacityCustom
              )}
            >
              <div className={classNames(styles.content, jobData?.className)}>
                {map(
                  data?.info,
                  (line: string | React.ReactFragment, _idx: number) => {
                    return (
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
                    )
                  }
                )}
              </div>
            </CollapsibleSection> */}
              {jobData?.sections?.length &&
                idx < jobData?.sections.length - 1 && (
                  <div className={styles.divider}></div>
                )}
            </React.Fragment>
          )
        )}
      </div>
    </div>
  )
}
