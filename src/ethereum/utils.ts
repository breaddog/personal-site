import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { getRandomInt } from '../shared'
import { ETH_NODES, POLYGON_NODES } from './constants'

export type NetworkType = 'ethereum' | 'polygon'
export type ContractType = 'ERC20' | 'ERC721' | 'ERC1155' | 'multi' | 'other'

export interface GenericContractInterface {
  address: string
  type?: ContractType
  abi: ethers.InterfaceAbi
  network: NetworkType
  decimals?: number
  symbol?: string
}

export const chainIdToName = (chainId: number) => {
  switch (chainId) {
    case 0:
      return 'Unknown Network'
    case 1:
      return 'Ethereum Mainnet'
    case 137:
      return 'Polygon Mainnet'
    default:
      return `Network with Chain ID: ${chainId}`
  }
}

export const getNetworkNameFromProvider = async (
  provider: Web3Provider | null
) => {
  if (!provider) return 'Unknown'

  try {
    const network = await provider.getNetwork()
    const name = network?.name
    // homestead is same as mainnet, just version
    if (name === 'homestead') return 'Mainnet'
    return network.name ?? 'Unknown'
  } catch (err) {
    return 'Unknown'
  }
}

// network provider mapping
export const getNetworkProvider = (network: NetworkType) => {
  let _randomNode
  switch (network) {
    case 'ethereum':
      _randomNode = getRandomInt(0, ETH_NODES.length)
      return ETH_NODES[_randomNode]
    case 'polygon':
      _randomNode = getRandomInt(0, POLYGON_NODES.length)
      return POLYGON_NODES[_randomNode]
    // default to eth network if not specified
    default:
      _randomNode = getRandomInt(0, ETH_NODES.length)
      return ETH_NODES[_randomNode]
  }
}

// wallet
export const getAccountEthBalance = async (
  account: string,
  decimals: number = 4
) => {
  if (!account) return 0
  try {
    const rpc = getNetworkProvider('ethereum')
    const provider = ethers.getDefaultProvider(rpc)
    const balance = await provider.getBalance(account)
    return Number(Number(ethers.formatEther(balance)).toFixed(decimals))
  } catch (err) {
    return 0
  }
}

export const getAccountMaticBalance = async (
  account: string,
  decimals: number = 4
) => {
  try {
    const rpc = getNetworkProvider('polygon')
    const provider = ethers.getDefaultProvider(rpc)
    const balance = await provider.getBalance(account)
    return Number(Number(ethers.formatEther(balance)).toFixed(decimals))
  } catch (err) {
    return 0
  }
}

// generic contract object
export const createContractObject = ({
  address,
  abi,
  network,
}: GenericContractInterface) => {
  // specify network
  const rpc = getNetworkProvider(network)
  const provider = ethers.getDefaultProvider(rpc)
  // return contract
  return new ethers.Contract(address, abi, provider)
}

export const shortenAddress = ({
  address,
  length = 6,
  tail = false,
}: {
  address: string
  length?: number
  tail?: boolean
}) => {
  return `${address.slice(0, length)}...${tail ? address.slice(-length) : ''}`
}
