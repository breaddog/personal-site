import styles from './Manager.module.scss'
import React from 'react'
import classNames from 'classnames'

import { gsap } from 'gsap'
import { ScrollTrigger, Draggable } from 'gsap/all'

import { reverse } from 'lodash'

import { CircleIcon } from '../../../../shared/components'

import boxSVG from '../../../../assets/icons/box.svg'
import bridgeSideSVG from '../../../../assets/misc/bridge-side.svg'
import { BridgeSide } from '../../../../assets/svgs'


interface PortfolioManagerProps {
  className?: string
}

export const PortfolioManager: React.FC<PortfolioManagerProps> = ({
  className
}) => {
  const classes = classNames('sub-section portfolio__manager', className)

  return <>
    <section className={classes}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={classNames(styles.title, 'title__sub-section', 'text__bold')}>
            Project Manager
          </h2>
          <CircleIcon
            className={styles.icon}
            src={boxSVG}
            alt='box'
          />
        </div>
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.bridge}>
            </div>
            <div className={styles.traitsBoxContainer}>
            </div>
            <div className={styles.bridge}>
              {/* <BridgeSide
                className={styles.bridgeSide}
                fill='var(--purple)'
              /> */}
            </div>
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