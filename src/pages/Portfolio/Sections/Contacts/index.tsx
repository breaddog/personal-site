import styles from './Contacts.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import {
  CircleIcon,
  CircularText,
  MagneticBox
} from '../../../../shared/components'

import mailSVG from '../../../../assets/icons/mail.svg'
import resumeSVG from '../../../../assets/icons/resume.svg'
import githubSVG from '../../../../assets/logos/github.svg'
import linkedinSVG from '../../../../assets/logos/linkedin.svg'

interface PortfolioContactsProps {
  className?: string
}

export const PortfolioContacts: React.FC<PortfolioContactsProps> = ({
  className,
}) => {
  const CIRCULAR_ANIMATION_DURATION = 8
  const CIRCULAR_ANIMATION_FONT_SIZE = '0.875rem'

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
            <MagneticBox
              className={classNames(styles.contactBox, styles.linkedin)}
            >
              <div className={styles.container}>
                <div className={styles.iconBg}>
                  <img
                    className={styles.icon}
                    src={linkedinSVG}
                    alt='linkedin'
                  />
                </div>
                <CircularText
                  className={styles.circularText}
                  text={<>LinkedIn&nbsp;LinkedIn&nbsp;LinkedIn</>}
                  fontSize={CIRCULAR_ANIMATION_FONT_SIZE}
                  direction='clockwise'
                  animationDuration={CIRCULAR_ANIMATION_DURATION}
                />
              </div>
            </MagneticBox>

            <MagneticBox
              className={classNames(styles.contactBox, styles.github)}
            >
              <div className={styles.container}>
                <div className={styles.iconBg}>
                  <img
                    className={styles.icon}
                    src={githubSVG}
                    alt='github'
                  />
                </div>
                <CircularText
                  className={styles.circularText}
                  text={<>Github&emsp;Github&emsp;Github</>}
                  fontSize={CIRCULAR_ANIMATION_FONT_SIZE}
                  direction='clockwise'
                  animationDuration={CIRCULAR_ANIMATION_DURATION}
                />
              </div>
            </MagneticBox>

            <MagneticBox
              className={classNames(styles.contactBox, styles.email)}
            >
              <div className={styles.container}>
                <div className={styles.iconBg}>
                  <img
                    className={styles.icon}
                    src={mailSVG}
                    alt='mail'
                  />
                </div>
                <CircularText
                  className={styles.circularText}
                  text={<>E-mail&emsp;&nbsp;E-mail&emsp;&nbsp;E-mail</>}
                  fontSize={CIRCULAR_ANIMATION_FONT_SIZE}
                  direction='clockwise'
                  animationDuration={CIRCULAR_ANIMATION_DURATION}
                />
              </div>
            </MagneticBox>

            <MagneticBox
              className={classNames(styles.contactBox, styles.resume)}
            >
              <div className={styles.container}>
                <div className={styles.iconBg}>
                  <img
                    className={styles.icon}
                    src={resumeSVG}
                    alt='resume'
                  />
                </div>
                <CircularText
                  className={styles.circularText}
                  text={<>Resume&nbsp;&nbsp;Resume&nbsp;&nbsp;Resume</>}
                  fontSize={CIRCULAR_ANIMATION_FONT_SIZE}
                  direction='clockwise'
                  animationDuration={CIRCULAR_ANIMATION_DURATION}
                />
              </div>
            </MagneticBox>
          </div>
        </div>
      </section>
    </>
  )
}
