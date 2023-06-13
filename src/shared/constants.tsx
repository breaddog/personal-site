import { APP_ENV } from '../config'

const { IS_PROD } = APP_ENV
export const CONSTANTS = {
  projectImageRoot: `${IS_PROD ? '/personal-site' : '/'}images/projects`,
  mobileMediaQuery: '(max-width: 876px)',
  mediumMediaQuery: '(max-width: 1280px)',
}
