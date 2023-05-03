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
