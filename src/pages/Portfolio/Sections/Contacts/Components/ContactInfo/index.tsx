import styles from './ContactInfo.module.scss'
import React from 'react'
import classNames from 'classnames'
import { MagneticBox, CircularText } from '../../../../../../shared/components'
import { RotationDirection } from '../../../../../../shared/types/effects'
import { map } from 'lodash'

interface ContactInfoProps {
  className?: string
  contactType: string
  link?: string
  icon: {
    src: string
    alt: string
  }
  circularText: {
    text: string
    spacing?: number
    repetitions?: number
    direction?: RotationDirection
    duration?: number
    fontSize?: string
  }
  hoverText?: string | React.ReactFragment | Element
}

export const ContactInfo: React.FunctionComponent<ContactInfoProps> = ({
  className,
  contactType,
  link,
  icon,
  circularText,
  hoverText,
}) => {
  const classes = classNames(styles.wrapper, styles[contactType], className)

  // text
  const {
    text,
    spacing = 1,
    repetitions = 3,
    direction = 'clockwise',
    duration = 8,
    fontSize = '1rem',
  } = circularText

  // spacing is by nbsp
  const generateCircularText = () => {
    return Array(repetitions).fill(text).join('\u00A0'.repeat(spacing))
  }

  return (
    <div className={classes}>
      <MagneticBox
        className={styles.contactBox}
        innerBoxClassName={styles.contactBoxBody}
      >
        <a
          href={link}
          rel='noopenner noreferrer'
          target='_blank'
        >
          <div className={styles.container}>
            <div className={styles.iconBg}>
              <img
                className={styles.icon}
                {...icon}
              />
            </div>
            <CircularText
              className={styles.circularText}
              text={generateCircularText()}
              fontSize={fontSize}
              direction={direction}
              animationDuration={duration}
            />
          </div>
        </a>
        <div className={styles.info}>{hoverText}</div>
      </MagneticBox>
    </div>
  )
}
