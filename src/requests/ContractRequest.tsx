import { ethers } from 'ethers'
import {
  QUERY_CONTRACT_ABI,
  QUERY_CONTRACT_ADDRESS_ETHEREUM,
  QUERY_CONTRACT_ADDRESS_POLYGON
} from '../contracts'
import { NetworkType, createContractObject } from '../shared'
import { BaseRequest } from './BaseRequest'

// generic contract interface
// query contract is deployed by Pellar
export class ContractRequest extends BaseRequest {
  QUERY_CONTRACT_ADDRESS: string
  QUERY_CONTRACT: ethers.Contract
  DECODER: ethers.AbiCoder = new ethers.AbiCoder()
  NETWORK: string

  // create based on network
  constructor(network: NetworkType) {
    super()
    let address
    switch (network) {
      case 'ethereum':
        address = QUERY_CONTRACT_ADDRESS_ETHEREUM
        break
      case 'polygon':
        address = QUERY_CONTRACT_ADDRESS_POLYGON
        break
      default:
        address = QUERY_CONTRACT_ADDRESS_ETHEREUM
        break
    }
    this.QUERY_CONTRACT = createContractObject({
      address,
      abi: QUERY_CONTRACT_ABI,
      network,
    })
    this.QUERY_CONTRACT_ADDRESS = address
    this.NETWORK = network
  }
}
