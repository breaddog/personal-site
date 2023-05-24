import { ethers } from 'ethers'
import { APP_ENV } from '../config'

export type NetworkType = 'ethereum' | 'polygon'
export type ContractType = 'ERC721' | 'ERC1155'

export interface GenericContractInterface {
  address: string
  abi: ethers.InterfaceAbi
  network: NetworkType
}

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
