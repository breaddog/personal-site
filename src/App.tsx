import 'aos/dist/aos.css'
import styles from './App.module.scss'
import React from 'react'
import AOS from 'aos'
import classNames from 'classnames'

import { PageOrientation, ScrollDirection } from './shared/types'

import {
  CSSHeader,
  ErrorPage,
  LoadingHandle,
  // LoadingSection,
  Portfolio,
  ProjectPage,
} from './pages'
// import CustomHistoryRouter from './router'
import {
  // RouterProvider,
  // createBrowserRouter,
  // useNavigate,
  // useLocation,
  HashRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import {
  CONSTANTS,
  disableScroll,
  enableScroll,
  getScrollPositionForSection,
  handleDesktopListener,
} from './shared'
import { useWeb3React } from '@web3-react/core'
import {
  WalletConnectModal,
  ConnectionType,
  tryAutoReconnect,
} from './ethereum'
import { APP_ENV } from './config'
import { getAccountEthBalance, getAccountMaticBalance } from './ethereum/utils'
// import { delay } from 'lodash'
import { ScrollTrigger } from 'gsap/all'
import { ROUTES } from './routes'

interface AppProps {
  className?: string
}

export const App: React.FunctionComponent<AppProps> = ({ className }) => {
  const { mobileMediaQuery, mediumMediaQuery } = CONSTANTS

  // basename
  const basename = document.querySelector('base')?.getAttribute('href') ?? '/'

  // loading
  const loadingRef = React.useRef<LoadingHandle>(null)
  const loadingRefCurrent = loadingRef?.current as LoadingHandle

  // web3 stuff
  const { account, isActive } = useWeb3React()
  const [connectionType, setConnectionType] =
    React.useState<ConnectionType | null>(null)
  // balances
  const [ethBalance, setEthBalance] = React.useState<number>(0)
  const [maticBalance, setMaticBalance] = React.useState<number>(0)

  // listeners
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isMedium, setIsMedium] = React.useState<boolean>(false)
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false)

  // misc
  const [scrollDirection, setScrollDirection] =
    React.useState<ScrollDirection>('up')
  // const [isScrolling, setScrolling] = React.useState<boolean>(false)
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(false)

  // rotation
  const [orientation, setOrientation] =
    React.useState<PageOrientation>('landscape')

  // web3 modal
  const [web3ModalActive, setWeb3ModalActive] = React.useState<boolean>(false)

  // matchers
  const isMobileMatcher = window.matchMedia(mobileMediaQuery)
  const isMediumMatcher = window.matchMedia(mediumMediaQuery)

  // classes
  const classes = classNames(
    styles.app,
    loadingRefCurrent?.active && styles.active,
    className
  )

  // WEB 3
  // ETH BALANCES
  const resetBalances = () => {
    setEthBalance(0)
    setMaticBalance(0)
  }

  const handleGetEthBalance = async (_account: string) => {
    try {
      const balance = await getAccountEthBalance(_account)
      setEthBalance(balance)
    } catch (err) {
      setEthBalance(0)
    }
  }

  const handleGetMaticBalance = async (_account: string) => {
    try {
      const balance = await getAccountMaticBalance(_account)
      setMaticBalance(balance)
    } catch (err) {
      setMaticBalance(0)
    }
  }

  const handleUpdateBalances = (account: string) => {
    handleGetEthBalance(account)
    handleGetMaticBalance(account)
  }

  // scroll
  const handleScrollToggle = (enabled: boolean) => {
    setScrollEnabled(enabled)
    enabled ? enableScroll() : disableScroll()
  }

  // auto reconnect and account dependencies
  React.useEffect(() => {
    // no account? reset everything
    if (!account) {
      resetBalances()
      return
    }
    localStorage[APP_ENV.CONNECTOR_TYPE_STORAGE] = String(connectionType)
    handleUpdateBalances(account)
  }, [account, connectionType])

  // on load
  React.useEffect(() => {
    window.addEventListener('load', () => tryAutoReconnect(setConnectionType))
    return () => {
      window.addEventListener('load', () => tryAutoReconnect(setConnectionType))
    }
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

  // orientation
  const handleSetOrientation = () => {
    const _width = window.innerWidth
    const _height = window.innerHeight

    if (_width > _height && orientation !== 'landscape') {
      setOrientation('landscape')
      ScrollTrigger.refresh()
      window.scrollTo(window.scrollX, window.scrollY)
    }

    if (_width < _height && orientation !== 'portrait') {
      setOrientation('portrait')
      ScrollTrigger.refresh()
      window.scrollTo(window.scrollX, window.scrollY)
    }
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

  // orientation
  React.useEffect(() => {
    handleSetOrientation()
    window.addEventListener('resize', handleSetOrientation)
    return () => {
      window.removeEventListener('resize', handleSetOrientation)
    }
  }, [orientation])

  // scroll handler
  React.useEffect(() => {
    let prevScrollY = window.scrollY

    const updateScrollDirectionHandler = () => {
      // scroll related stuff otherwise
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
  React.useEffect(
    () => {
      // let activated = false
      // only trigger animations after load
      // if (loadingRefCurrent?.loaded) {
      AOS.init({
        duration: 800,
        startEvent: 'DOMContentLoaded',
        once: true,
        delay: 50,
      })
      // activated = true
      // }

      // if (activated) {
      //   delay(() => {
      //     AOS.refreshHard()
      //     AOS.refresh()
      //   }, 1000)
      // }
    },
    [
      // loadingRef, loadingRefCurrent
    ]
  )

  // HISTORY SECTION
  // fetch position from localstorage
  React.useEffect(() => {
    const _position = getScrollPositionForSection(location.pathname)
    window.scrollTo({ top: _position })
  }, [])

  return (
    <HashRouter basename={basename.length ? basename : '/'}>
      <AppContext.Provider
        value={{
          isMobile,
          isMedium,
          isDesktop,
          scrollEnabled,
          scrollDirection,
          setScrollEnabled: handleScrollToggle,
          loadingRef,
          web3ModalActive,
          setWeb3ModalActive,
          connectionType,
          ethBalance,
          maticBalance,
          resetBalances,
          updateBalances: handleUpdateBalances,
        }}
      >
        <div className={classes}>
          <CSSHeader />
          {/* <LoadingSection ref={loadingRef} /> */}
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

            <Route
              path={ROUTES['404'].pathname}
              element={
                <ErrorPage
                  header='Page Not Found'
                  text={
                    <>
                      Seems like the page you want to visit either doesn't exist
                      or is unavailable. You can go back to the homepage by
                      clicking on the button below.
                    </>
                  }
                />
              }
            />

            <Route
              path='*'
              element={
                <Navigate
                  replace
                  to={ROUTES['404'].pathname}
                />
              }
            />
          </Routes>
        </div>
      </AppContext.Provider>
    </HashRouter>
  )
}

interface AppContextProps {
  isMobile: boolean
  isMedium: boolean
  isDesktop: boolean
  scrollEnabled: boolean
  scrollDirection: ScrollDirection
  setScrollEnabled: Function
  // loading
  loadingRef: React.RefObject<LoadingHandle> | null

  // web3 stuff
  // modal
  web3ModalActive: boolean
  setWeb3ModalActive: React.Dispatch<React.SetStateAction<boolean>>

  // connection
  connectionType: ConnectionType | null
  ethBalance: number
  maticBalance: number
  resetBalances: Function
  // eslint-disable-next-line no-unused-vars
  updateBalances: (account: string) => void
}

// export const AppLoadingContext = React.createContext<LoadingHandle>({
//   active: true,
//   loaded: false,
//   amountLoaded: 0,
//   assetsLoaded: 0,
//   assetsToLoad: 0,
//   setActive: () => { },
//   setLoaded: () => { },
//   setAmountLoaded: () => { },
//   setLoadingActive: () => { },
//   setNewFlavourText: () => { },
//   resetLoadingPage: () => { },
//   setAssetsLoaded: () => { },
//   setAssetsToLoad: () => { }
// })

export const AppContext = React.createContext<AppContextProps>({
  isMobile: false,
  isMedium: false,
  isDesktop: false,
  scrollEnabled: true,
  scrollDirection: 'up',
  setScrollEnabled: () => {},
  loadingRef: null,
  web3ModalActive: false,
  setWeb3ModalActive: () => {},
  connectionType: null,
  ethBalance: 0,
  maticBalance: 0,
  resetBalances: () => {},
  // eslint-disable-next-line
  updateBalances: (account: string) => {},
})
