import { ScrollTrigger } from 'gsap/all'
import React from 'react'
import { GenericForwardRefInterface } from './interfaces'
import { filter, isUndefined, map } from 'lodash'

// fonts
export const capitaliseText = (string: string) => {
  if (!string.length) return ''
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

// util
export const roundToNearestUnit = (number: number, unit: number) => {
  return Math.ceil(number / unit) * unit
}

// random
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const getRandomIntInclusive = (min: number, max: number) => {
  const _min = Math.ceil(min)
  const _max = Math.floor(max)
  return Math.floor(Math.random() * (_max - _min + 1) + _min)
}

// boundary
export const detectScrollBoundary = async (refOffsetTarget: number) => {
  const scrollY = window.scrollY
  return scrollY >= refOffsetTarget
}

// for sizes
export const handleDesktopListener = (
  query: MediaQueryList,
  secondCheck: boolean,
  secondCheckSetter: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (query.matches && !secondCheck) {
    secondCheckSetter(true)
    ScrollTrigger.refresh()
  }
  if (!query.matches && secondCheck) {
    secondCheckSetter(false)
    ScrollTrigger.refresh()
  }
}

export const isWithinRefBoundary = ({
  ref,
  scrollY,
  usePinParent = false,
  extraHeight = 0,
  offsetHeightPercentage = 0.9,
  key = '',
}: {
  ref: HTMLDivElement | undefined
  scrollY: number
  // for padding etc
  usePinParent?: boolean
  extraHeight?: number
  offsetHeightPercentage?: number
  // debug
  key?: string
}) => {
  // handle undefined case
  if (!ref || isUndefined(scrollY)) return false

  let upper
  let height
  let bottom

  // do we use a pin parent?
  if (usePinParent) {
    const _pinParent = ref.parentElement
    if (!_pinParent) return false
    upper = _pinParent?.offsetTop
    height = _pinParent?.getBoundingClientRect().height * offsetHeightPercentage
  } else {
    // else reference offset and client height
    upper = ref?.offsetTop
    height =
      (ref?.getBoundingClientRect().height + extraHeight) *
      offsetHeightPercentage
  }
  // determine bottom boundary
  bottom = upper + height

  // DEBUG
  // console.log(upper, bottom, scrollY)
  // console.log(scrollY >= upper && scrollY <= bottom)

  // if within boundaries (exclusive max)
  return scrollY >= upper && scrollY < bottom
}

// utility
export const enableScroll = () => {
  const _body = document.getElementsByTagName('BODY')[0] as HTMLElement
  _body.style.overflowY = 'unset'
}

export const disableScroll = () => {
  const _body = document.getElementsByTagName('BODY')[0] as HTMLElement
  _body.style.overflowY = 'hidden'
}

// delay always in ms
export const delay = async (duration: number = 1000) => {
  return await new Promise((resolve) => setTimeout(resolve, duration))
}

// others
export const filterOtherProps = (
  props: React.PropsWithChildren<any>,
  types: string[]
) => {
  // find keys that arent in the types
  const _keys = filter(Object.keys(props), (x) => !types.includes(x))
  const _props: {
    [key: string]: any
  } = {}

  // add to props
  map(_keys, (key: string) => (_props[key] = props[key]))

  return _props
}

// just in case
export const wrapForwardRefAsElementRef = (
  forwardRef: React.RefObject<GenericForwardRefInterface>
) => {
  const ref = React.useRef<Element | undefined | null>(null)
  ref.current = forwardRef.current?.element
  return ref
}
