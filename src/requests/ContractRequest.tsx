import { ethers } from 'ethers'
import { NetworkType } from '../ethereum/utils'
import { BaseRequest } from './BaseRequest'

// generic contract interface
// query contract is deployed by Pellar
export class ContractRequest extends BaseRequest {
  DECODER: ethers.AbiCoder = new ethers.AbiCoder()
  NETWORK: string

  // create based on network
  constructor(network: NetworkType) {
    super()
    this.NETWORK = network
  }
}
