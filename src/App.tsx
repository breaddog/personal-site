import React from 'react';
import { Portfolio } from "./pages"

import "aos/dist/aos.css";

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
    <div className="App">
      <Portfolio />
    </div>
  );
}

export default App;
