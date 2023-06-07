import React from 'react'

type KeyframeProps = {
  name: string
  animationProps: Record<string, React.CSSProperties | string>
}

export const Keyframes: React.FunctionComponent<KeyframeProps> = ({
  name,
  animationProps,
}) => {
  const toCss = (cssObject: React.CSSProperties | string) =>
    typeof cssObject === 'string'
      ? cssObject
      : Object.keys(cssObject).reduce((accumulator, key) => {
          const cssKey = key.replace(/[A-Z]/g, (v) => `-${v.toLowerCase()}`)
          const cssValue = (cssObject as any)[key].toString().replace('\'', '')
          return `${accumulator}${cssKey}:${cssValue};`
        }, '')

  const cssRules = Object.entries(animationProps).map(
    ([key, value]) => `${key} { ${toCss(value)} }`
  )
  return (
    <style>
      {`@keyframes ${name} {
        ${cssRules.join('\n')}
      }`}
    </style>
  )
}
