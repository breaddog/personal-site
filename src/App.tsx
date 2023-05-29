import styles from './App.module.scss'
import React from 'react'
import AOS from 'aos'
import classNames from 'classnames'

import { ROUTES } from './routes'

import { ScrollDirection } from './shared/types'

import { CSSHeader, LoadingContext, LoadingSection, Portfolio } from './pages'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { ProjectPage } from './pages/Portfolio/Projects'
import { CONSTANTS, handleDesktopListener } from './shared'
import { useWeb3React } from '@web3-react/core'
import {
  WalletConnectModal,
  ConnectionType,
  tryAutoReconnect
} from './ethereum'
import { APP_ENV } from './config'

interface AppProps {
  className?: string
}

export const App: React.FunctionComponent<AppProps> = ({ className }) => {
  const { mobileMediaQuery, mediumMediaQuery } = CONSTANTS
  const { active } = React.useContext(LoadingContext)

  // web3 stuff
  const { account, isActive } = useWeb3React()
  const [connectionType, setConnectionType] =
    React.useState<ConnectionType | null>(null)

  // listeners
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isMedium, setIsMedium] = React.useState<boolean>(false)
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false)

  // misc
  const [scrollDirection, setScrollDirection] =
    React.useState<ScrollDirection>('up')
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(false)

  // web3 modal
  const [web3ModalActive, setWeb3ModalActive] = React.useState<boolean>(false)

  // matchers
  const isMobileMatcher = window.matchMedia(mobileMediaQuery)
  const isMediumMatcher = window.matchMedia(mediumMediaQuery)

  // classes
  const classes = classNames(styles.app, active && styles.active, className)

  // WEB 3
  // auto reconnect
  React.useEffect(() => {
    if (!account) return
    localStorage.setItem(APP_ENV.CONNECTOR_TYPE_STORAGE, String(connectionType))
  }, [account, connectionType])

  React.useEffect(() => {
    tryAutoReconnect(setConnectionType)
  }, [])

  // LISTENERS
  // listener for desktop or mobile
  const desktopSizeListenerHandlers = () => {
    // // desktop false check
    if (isMedium && isMobile && isDesktop) {
      setIsDesktop(false)
    }
    // desktop true check
    if (!isMedium && !isMobile && !isDesktop) {
      setIsDesktop(true)
    }
  }
  // medium
  const mediumSizeListenerHandler = () => {
    handleDesktopListener(isMediumMatcher, isMedium, setIsMedium)
  }
  // mobile
  const mobileSizeListenerHandler = () => {
    handleDesktopListener(isMobileMatcher, isMobile, setIsMobile)
  }

  // desktop
  React.useEffect(() => {
    window.addEventListener('resize', desktopSizeListenerHandlers)
    return () => {
      window.removeEventListener('resize', desktopSizeListenerHandlers)
    }
  }, [isDesktop, isMedium, isMobile])

  // medium
  React.useEffect(() => {
    mediumSizeListenerHandler()
    window.addEventListener('resize', mediumSizeListenerHandler)
    return () => {
      window.removeEventListener('resize', mediumSizeListenerHandler)
    }
  }, [isMedium, mediumMediaQuery])

  // mobile
  React.useEffect(() => {
    mobileSizeListenerHandler()
    window.addEventListener('resize', mobileSizeListenerHandler)

    return () => {
      window.removeEventListener('resize', mobileSizeListenerHandler)
    }
  }, [isMobile, isMobileMatcher])

  // scroll handler
  React.useEffect(() => {
    let prevScrollY = window.scrollY

    const updateScrollDirectionHandler = () => {
      const scrollY = window.scrollY
      const isBigger = scrollY > prevScrollY
      // no difference (default to up)
      if (scrollY === prevScrollY) return setScrollDirection('up')
      // otherwise set direction
      setScrollDirection(isBigger ? 'down' : 'up')
      prevScrollY = scrollY
    }

    window.addEventListener('scroll', updateScrollDirectionHandler)
    return () => {
      window.removeEventListener('scroll', updateScrollDirectionHandler)
    }
  }, [scrollDirection])

  // AOS
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
          scrollDirection,
          setScrollEnabled,
          web3ModalActive,
          setWeb3ModalActive,
        }}
      >
        <div className={classes}>
          <CSSHeader />
          {/* TO DO: link this to load on first visit/if assets require to be loaded */}
          <LoadingSection />
          <WalletConnectModal
            onRequestCloseActive={false}
            isOpen={web3ModalActive}
            onClose={() => setWeb3ModalActive(false)}
            activeConnectionType={connectionType}
            connectionActive={isActive}
            onActivate={setConnectionType}
            onDeactivate={setConnectionType}
          />
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
  scrollDirection: ScrollDirection
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>
  web3ModalActive: boolean
  setWeb3ModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = React.createContext<AppContextProps>({
  isMobile: false,
  isMedium: false,
  isDesktop: false,
  scrollEnabled: true,
  scrollDirection: 'up',
  setScrollEnabled: () => {},
  web3ModalActive: false,
  setWeb3ModalActive: () => {},
})
