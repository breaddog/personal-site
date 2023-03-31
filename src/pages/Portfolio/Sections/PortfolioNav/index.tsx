import styles from './PortfolioNav.module.scss';
import React from 'react';
import classNames from 'classnames';

import onigiriSVG from '../../../../assets/icons/onigiri.svg'

interface FixedMenuProps {
  className?: string;
}


export const PortfolioNav: React.FC<FixedMenuProps> = ({
  className
}) => {

  const classes = classNames(styles.container, 'position--fixed', className)

  return <div className={classes}>
    <div className={styles.menu}>

    </div>
    <div className={styles.icon}>
      <img src={onigiriSVG} alt="onigiri" />
    </div>

  </div>
}
