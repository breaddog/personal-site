import React from 'react'
import { CSSHeader, Portfolio } from './pages'
import AOS from 'aos'

function App() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      startEvent: 'DOMContentLoaded',
      once: true,
    })
  }, [])
  return (
    <div className='App'>
      {/* all the import components will go here */}
      <CSSHeader />
      <Portfolio />
    </div>
  )
}

export default App
