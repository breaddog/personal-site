import { ethers } from 'ethers'

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
