import styles from './App.module.scss'
import React from 'react'
import AOS from 'aos'
import classNames from 'classnames'

import { PROJECTS } from './data/projects'
import { ROUTES } from './routes'

import { CSSHeader, LoadingContext, LoadingSection, Portfolio } from './pages'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { ProjectPage } from './pages/Portfolio/Projects'
import { CONSTANTS } from './shared/constants'
import { ScrollTrigger } from 'gsap/all'

interface AppProps {
  className?: string
}

export const App: React.FunctionComponent<AppProps> = ({ className }) => {
  const { mobileMediaQuery } = CONSTANTS
  const { active } = React.useContext(LoadingContext)

  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(false)

  const isMobileMatcher = window.matchMedia(mobileMediaQuery)
  const classes = classNames(styles.app, active && styles.active, className)

  // listener for desktop or mobile
  const handleDesktopListener = () => {
    // if mobile size and havent been set
    if (isMobileMatcher.matches && !isMobile) {
      setIsMobile(true)
      ScrollTrigger.refresh()
    }
    // if not mobile size and havent been set
    if (!isMobileMatcher.matches && isMobile) {
      setIsMobile(false)
      ScrollTrigger.refresh()
    }
  }

  React.useEffect(() => {
    handleDesktopListener()
    window.addEventListener('resize', handleDesktopListener)
    return () => {
      window.removeEventListener('resize', handleDesktopListener)
    }
  }, [isMobile, isMobileMatcher])

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      startEvent: 'DOMContentLoaded',
      once: true,
    })
  }, [])

  return (
    <Router>
      <AppContext.Provider
        value={{
          isMobile,
          scrollEnabled,
          setScrollEnabled,
        }}
      >
        <div className={classes}>
          <CSSHeader />
          <LoadingSection />
          <Routes>
            {/* all the import components will go here */}
            <Route
              path={ROUTES.home.pathname}
              Component={Portfolio}
            />
            <Route
              path={ROUTES.portfolio.pathname}
              element={
                <Navigate
                  replace
                  to={ROUTES.home.pathname}
                />
              }
            />

            {/* routes for sub-pages here */}
            <Route
              path={ROUTES.projects.pathname}
              element={<ProjectPage />}
            />

            {/* error */}
            <Route
              path='*'
              element={
                <Navigate
                  replace
                  to={ROUTES.home.pathname}
                />
              }
            ></Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </Router>
  )
}

interface AppContextProps {
  isMobile: boolean
  scrollEnabled: boolean
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = React.createContext<AppContextProps>({
  isMobile: false,
  scrollEnabled: true,
  setScrollEnabled: () => {},
})
