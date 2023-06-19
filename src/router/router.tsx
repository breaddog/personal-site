import { Navigate } from 'react-router-dom'
import { Portfolio } from '../pages'
import { ROUTES } from '../routes'
import { ProjectPage } from '../pages/Projects'

export const APP_ROUTER = [
  {
    path: ROUTES.home.pathname,
    element: <Portfolio />,
  },
  {
    path: ROUTES.portfolio.pathname,
    element: (
      <Navigate
        replace
        to={ROUTES.home.pathname}
      />
    ),
  },
  {
    path: ROUTES.projects.pathname,
    element: <ProjectPage />,
  },
  {
    path: '*',
    element: (
      <Navigate
        replace
        to={ROUTES.home.pathname}
      />
    ),
  },
]
