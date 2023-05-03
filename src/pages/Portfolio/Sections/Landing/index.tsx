import styles from './Landing.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import boxSVG from '../../../../assets/icons/box.svg'
import laptopSVG from '../../../../assets/icons/laptop.svg'
import reactSVG from '../../../../assets/icons/react.svg'
import bulbSVG from '../../../../assets/icons/bulb.svg'

import { CircleIcon } from '../../../../shared/components'

import doubleArrowDownSVG from '../../../../assets/icons/double-arrow-down.svg'
import onigiriSVG from '../../../../assets/icons/onigiri.svg'

interface PortfolioLandingProps {
  className?: string
}

export const PortfolioLanding: React.FC<PortfolioLandingProps> = ({
  className,
}) => {
  const classes = classNames(
    'position--relative',
    sectionStyles['sub-section'],
    styles.landing,
    className
  )
  return (
    <>
      <section className={classes}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.header}>
              <h1 className={classNames(styles.title, styles.uppercase)}>
                <b>Tien</b> Foong
              </h1>
              <h2 className={styles.subtitle}>
                {/* Developing Websites with Personality */}
                Website Development with Individuality
              </h2>
            </div>
            <div className={styles.content}>
              <CircleIcon
                className={styles.icon}
                src={laptopSVG}
                alt='laptop'
              />
              <CircleIcon
                className={styles.icon}
                src={boxSVG}
                alt='box'
              />
              <CircleIcon
                className={styles.icon}
                src={reactSVG}
                alt='react'
              />
              <CircleIcon
                className={styles.icon}
                src={bulbSVG}
                alt='react'
              />
            </div>
          </div>
          <div className={styles.right}>
            <img
              src={onigiriSVG}
              alt='onigiri'
            />
          </div>
        </div>
        <div className={classNames(styles.bottom, styles.animation__bounce)}>
          <img
            src={doubleArrowDownSVG}
            alt='arrow-down'
          />
        </div>
      </section>
    </>
  )
}
