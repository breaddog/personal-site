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

interface AppProps {
  className?: string
}

export const App: React.FunctionComponent<AppProps> = ({ className }) => {
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(false)
  const { active } = React.useContext(LoadingContext)

  const classes = classNames(styles.app, active && styles.active, className)

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
  scrollEnabled: boolean
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = React.createContext<AppContextProps>({
  scrollEnabled: true,
  setScrollEnabled: () => {},
})
