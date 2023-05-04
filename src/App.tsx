import styles from './App.module.scss'
import React from 'react'
import AOS from 'aos'
import classNames from 'classnames'

import { CSSHeader, LoadingContext, LoadingSection, Portfolio } from './pages'
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
    <AppContext.Provider
      value={{
        scrollEnabled,
        setScrollEnabled,
      }}
    >
      <div className={classes}>
        {/* all the import components will go here */}
        <CSSHeader />
        {/* <LoadingSection /> */}
        <Portfolio />
      </div>
    </AppContext.Provider>
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
