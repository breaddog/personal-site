import styles from './Creativity.module.scss'
import React from 'react'
import classNames from 'classnames'

import { CircleIcon } from '../../../../shared/components'

import reactSVG from '../../../../assets/icons/react.svg'

interface PortfolioCreativityProps {
  className?: string
}

export const PortfolioCreativity: React.FC<PortfolioCreativityProps> = ({
  className
}) => {
  const classes = classNames('sub-section portfolio__creativity', className)
  return <>
    <section className={classes}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={classNames(styles.title, styles.bold, 'title__sub-section')}>
            Design and Engagement
          </h2>
          <CircleIcon
            className={styles.icon}
            src={reactSVG}
            alt='react'
          />
        </div>
        <div className={styles.body}>
          <div className={styles.left}>
            <p className={styles.text}>
              Test
            </p>
            <p className={styles.text}>
              Test
            </p>
            <p className={styles.text}>
              Test
            </p>
          </div>
          <div className={styles.right}>
            <p className={styles.text}>
              Right
            </p>
          </div>
        </div>
      </div>
    </section >
  </>
}
