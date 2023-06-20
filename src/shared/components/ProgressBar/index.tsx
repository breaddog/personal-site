import styles from './ProgressBar.module.scss'
import React from 'react'
import classNames from 'classnames'

interface ProgressBarProps {
  className?: string
  backgroundColour?: string
  progressColours?: { [key: number]: string }
  progress: number
}

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = (
  props
) => {
  const { className, backgroundColour, progressColours, progress } = props
  const DEFAULT_BAR_COLOUR = 'var(--purple-10)'

  const determineBarColourByProgress = () => {
    // null case
    if (!progressColours) return DEFAULT_BAR_COLOUR

    const _keys = Object.keys(progressColours)

    // none case
    if (!_keys.length) return DEFAULT_BAR_COLOUR

    // single case
    if (_keys.length <= 1) return progressColours[Number(_keys[0])]

    // end
    for (const i in _keys) {
      const _progress = Math.round(progress * 100)
      const _index = Number(i)

      // end case
      if (_index === _keys.length - 1 && _progress >= Number(_keys[_index])) {
        return progressColours[Number(_keys[_index])] ?? DEFAULT_BAR_COLOUR
      }

      // other cases
      if (
        _progress >= Number(_keys[i]) &&
        _progress < Number(_keys[_index + 1])
      ) {
        return progressColours[Number(_keys[i])]
      }
    }
  }

  const determineBarProps = () => {
    // percentage is witdth based
    return {
      width: `${progress * 100}%`,
      backgroundColor: determineBarColourByProgress(),
    }
  }

  const classes = classNames(styles.parent, className)

  return (
    <div
      className={classes}
      style={{ backgroundColor: backgroundColour ?? '' }}
    >
      <div
        className={styles.bar}
        style={determineBarProps()}
      ></div>
    </div>
  )
}
