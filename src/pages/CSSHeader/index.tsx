import classNames from 'classnames'
import React from 'react'

// add your css here
import 'aos/dist/aos.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import 'swiper/css/keyboard'

interface CSSHeaderProps {
}

export const CSSHeader: React.FC<CSSHeaderProps> = () => {
  const classes = classNames('css-header')
  return <div className={classes}></div>
}
