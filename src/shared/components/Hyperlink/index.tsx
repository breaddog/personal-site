import styles from './Hyperlink.module.scss'
import React from 'react'
import classNames from 'classnames'

interface HyperlinkProps {
  className?: string
  children?: React.ReactNode
  colour?: string
  highlightColour?: string
  thickness?: string
  underline?: boolean
}

export const Hyperlink: React.FunctionComponent<HyperlinkProps> = ({
  className = '',
  children,
  colour = 'var(--grey)',
  highlightColour = 'var(--purple-10)',
  thickness = '1px',
  underline = true,
}) => {
  const [hover, setHover] = React.useState<boolean>(false)
  const [visited, setVisited] = React.useState<boolean>(false)

  const classes = classNames(
    styles.hyperlink,
    className,
    underline ? styles.underline : styles.default,
    visited && styles.visited
  )

  const determineStyles = () => {
    // hover
    if (hover) {
      return {
        backgroundSize: `0% ${thickness}`,
        backgroundImage: `linear-gradient(${highlightColour} 0 0)`,
        color: `${highlightColour}`,
      }
    }

    // visited link
    if (visited) {
      return {
        backgroundSize: `100% ${thickness}`,
        backgroundImage: `linear-gradient(${highlightColour} 0 0)`,
        color: `${highlightColour}`,
      }
    }

    // regular
    return {
      backgroundSize: `100% ${thickness}`,
      backgroundImage: `linear-gradient(${colour} 0 0)`,
      color: `${colour}`,
    }
  }

  return (
    <span
      className={classes}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (visited) return
        setVisited(true)
      }}
      style={determineStyles()}
    >
      {children}
    </span>
  )
}
