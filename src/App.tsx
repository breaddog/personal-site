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
import { handleDesktopListener } from './shared/functions/functions'

interface AppProps {
  className?: string
}

export const App: React.FunctionComponent<AppProps> = ({ className }) => {
  const { mobileMediaQuery, mediumMediaQuery } = CONSTANTS
  const { active } = React.useContext(LoadingContext)

  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isMedium, setIsMedium] = React.useState<boolean>(false)
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false)
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(false)

  const isMobileMatcher = window.matchMedia(mobileMediaQuery)
  const isMediumMatcher = window.matchMedia(mediumMediaQuery)
  const classes = classNames(styles.app, active && styles.active, className)

  // listener for desktop or mobile
  const desktopSizeListenerHandlers = () => {
    // if medium size checker
    handleDesktopListener(isMediumMatcher, isMedium, setIsMedium)
    // if mobile size checker
    handleDesktopListener(isMobileMatcher, isMobile, setIsMobile)

    // desktop false check
    if ((isMedium || isMobile) && isDesktop) {
      setIsDesktop(false)
    }
    // desktop true check
    if ((!isMedium || !isMobile) && !isDesktop) {
      setIsDesktop(true)
    }
  }

  React.useEffect(() => {
    desktopSizeListenerHandlers()
    window.addEventListener('resize', desktopSizeListenerHandlers)
    return () => {
      window.removeEventListener('resize', desktopSizeListenerHandlers)
    }
  }, [isMobile, isMedium, isDesktop, isMobileMatcher, isMediumMatcher])

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
          isMedium,
          isDesktop,
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
  isMedium: boolean
  isDesktop: boolean
  scrollEnabled: boolean
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = React.createContext<AppContextProps>({
  isMobile: false,
  isMedium: false,
  isDesktop: false,
  scrollEnabled: true,
  setScrollEnabled: () => {},
})
