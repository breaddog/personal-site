import styles from './BridgeSection.module.scss'
import React from 'react'
import classNames from 'classnames'

import bridgeSectionSVG from '../../../../../../assets/misc/bridge-section.svg'

interface BridgeSectionProps {
  className?: string
  componentKey?: string | number
}

export const BridgeSection: React.FC<BridgeSectionProps> = ({
  className,
  componentKey,
}) => {
  const classes = classNames('bridge-section', styles.bridgeSection, className)

  return (
    <img
      className={classes}
      src={bridgeSectionSVG}
      alt='bridgeSection'
      key={componentKey}
    />
  )
}
