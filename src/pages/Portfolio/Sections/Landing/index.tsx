import styles from './Landing.module.scss'
import React from 'react'
import classNames from 'classnames'

import boxSVG from '../../../../assets/icons/box.svg'
import laptopSVG from '../../../../assets/icons/laptop.svg'
import reactSVG from '../../../../assets/icons/react.svg'


interface PortfolioLandingProps {
  className?: string
}

export const PortfolioLanding: React.FC<PortfolioLandingProps> = ({
  className
}) => {

  const classes = classNames('sub-section landing', className)
  return <>
    <section className={classes}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={classNames(styles.title, styles.uppercase)}><b>Tien</b> Foong</h1>
          <h2 className={styles.subtitle}>Developing Websites for Creative Visionaries</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.icon}>
            <img src={boxSVG} alt="box" />
          </div>

          <div className={styles.icon}>
            <img src={laptopSVG} alt="laptop" />
          </div>

          <div className={styles.icon}>
            <img src={reactSVG} alt="laptop" />
          </div>

        </div>
      </div>
    </section>
  </>
}