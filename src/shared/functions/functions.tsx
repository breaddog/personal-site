import { ScrollTrigger } from 'gsap/all'
import React from 'react'
import { GenericForwardRefInterface } from '../interfaces'

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

// // experimenting
// export const customComponentRefWrapper = <T extends HTMLDivElement>(
//   _ref: React.ForwardedRef<React.RefObject<T>>
// ) => {
//   const ref = React.useRef<T | null>(null)
//   return { ref }
// }

export const wrapForwardRefAsElementRef = (
  forwardRef: React.RefObject<GenericForwardRefInterface>
) => {
  const ref = React.useRef<Element | undefined | null>(null)
  ref.current = forwardRef.current?.element
  return ref
}
