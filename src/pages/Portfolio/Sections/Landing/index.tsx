import styles from './Landing.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import boxSVG from '../../../../assets/icons/box.svg'
import laptopSVG from '../../../../assets/icons/laptop.svg'
import reactSVG from '../../../../assets/icons/react.svg'
import bulbSVG from '../../../../assets/icons/bulb.svg'
import mailSVG from '../../../../assets/icons/mail.svg'

import { CircleIcon, SectionContainer } from '../../../../shared/components'

// import doubleArrowDownSVG from '../../../../assets/icons/double-arrow-down.svg'
import onigiriSVG from '../../../../assets/icons/onigiri.svg'
import { DoubleArrowDown } from '../../../../assets/svgs'

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
        <SectionContainer className={styles.container}>
          <div className={styles.left}>
            <div className={styles.header}>
              <div className={styles.titleContainer}>
                <h1 className={classNames(styles.title, styles.uppercase)}>
                  <b>Tien</b> Foong
                </h1>
                {/* <img src={onigiriSVG} alt='onigiri' /> */}
              </div>
              <h2 className={styles.subtitle}>
                {/* Developing Websites with Personality */}
                Web Development with Individuality in Mind
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
                alt='bulb'
              />
              <CircleIcon
                className={styles.icon}
                src={mailSVG}
                alt='mail'
              />
            </div>
          </div>
          <div className={styles.right}>
            <img
              src={onigiriSVG}
              alt='onigiri'
            />
          </div>
        </SectionContainer>

        <div className={classNames(styles.bottom, styles.animation__bounce)}>
          <DoubleArrowDown className={styles.arrow} />
        </div>
      </section>
    </>
  )
}
