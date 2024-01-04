import styles from './HighlightsHeaderWrapper.module.scss'
import React from 'react'
import classNames from 'classnames'
import {
  SectionHeader,
  SectionHeaderProps,
} from '../../../../../../shared/components'

interface HighlightsHeaderWrapperProps extends SectionHeaderProps {}

export const HighlightsHeaderWrapper: React.FunctionComponent<
  HighlightsHeaderWrapperProps
> = (props) => {
  const [active, setActive] = React.useState<boolean>(false)
  const classes = classNames(
    styles.header,
    active && styles.active,
    props.className
  )

  const setBulbActive = () => {
    setActive(!active)
  }

  return (
    <SectionHeader
      {...props}
      className={classes}
      onClick={setBulbActive}
    />
  )
}
