import { APP_ENV } from './env'

// Sets if the example should run locally or on chain
/* eslint-disable no-unused-vars */
export enum Chain {
  POLYGON,
  MAINNET,
}
/* eslint-disable no-unused-vars */

// Inputs that configure this example to run
interface ExampleConfig {
  chain: Chain
  rpc: {
    polygon: string
    mainnet: string
  }
}

// Example Configuration
export const CurrentConfig: ExampleConfig = {
  chain: Chain.MAINNET,
  rpc: {
    mainnet: APP_ENV.ETHEREUM_PROVIDER,
    polygon: APP_ENV.POLYGON_PROVIDER,
  },
}
