import React from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { BrowserHistory, createBrowserHistory } from 'history'

const history = createBrowserHistory({ window })

interface CustomHistoryRouterProps {
  className?: string
  basename?: string
  children?: React.ReactNode
}

export const customNavigate = (pathname: string) => history.push(pathname)

export const CustomHistoryRouter: React.FunctionComponent<
  CustomHistoryRouterProps
> = ({ children, basename = '/', ...props }) => {
  return (
    <HistoryRouter
      {...props}
      // @ts-expect-error
      history={history}
      basename={basename}
    >
      <HistoryRouterContext.Provider
        value={{
          history,
          navigate: customNavigate,
        }}
      >
        {children}
      </HistoryRouterContext.Provider>
    </HistoryRouter>
  )
}

interface HistoryRouterContextProps {
  history: BrowserHistory
  navigate: Function
}

export const HistoryRouterContext =
  React.createContext<HistoryRouterContextProps>({
    history: createBrowserHistory(),
    // eslint-disable-next-line
    navigate: (pathname: string) => {},
  })

export default CustomHistoryRouter
