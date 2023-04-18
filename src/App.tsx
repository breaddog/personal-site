import React from 'react';
import { Portfolio } from './pages'

import 'aos/dist/aos.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/keyboard'

import AOS from 'aos'

function App() {

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      startEvent: 'DOMContentLoaded',
      once: true
    })
  }, [])
  return (
    <div className='App'>
      <Portfolio />
    </div>
  );
}

export default App;
