import { Chain, CurrentConfig, APP_ENV } from '../config'

// round robin
export const ETH_NODES = [
  APP_ENV.ETHEREUM_PROVIDER,
  'https://rpc.ankr.com/eth',
  'https://eth.llamarpc.com',
  'https://cloudflare-eth.com/',
]

export const POLYGON_NODES = [
  APP_ENV.POLYGON_PROVIDER,
  'https://rpc.ankr.com/polygon',
  'https://polygon.llamarpc.com',
]

// Default Chains
const MAINNET_CHAIN_ID = APP_ENV.MAINNET_CHAIN_ID
const POLYGON_CHAIN_ID = APP_ENV.POLYGON_CHAIN_ID

export const INPUT_CHAIN_ID =
  CurrentConfig.chain === Chain.POLYGON ? POLYGON_CHAIN_ID : MAINNET_CHAIN_ID
export const INPUT_CHAIN_URL =
  CurrentConfig.chain === Chain.POLYGON
    ? CurrentConfig.rpc.polygon
    : CurrentConfig.rpc.mainnet

export const CHAIN_TO_URL_MAP = {
  [POLYGON_CHAIN_ID]: CurrentConfig.rpc.polygon,
  [MAINNET_CHAIN_ID]: CurrentConfig.rpc.mainnet,
}

export const CHAIN_TO_RPC_NODES_MAP = {
  [POLYGON_CHAIN_ID]: POLYGON_NODES,
  [MAINNET_CHAIN_ID]: ETH_NODES,
}

export const NETWORK_TO_RPC_NODES_MAP = {
  ethereum: ETH_NODES,
  polygon: POLYGON_NODES,
}

type ChainInfo = {
  explorer: string
  label: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: 18
  }
  rpcUrl: string
}

export const CHAIN_INFO: { [key: string]: ChainInfo } = {
  [MAINNET_CHAIN_ID]: {
    explorer: 'https://etherscan.io/',
    label: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: CurrentConfig.rpc.mainnet,
  },
  [POLYGON_CHAIN_ID]: {
    explorer: 'https://polygonscan.com/',
    label: 'Polygon',
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
    rpcUrl: CurrentConfig.rpc.polygon,
  },
}
