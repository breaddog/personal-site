import { ethers } from 'ethers'
import { APP_ENV } from '../config'
import { Web3Provider } from '@ethersproject/providers'

export type NetworkType = 'ethereum' | 'polygon'
export type ContractType = 'ERC721' | 'ERC1155'

export interface GenericContractInterface {
  address: string
  abi: ethers.InterfaceAbi
  network: NetworkType
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
  switch (network) {
    case 'ethereum':
      return APP_ENV.ETHEREUM_PROVIDER
    case 'polygon':
      return APP_ENV.POLYGON_PROVIDER
    // default to eth network if not specified
    default:
      return APP_ENV.ETHEREUM_PROVIDER
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

export const shortenAddress = (address: string, length: number = 6) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`
}
