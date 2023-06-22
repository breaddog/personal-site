import { ethers } from 'ethers'
import { GenericContractInterface, NetworkType } from '../ethereum/utils'
import { BaseRequest } from './BaseRequest'

// generic contract interface
// query contract is deployed by Pellar
export class ContractRequest extends BaseRequest {
  DECODER: ethers.AbiCoder = new ethers.AbiCoder()
  ADDRESS: string
  NETWORK: NetworkType
  CONTRACT_PROPS: any

  // create based on network
  constructor(props: GenericContractInterface) {
    super()
    this.CONTRACT_PROPS = props
    this.ADDRESS = props.address
    this.NETWORK = props.network
  }

  reinstantiateContract() {}
}
