import styles from './Header.module.scss'
import React from 'react'
import classNames from 'classnames'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import onigiriSVG from '../../../assets/icons/onigiri.svg'
import walletDisconnectedSVG from '../../../assets/icons/wallet-disconnected.svg'

import { PORTFOLIO_SECTIONS } from '../../../shared/sections'
import { map } from 'lodash'
import { SectionNavInterface } from '../../../shared/types/nav'
import { Button, CircleIcon } from '../../../shared/components'

interface PortfolioHeaderProps {
  className?: string
}

export const PortfolioHeader: React.FunctionComponent<PortfolioHeaderProps> = ({
  className,
}) => {
  const classes = classNames(styles.header, className)

  return (
    <header className={classes}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <LazyLoadImage
            src={onigiriSVG}
            alt='onigiri'
          />
        </div>

        <div className={styles.sections}>
          {map(
            PORTFOLIO_SECTIONS,
            (section: SectionNavInterface, idx: number | string) => {
              return (
                <span
                  className={styles.section}
                  key={idx}
                >
                  {section.title}
                </span>
              )
            }
          )}
        </div>

        <div className={styles.right}>
          <Button className={styles.wallet}>Connect Wallet</Button>
        </div>
      </div>
    </header>
  )
}
